import { t, type TranslationKey } from '../i18n';
import type { Language, WidgetPreferences } from '../types/preferences';
import {
  extractPageText,
  extractSelectionText,
  isSpeechSupported,
  readableBlockFromTarget,
  speakText,
  stopSpeaking,
  warmUpSpeechVoices,
} from '../utils/speech';
import type { PreferencesManager } from '../utils/preferences';
import { injectStyle, removeStyle } from '../utils/inject-css';

const SPEECH_RATES = {
  slow: 0.75,
  normal: 1,
  fast: 1.25,
} as const;

type SpeechRateKey = keyof typeof SPEECH_RATES;

const READABLE_SELECTOR =
  'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, button, a';

/** Text-to-speech module — read aloud for visual / reading disabilities */
export class SpeechModule {
  private container: HTMLElement | null = null;
  private statusEl: HTMLElement | null = null;
  private lang: Language = 'en';
  private clickHandler: ((e: MouseEvent) => void) | null = null;
  private highlightEl: HTMLElement | null = null;

  constructor(private readonly prefs: PreferencesManager) {
    warmUpSpeechVoices();
  }

  render(parent: HTMLElement, lang: Language): void {
    this.lang = lang;
    this.container = document.createElement('section');
    this.container.className = 'as-section';
    this.container.setAttribute('aria-labelledby', 'as-section-speech');
    this.container.innerHTML = this.buildHTML();
    parent.appendChild(this.container);
    this.statusEl = this.container.querySelector('#as-speech-status');
    this.bindEvents();
    this.syncUI(this.prefs.get());
  }

  apply(prefs: WidgetPreferences): void {
    this.applyClickToRead(prefs.textToSpeech);
  }

  reset(): void {
    stopSpeaking();
    this.clearHighlight();
    this.stopClickToRead();
    this.setStatus('');
  }

  updateLabels(lang: Language): void {
    this.lang = lang;
    if (!this.container) return;
    this.container.querySelector('h2')!.textContent = t('sectionSpeech', lang);
    this.updateText(this.container, lang);
  }

  syncUI(prefs: WidgetPreferences): void {
    if (!this.container) return;

    const toggle = this.container.querySelector('#as-toggle-textToSpeech');
    if (toggle) {
      toggle.setAttribute('aria-checked', String(prefs.textToSpeech));
      toggle.classList.toggle('as-checked', prefs.textToSpeech);
      const text = toggle.querySelector('.as-switch-text');
      if (text) text.textContent = t(prefs.textToSpeech ? 'on' : 'off', this.lang);
    }

    const rateKeys: SpeechRateKey[] = ['slow', 'normal', 'fast'];
    for (const key of rateKeys) {
      const btn = this.container.querySelector(`#as-rate-${key}`);
      const active = prefs.speechRate === SPEECH_RATES[key];
      btn?.classList.toggle('as-active', active);
      btn?.setAttribute('aria-pressed', String(active));
    }

    const unsupported = this.container.querySelector(
      '#as-speech-unsupported',
    ) as HTMLElement | null;
    if (unsupported) {
      unsupported.hidden = isSpeechSupported();
    }
  }

  private buildHTML(): string {
    const l = this.lang;
    const supported = isSpeechSupported();

    return `
      <h2 id="as-section-speech" class="as-section-title">${t('sectionSpeech', l)}</h2>
      <p id="as-speech-unsupported" class="as-hint" ${supported ? 'hidden' : ''} role="alert">
        ${t('speechUnsupported', l)}
      </p>
      ${this.switchRow('textToSpeech', 'clickToRead')}
      <div class="as-control-group" role="group" aria-labelledby="as-label-speechRate">
        <span class="as-label" id="as-label-speechRate">${t('speechRate', l)}</span>
        <div class="as-btn-group as-btn-group-wrap">
          ${this.rateBtn('slow', 'speechSlow')}
          ${this.rateBtn('normal', 'speechNormal')}
          ${this.rateBtn('fast', 'speechFast')}
        </div>
      </div>
      <div class="as-speech-actions" role="group" aria-label="${t('speechActions', l)}">
        <button type="button" class="as-btn as-btn-action" id="as-read-selection">${t('readSelection', l)}</button>
        <button type="button" class="as-btn as-btn-action" id="as-read-page">${t('readPage', l)}</button>
        <button type="button" class="as-btn as-btn-action as-btn-stop" id="as-stop-speech">${t('stopSpeech', l)}</button>
      </div>
      <p id="as-speech-status" class="as-speech-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
  }

  private switchRow(id: string, key: TranslationKey): string {
    const l = this.lang;
    return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${id}">${t(key, l)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${id}" data-toggle="${id}" id="as-toggle-${id}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${t('off', l)}</span>
        </button>
      </div>`;
  }

  private rateBtn(key: SpeechRateKey, labelKey: TranslationKey): string {
    return `<button type="button" class="as-btn as-btn-segment" id="as-rate-${key}"
      aria-pressed="false" data-rate="${key}">${t(labelKey, this.lang)}</button>`;
  }

