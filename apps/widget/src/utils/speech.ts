import type { Language } from '../types/preferences';

const RATE_MIN = 0.5;
const RATE_MAX = 2;

/** Whether the browser supports speech synthesis */
export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function speechLang(lang: Language): string {
  return lang === 'hi' ? 'hi-IN' : 'en-IN';
}

function pickVoice(lang: Language): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang === 'hi' ? 'hi' : 'en';
  return (
    voices.find((v) => v.lang === speechLang(lang)) ??
    voices.find((v) => v.lang.startsWith(prefix)) ??
    voices[0]
  );
}

function clampRate(rate: number): number {
  return Math.min(RATE_MAX, Math.max(RATE_MIN, rate));
}

/** Speak text aloud using the Web Speech API */
export function speakText(
  text: string,
  options: { lang: Language; rate: number },
  onEnd?: () => void,
): boolean {
  if (!isSpeechSupported() || !text.trim()) return false;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text.trim());
  utterance.lang = speechLang(options.lang);
  utterance.rate = clampRate(options.rate);

  const voice = pickVoice(options.lang);
  if (voice) utterance.voice = voice;

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

/** Stop any in-progress speech */
export function stopSpeaking(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

/** Extract readable text from the host page (excludes widget chrome) */
export function extractPageText(): string {
  const root =
    document.getElementById('main-content') ??
    document.querySelector('main') ??
    document.querySelector('[role="main"]') ??
    document.body;

  const clone = root.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      '#accessshield-widget, script, style, noscript, [data-accessshield], [aria-hidden="true"]',
    )
    .forEach((el) => el.remove());

  return clone.innerText.replace(/\s+/g, ' ').trim();
}

/** Text from current selection, if any */
export function extractSelectionText(): string {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return '';
  return selection.toString().replace(/\s+/g, ' ').trim();
}

/** Nearest block element with readable text for click-to-read */
export function readableBlockFromTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  if (target.closest('#accessshield-widget')) return null;

  const block = target.closest(
    'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, button, a',
  ) as HTMLElement | null;

  if (!block) return null;
  const text = block.innerText.replace(/\s+/g, ' ').trim();
  return text.length > 0 ? block : null;
}

/** Preload voices (Chrome loads voices asynchronously) */
export function warmUpSpeechVoices(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
