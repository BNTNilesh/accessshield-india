/**
 * Device Manager
 *
 * Manages Appium/BrowserStack session lifecycle for mobile app scanning.
 * Supports both BrowserStack App Automate (cloud) and local Appium (fallback).
 */

import { existsSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { remote, type Browser } from 'webdriverio';
import type {
  MobilePlatform,
  BrowserStackAppUploadResponse,
  BrowserStackCapabilities,
} from './types.js';
import {
  DEFAULT_ANDROID_DEVICE,
  DEFAULT_IOS_DEVICE,
  DEFAULT_ANDROID_VERSION,
  DEFAULT_IOS_VERSION,
} from './types.js';
import { getPresignedAppUrl, uploadScreenshot } from './s3-client.js';
import { ensureAndroidSdkEnv } from './lib/android-env.js';
import { resolveLocalAppPath } from './lib/paths.js';
import { logger } from './lib/logger.js';

const BROWSERSTACK_HUB_URL = 'https://hub.browserstack.com/wd/hub';
const BROWSERSTACK_UPLOAD_URL = 'https://api-cloud.browserstack.com/app-automate/upload';
const LOCAL_APPIUM_URL = 'http://localhost:4723';

export interface CreateSessionParams {
  platform: MobilePlatform;
  appS3Key: string;
  osVersion?: string;
  deviceModel?: string;
  bundleId?: string;
  scanId: string;
  mobileAppId: string;
}

export class DeviceManager {
  private useBrowserStack: boolean;
  private browserStackUsername: string | undefined;
  private browserStackAccessKey: string | undefined;

  constructor() {
    this.browserStackUsername = process.env.BROWSERSTACK_USERNAME;
    this.browserStackAccessKey = process.env.BROWSERSTACK_ACCESS_KEY;
    this.useBrowserStack = !!(this.browserStackUsername && this.browserStackAccessKey);

    if (this.useBrowserStack) {
      logger.info('DeviceManager: Using BrowserStack App Automate');
    } else {
      logger.info('DeviceManager: Using local Appium (BrowserStack credentials not set)');
    }
  }

  async createSession(params: CreateSessionParams): Promise<Browser> {
    if (this.useBrowserStack) {
      return this.createBrowserStackSession(params);
    }

    return this.createLocalAppiumSession(params);
  }

  private async createBrowserStackSession(params: CreateSessionParams): Promise<Browser> {
    const { platform, appS3Key, osVersion, deviceModel, scanId, mobileAppId } = params;

    const bsAppUrl = appS3Key.startsWith('local:')
      ? await this.uploadLocalAppToBrowserStack(appS3Key)
      : await this.uploadToBrowserStackFromUrl(await getPresignedAppUrl(appS3Key));

    const deviceName =
      deviceModel ?? (platform === 'android' ? DEFAULT_ANDROID_DEVICE : DEFAULT_IOS_DEVICE);
    const platformVersion =
      osVersion ?? (platform === 'android' ? DEFAULT_ANDROID_VERSION : DEFAULT_IOS_VERSION);

    const capabilities: BrowserStackCapabilities = {
      platformName: platform === 'android' ? 'android' : 'ios',
      'appium:app': bsAppUrl,
      'appium:deviceName': deviceName,
      'appium:platformVersion': platformVersion,
      'appium:automationName': platform === 'android' ? 'UiAutomator2' : 'XCUITest',
      'bstack:options': {
        projectName: 'AccessShield Mobile Scan',
        buildName: scanId,
        sessionName: mobileAppId,
        appiumVersion: '2.4.1',
        debug: true,
        networkLogs: true,
      },
    };

    logger.info({ platform, deviceName, platformVersion, scanId }, 'Creating BrowserStack session');

    const driver = await remote({
      protocol: 'https',
      hostname: 'hub.browserstack.com',
      port: 443,
      path: '/wd/hub',
      user: this.browserStackUsername,
      key: this.browserStackAccessKey,
      capabilities: capabilities as WebdriverIO.Capabilities,
      connectionRetryTimeout: 180000,
      connectionRetryCount: 3,
    });

    logger.info({ sessionId: driver.sessionId }, 'BrowserStack session created');
    return driver;
  }

  private browserStackAuthHeader(): string {
    return `Basic ${Buffer.from(
      `${this.browserStackUsername}:${this.browserStackAccessKey}`,
    ).toString('base64')}`;
  }

  private async parseBrowserStackUploadResponse(response: Response): Promise<string> {
    if (!response.ok) {
      const errorText = await response.text();
      logger.error({ status: response.status, error: errorText }, 'BrowserStack app upload failed');
      throw new Error(`BrowserStack upload failed: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as BrowserStackAppUploadResponse;
    logger.info({ appUrl: data.app_url }, 'App uploaded to BrowserStack');
    return data.app_url;
  }

  private async uploadLocalAppToBrowserStack(appS3Key: string): Promise<string> {
    const localPath = resolveLocalAppPath(appS3Key);
    if (!existsSync(localPath)) {
      throw new Error(`Local APK not found: ${localPath}`);
    }

    logger.info({ localPath }, 'Uploading local APK file to BrowserStack...');

    const formData = new FormData();
    const fileBuffer = readFileSync(localPath);
    const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });
    formData.append('file', blob, basename(localPath));

    const response = await fetch(BROWSERSTACK_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: this.browserStackAuthHeader(),
      },
      body: formData,
    });

    return this.parseBrowserStackUploadResponse(response);
  }

  private async uploadToBrowserStackFromUrl(appUrl: string): Promise<string> {
    logger.info('Uploading app to BrowserStack from URL...');

    const response = await fetch(BROWSERSTACK_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: this.browserStackAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: appUrl }),
    });

    return this.parseBrowserStackUploadResponse(response);
  }

  private async createLocalAppiumSession(params: CreateSessionParams): Promise<Browser> {
    const { platform, appS3Key, osVersion, deviceModel } = params;

    if (platform === 'android') {
      ensureAndroidSdkEnv();
    }

    const appPath = resolveLocalAppPath(appS3Key);

    const deviceName =
      deviceModel ?? (platform === 'android' ? 'emulator-5554' : 'iPhone 15 Simulator');
    const platformVersion =
      osVersion ?? (platform === 'android' ? DEFAULT_ANDROID_VERSION : DEFAULT_IOS_VERSION);

    const capabilities: WebdriverIO.Capabilities = {
      'appium:platformName': platform === 'android' ? 'Android' : 'iOS',
      'appium:platformVersion': platformVersion,
      'appium:deviceName': deviceName,
      'appium:automationName': platform === 'android' ? 'UiAutomator2' : 'XCUITest',
      'appium:app': appPath,
      'appium:newCommandTimeout': 300,
      'appium:noReset': false,
    };

    if (platform === 'android') {
      (capabilities as Record<string, unknown>)['appium:autoGrantPermissions'] = true;
    }

    logger.info(
      { platform, deviceName, platformVersion, appPath },
      'Creating local Appium session',
    );

    const driver = await remote({
      protocol: 'http',
      hostname: 'localhost',
      port: 4723,
      path: '/',
      capabilities,
      connectionRetryTimeout: 120000,
      connectionRetryCount: 3,
    });

    logger.info({ sessionId: driver.sessionId }, 'Local Appium session created');
    return driver;
  }

  async closeSession(driver: Browser): Promise<void> {
    try {
      if (driver && driver.sessionId) {
        await driver.deleteSession();
        logger.info({ sessionId: driver.sessionId }, 'Session closed');
      }
    } catch (err) {
      logger.warn({ err }, 'Error closing session');
    }
  }

  async takeScreenshot(
    driver: Browser,
    scanId: string,
    screenId: string,
    orgId: string,
  ): Promise<string | null> {
    try {
      const base64Screenshot = await driver.takeScreenshot();
      const buffer = Buffer.from(base64Screenshot, 'base64');
      const s3Key = await uploadScreenshot(buffer, scanId, screenId, orgId);
      return s3Key;
    } catch (err) {
      logger.error({ err, scanId, screenId }, 'Failed to capture screenshot');
      return null;
    }
  }

  isUsingBrowserStack(): boolean {
    return this.useBrowserStack;
  }
}

export const deviceManager = new DeviceManager();