  private bindEvents(): void {
    if (!this.container) return;

    this.container.querySelector('#as-toggle-textToSpeech')?.addEventListener('click', () => {
      const current = this.prefs.get();
      this.prefs.update({ textToSpeech: !current.textToSpeech });
    });

    this.container.querySelectorAll('[data-rate]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = (btn as HTMLElement).dataset.rate as SpeechRateKey;
        if (key in SPEECH_RATES) {
          this.prefs.update({ speechRate: SPEECH_RATES[key] });
        }
      });
    });

    this.container.querySelector('#as-read-selection')?.addEventListener('click', () => {
      this.readSelection();
    });

    this.container.querySelector('#as-read-page')?.addEventListener('click', () => {
      this.readPage();
    });

    this.container.querySelector('#as-stop-speech')?.addEventListener('click', () => {
      this.stop();
    });
  }

  private readSelection(): void {
    const text = extractSelectionText();
    if (!text) {
      this.setStatus(t('speechNoSelection', this.lang));
      return;
    }
    this.speak(text);
  }

  private readPage(): void {
    const text = extractPageText();
    if (!text) {
      this.setStatus(t('speechNoContent', this.lang));
      return;
    }
    this.speak(text.slice(0, 8000));
  }

  private speak(text: string, highlightTarget?: HTMLElement): void {
    const prefs = this.prefs.get();
    this.clearHighlight();

    if (highlightTarget) {
      this.highlightEl = highlightTarget;
      highlightTarget.classList.add('as-tts-reading');
    }

    const started = speakText(text, { lang: prefs.language, rate: prefs.speechRate }, () => {
      this.clearHighlight();
      this.setStatus(t('speechFinished', this.lang));
    });

    if (started) {
      this.setStatus(t('speechSpeaking', this.lang));
    } else {
      this.setStatus(t('speechUnsupported', this.lang));
    }
  }

  private stop(): void {
    stopSpeaking();
    this.clearHighlight();
    this.setStatus(t('speechStopped', this.lang));
  }

  private setStatus(message: string): void {
    if (this.statusEl) this.statusEl.textContent = message;
  }

  private applyClickToRead(enabled: boolean): void {
    if (enabled) {
      injectStyle(
        'tts-click',
        `
        ${READABLE_SELECTOR} {
          cursor: pointer !important;
        }
        .as-tts-reading {
          outline: 3px solid #1A56A0 !important;
          outline-offset: 4px !important;
          background-color: rgba(235, 243, 251, 0.85) !important;
        }`,
      );

      this.clickHandler = (e: MouseEvent) => {
        const block = readableBlockFromTarget(e.target);
        if (!block) return;
        e.preventDefault();
        e.stopPropagation();
        const text = block.innerText.replace(/\s+/g, ' ').trim();
        if (text) this.speak(text, block);
      };

      document.addEventListener('click', this.clickHandler, true);
    } else {
      this.stopClickToRead();
    }
  }

  private stopClickToRead(): void {
    removeStyle('tts-click');
    if (this.clickHandler) {
      document.removeEventListener('click', this.clickHandler, true);
      this.clickHandler = null;
    }
    this.clearHighlight();
  }

  private clearHighlight(): void {
    if (this.highlightEl) {
      this.highlightEl.classList.remove('as-tts-reading');
      this.highlightEl = null;
    }
    document.querySelectorAll('.as-tts-reading').forEach((el) => {
      el.classList.remove('as-tts-reading');
    });
  }

  private updateText(container: HTMLElement, lang: Language): void {
    const keys: Array<[string, TranslationKey]> = [
      ['as-label-textToSpeech', 'clickToRead'],
      ['as-label-speechRate', 'speechRate'],
    ];
    for (const [id, key] of keys) {
      const el = container.querySelector(`#${id}`);
      if (el) el.textContent = t(key, lang);
    }

    const actionLabels: Array<[string, TranslationKey]> = [
      ['as-read-selection', 'readSelection'],
      ['as-read-page', 'readPage'],
      ['as-stop-speech', 'stopSpeech'],
    ];
    for (const [id, key] of actionLabels) {
      const el = container.querySelector(`#${id}`);
      if (el) el.textContent = t(key, lang);
    }

    const rateLabels: Array<[SpeechRateKey, TranslationKey]> = [
      ['slow', 'speechSlow'],
      ['normal', 'speechNormal'],
      ['fast', 'speechFast'],
    ];
    for (const [key, labelKey] of rateLabels) {
      const el = container.querySelector(`#as-rate-${key}`);
      if (el) el.textContent = t(labelKey, lang);
    }

    const unsupported = container.querySelector('#as-speech-unsupported');
    if (unsupported) unsupported.textContent = t('speechUnsupported', lang);

    this.syncUI(this.prefs.get());
  }
}
