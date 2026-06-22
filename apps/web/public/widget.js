'use strict';
var AccessShieldWidget = (() => {
  var k = Object.defineProperty;
  var X = Object.getOwnPropertyDescriptor;
  var Y = Object.getOwnPropertyNames;
  var J = Object.prototype.hasOwnProperty;
  var Z = (s, e, t) =>
    e in s ? k(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t);
  var Q = (s, e) => {
      for (var t in e) k(s, t, { get: e[t], enumerable: !0 });
    },
    ee = (s, e, t, a) => {
      if ((e && typeof e == 'object') || typeof e == 'function')
        for (let i of Y(e))
          !J.call(s, i) &&
            i !== t &&
            k(s, i, { get: () => e[i], enumerable: !(a = X(e, i)) || a.enumerable });
      return s;
    };
  var te = (s) => ee(k({}, '__esModule', { value: !0 }), s);
  var l = (s, e, t) => Z(s, typeof e != 'symbol' ? e + '' : e, t);
  var me = {};
  Q(me, { DEFAULT_PREFERENCES: () => b, Widget: () => y });
  var T = {
    panelTitle: 'Accessibility Options',
    closePanel: 'Close accessibility panel',
    resetAll: 'Reset All',
    sectionVisual: 'Visual Adjustments',
    sectionReading: 'Reading Tools',
    sectionNavigation: 'Navigation',
    sectionLanguage: 'Language',
    fontSize: 'Font Size',
    fontSizeSm: 'Small',
    fontSizeDefault: 'Default',
    fontSizeLg: 'Large',
    dyslexiaFont: 'Dyslexia Font',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    highContrast: 'High Contrast',
    negativeContrast: 'Negative Contrast',
    grayscale: 'Grayscale',
    saturation: 'Saturation',
    saturationValue: 'Saturation: {value}%',
    readingGuide: 'Reading Guide',
    readingMask: 'Reading Mask',
    linkHighlight: 'Link Highlight',
    focusIndicator: 'Focus Indicator',
    keyboardNavMode: 'Keyboard Navigation Mode',
    skipNavigation: 'Skip to Main Content',
    focusTracker: 'Focus Tracker',
    sectionSpeech: 'Text to Speech',
    clickToRead: 'Click to Read',
    speechRate: 'Speech Speed',
    speechSlow: 'Slow',
    speechNormal: 'Normal',
    speechFast: 'Fast',
    readSelection: 'Read Selection',
    readPage: 'Read Page',
    stopSpeech: 'Stop',
    speechActions: 'Speech actions',
    speechSpeaking: 'Speaking\u2026',
    speechStopped: 'Speech stopped.',
    speechFinished: 'Finished reading.',
    speechNoSelection: 'Select text on the page first.',
    speechNoContent: 'No readable content found.',
    speechUnsupported: 'Text-to-speech is not supported in this browser.',
    language: 'Language',
    langEn: 'English',
    langHi: 'Hindi',
    launcherLabel: 'Accessibility Options',
    on: 'On',
    off: 'Off',
    ariaPressed: 'Selected',
  };
  var C = {
    panelTitle: '\u0938\u0941\u0932\u092D\u0924\u093E \u0935\u093F\u0915\u0932\u094D\u092A',
    closePanel:
      '\u0938\u0941\u0932\u092D\u0924\u093E \u092A\u0948\u0928\u0932 \u092C\u0902\u0926 \u0915\u0930\u0947\u0902',
    resetAll: '\u0938\u092D\u0940 \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0947\u0902',
    sectionVisual: '\u0926\u0943\u0936\u094D\u092F \u0938\u092E\u093E\u092F\u094B\u091C\u0928',
    sectionReading: '\u092A\u0922\u093C\u0928\u0947 \u0915\u0947 \u0909\u092A\u0915\u0930\u0923',
    sectionNavigation: '\u0928\u0947\u0935\u093F\u0917\u0947\u0936\u0928',
    sectionLanguage: '\u092D\u093E\u0937\u093E',
    fontSize: '\u092B\u093C\u0949\u0928\u094D\u091F \u0906\u0915\u093E\u0930',
    fontSizeSm: '\u091B\u094B\u091F\u093E',
    fontSizeDefault: '\u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F',
    fontSizeLg: '\u092C\u0921\u093C\u093E',
    dyslexiaFont:
      '\u0921\u093F\u0938\u094D\u0932\u0947\u0915\u094D\u0938\u093F\u092F\u093E \u092B\u093C\u0949\u0928\u094D\u091F',
    darkMode: '\u0921\u093E\u0930\u094D\u0915 \u092E\u094B\u0921',
    lightMode: '\u0932\u093E\u0907\u091F \u092E\u094B\u0921',
    highContrast: '\u0909\u091A\u094D\u091A \u0915\u0902\u091F\u094D\u0930\u093E\u0938\u094D\u091F',
    negativeContrast:
      '\u0928\u0915\u093E\u0930\u093E\u0924\u094D\u092E\u0915 \u0915\u0902\u091F\u094D\u0930\u093E\u0938\u094D\u091F',
    grayscale: '\u0917\u094D\u0930\u0947\u0938\u094D\u0915\u0947\u0932',
    saturation: '\u0938\u0902\u0924\u0943\u092A\u094D\u0924\u093F',
    saturationValue: '\u0938\u0902\u0924\u0943\u092A\u094D\u0924\u093F: {value}%',
    readingGuide: '\u092A\u0922\u093C\u0928\u0947 \u0915\u0940 \u0917\u093E\u0907\u0921',
    readingMask: '\u092A\u0922\u093C\u0928\u0947 \u0915\u093E \u092E\u093E\u0938\u094D\u0915',
    linkHighlight: '\u0932\u093F\u0902\u0915 \u0939\u093E\u0907\u0932\u093E\u0907\u091F',
    focusIndicator: '\u092B\u093C\u094B\u0915\u0938 \u0938\u0902\u0915\u0947\u0924\u0915',
    keyboardNavMode:
      '\u0915\u0940\u092C\u094B\u0930\u094D\u0921 \u0928\u0947\u0935\u093F\u0917\u0947\u0936\u0928 \u092E\u094B\u0921',
    skipNavigation:
      '\u092E\u0941\u0916\u094D\u092F \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092A\u0930 \u091C\u093E\u090F\u0902',
    focusTracker: '\u092B\u093C\u094B\u0915\u0938 \u091F\u094D\u0930\u0948\u0915\u0930',
    sectionSpeech: '\u092A\u093E\u0920 \u0938\u0947 \u092D\u093E\u0937\u0923',
    clickToRead:
      '\u092A\u0922\u093C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902',
    speechRate: '\u092D\u093E\u0937\u0923 \u0917\u0924\u093F',
    speechSlow: '\u0927\u0940\u092E\u093E',
    speechNormal: '\u0938\u093E\u092E\u093E\u0928\u094D\u092F',
    speechFast: '\u0924\u0947\u091C\u093C',
    readSelection: '\u091A\u092F\u0928 \u092A\u0922\u093C\u0947\u0902',
    readPage: '\u092A\u0943\u0937\u094D\u0920 \u092A\u0922\u093C\u0947\u0902',
    stopSpeech: '\u0930\u094B\u0915\u0947\u0902',
    speechActions: '\u092D\u093E\u0937\u0923 \u0915\u094D\u0930\u093F\u092F\u093E\u090F\u0901',
    speechSpeaking: '\u092C\u094B\u0932 \u0930\u0939\u093E \u0939\u0948\u2026',
    speechStopped:
      '\u092D\u093E\u0937\u0923 \u0930\u094B\u0915 \u0926\u093F\u092F\u093E \u0917\u092F\u093E\u0964',
    speechFinished: '\u092A\u0922\u093C\u0928\u093E \u0938\u092E\u093E\u092A\u094D\u0924\u0964',
    speechNoSelection:
      '\u092A\u0939\u0932\u0947 \u092A\u0943\u0937\u094D\u0920 \u092A\u0930 \u092A\u093E\u0920 \u091A\u0941\u0928\u0947\u0902\u0964',
    speechNoContent:
      '\u0915\u094B\u0908 \u092A\u0920\u0928\u0940\u092F \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u0940\u0964',
    speechUnsupported:
      '\u092F\u0939 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092A\u093E\u0920-\u0938\u0947-\u092D\u093E\u0937\u0923 \u0915\u093E \u0938\u092E\u0930\u094D\u0925\u0928 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E\u0964',
    language: '\u092D\u093E\u0937\u093E',
    langEn: '\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u093C\u0940',
    langHi: '\u0939\u093F\u0902\u0926\u0940',
    launcherLabel: '\u0938\u0941\u0932\u092D\u0924\u093E \u0935\u093F\u0915\u0932\u094D\u092A',
    on: '\u091A\u093E\u0932\u0942',
    off: '\u092C\u0902\u0926',
    ariaPressed: '\u091A\u092F\u0928\u093F\u0924',
  };
  var se = { en: T, hi: C };
  function n(s, e, t) {
    var o, r;
    let i = (r = (o = se[e][s]) != null ? o : T[s]) != null ? r : s;
    if (t) for (let [c, p] of Object.entries(t)) i = i.replace(`{${c}}`, p);
    return i;
  }
  var P = 'as-widget-style-';
  function h(s, e) {
    let t = `${P}${s}`,
      a = document.getElementById(t);
    (a ||
      ((a = document.createElement('style')),
      (a.id = t),
      a.setAttribute('data-accessshield', 'true'),
      document.head.appendChild(a)),
      (a.textContent = e));
  }
  function d(s) {
    var e;
    (e = document.getElementById(`${P}${s}`)) == null || e.remove();
  }
  function M() {
    document.querySelectorAll('[data-accessshield="true"]').forEach((s) => s.remove());
  }
  function g(s, e) {
    let t = `as-widget-el-${s}`,
      a = document.getElementById(t);
    return (
      a ||
        ((a = document.createElement(e)),
        (a.id = t),
        a.setAttribute('data-accessshield', 'true'),
        document.body.appendChild(a)),
      a
    );
  }
  function f(s) {
    var e;
    (e = document.getElementById(`as-widget-el-${s}`)) == null || e.remove();
  }
  var $ = `
@font-face {
  font-family: 'OpenDyslexic';
  src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`,
    R = { sm: '87.5%', default: '100%', lg: '125%' },
    I = `
.as-dark-mode {
  color-scheme: dark !important;
}
@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
  .as-dark-mode, .as-dark-mode body {
    background-color: #1a1a2e !important;
    color: #f9fafb !important;
  }
  .as-dark-mode a { color: #93c5fd !important; }
  .as-dark-mode *:not([data-accessshield]) {
    border-color: #6b7280 !important;
  }
}`,
    F = `
.as-light-mode, .as-light-mode body {
  background-color: #ffffff !important;
  color: #1a1a2e !important;
  color-scheme: light !important;
}`,
    N = `
html {
  --as-hc-bg: #000000;
  --as-hc-fg: #ffffff;
  --as-hc-link: #ffff00;
}
html, html body {
  background-color: var(--as-hc-bg) !important;
  color: var(--as-hc-fg) !important;
}
html a { color: var(--as-hc-link) !important; text-decoration: underline !important; }
html button, html input, html select, html textarea {
  border: 2px solid var(--as-hc-fg) !important;
}`;
  function z(s) {
    (s.fontSize && h('font-size', `html { font-size: ${R[s.fontSize]} !important; }`),
      s.dyslexiaFont &&
        h('dyslexia', `${$} html, html * { font-family: 'OpenDyslexic', sans-serif !important; }`),
      s.darkMode && (document.documentElement.classList.add('as-dark-mode'), h('dark-mode', I)),
      s.lightMode && (document.documentElement.classList.add('as-light-mode'), h('light-mode', F)),
      s.highContrast && h('high-contrast', N));
    let e = [];
    (s.negativeContrast && e.push('invert(1)', 'hue-rotate(180deg)'),
      s.grayscale && e.push('grayscale(100%)'),
      s.saturation !== void 0 && s.saturation !== 100 && e.push(`saturate(${s.saturation}%)`),
      e.length > 0 && h('filters', `html { filter: ${e.join(' ')} !important; }`));
  }
  var S = class {
    constructor(e) {
      this.prefs = e;
      l(this, 'container', null);
      l(this, 'lang', 'en');
    }
    render(e, t) {
      ((this.lang = t),
        (this.container = document.createElement('section')),
        (this.container.className = 'as-section'),
        this.container.setAttribute('aria-labelledby', 'as-section-visual'),
        (this.container.innerHTML = this.buildHTML()),
        e.appendChild(this.container),
        this.bindEvents(),
        this.syncUI(this.prefs.get()));
    }
    apply(e) {
      (this.applyFontSize(e.fontSize),
        this.applyDyslexiaFont(e.dyslexiaFont),
        this.applyDarkMode(e.darkMode),
        this.applyLightMode(e.lightMode),
        this.applyHighContrast(e.highContrast),
        this.applyCombinedFilters(e));
    }
    reset() {
      (d('font-size'),
        d('dyslexia'),
        d('dark-mode'),
        d('light-mode'),
        d('high-contrast'),
        d('filters'),
        document.documentElement.classList.remove('as-dark-mode', 'as-light-mode'));
    }
    updateLabels(e) {
      ((this.lang = e),
        this.container &&
          ((this.container.querySelector('h2').textContent = n('sectionVisual', e)),
          this.updateText(this.container, e)));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-visual" class="as-section-title">${n('sectionVisual', e)}</h2>
      <div class="as-control-group">
        <span class="as-label" id="as-font-size-label">${n('fontSize', e)}</span>
        <div class="as-btn-group" role="group" aria-labelledby="as-font-size-label">
          <button type="button" class="as-btn as-btn-segment" data-font="sm" aria-pressed="false">${n('fontSizeSm', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-font="default" aria-pressed="true">${n('fontSizeDefault', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-font="lg" aria-pressed="false">${n('fontSizeLg', e)}</button>
        </div>
      </div>
      ${this.switchRow('dyslexiaFont', 'dyslexiaFont')}
      ${this.switchRow('darkMode', 'darkMode')}
      ${this.switchRow('lightMode', 'lightMode')}
      ${this.switchRow('highContrast', 'highContrast')}
      ${this.switchRow('negativeContrast', 'negativeContrast')}
      ${this.switchRow('grayscale', 'grayscale')}
      <div class="as-control-group">
        <label class="as-label" for="as-saturation">${n('saturation', e)}</label>
        <input type="range" id="as-saturation" class="as-slider" min="0" max="200" value="100"
          aria-valuemin="0" aria-valuemax="200" aria-valuenow="100"
          aria-label="${n('saturation', e)}" />
        <span class="as-slider-value" id="as-saturation-value" aria-live="polite">${n('saturationValue', e, { value: '100' })}</span>
      </div>`;
    }
    switchRow(e, t) {
      let a = this.lang;
      return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${n(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${n('off', a)}</span>
        </button>
      </div>`;
    }
    bindEvents() {
      if (!this.container) return;
      (this.container.querySelectorAll('[data-font]').forEach((t) => {
        t.addEventListener('click', () => {
          let a = t.dataset.font;
          this.prefs.update({ fontSize: a });
        });
      }),
        this.container.querySelectorAll('[data-toggle]').forEach((t) => {
          t.addEventListener('click', () => {
            let a = t.dataset.toggle,
              i = this.prefs.get(),
              r = {
                dyslexiaFont: 'dyslexiaFont',
                darkMode: 'darkMode',
                lightMode: 'lightMode',
                highContrast: 'highContrast',
                negativeContrast: 'negativeContrast',
                grayscale: 'grayscale',
              }[a];
            r && this.prefs.update({ [r]: !i[r] });
          });
        }));
      let e = this.container.querySelector('#as-saturation');
      e == null ||
        e.addEventListener('input', () => {
          let t = parseInt(e.value, 10);
          (e.setAttribute('aria-valuenow', String(t)), this.prefs.update({ saturation: t }));
        });
    }
    syncUI(e) {
      if (!this.container) return;
      this.container.querySelectorAll('[data-font]').forEach((o) => {
        let c = o.dataset.font === e.fontSize;
        (o.setAttribute('aria-pressed', String(c)), o.classList.toggle('as-active', c));
      });
      let t = [
        ['dyslexiaFont', e.dyslexiaFont],
        ['darkMode', e.darkMode],
        ['lightMode', e.lightMode],
        ['highContrast', e.highContrast],
        ['negativeContrast', e.negativeContrast],
        ['grayscale', e.grayscale],
      ];
      for (let [o, r] of t) {
        let c = this.container.querySelector(`#as-toggle-${o}`);
        if (c) {
          (c.setAttribute('aria-checked', String(r)), c.classList.toggle('as-checked', r));
          let p = c.querySelector('.as-switch-text');
          p && (p.textContent = n(r ? 'on' : 'off', this.lang));
        }
      }
      let a = this.container.querySelector('#as-saturation'),
        i = this.container.querySelector('#as-saturation-value');
      (a &&
        ((a.value = String(e.saturation)), a.setAttribute('aria-valuenow', String(e.saturation))),
        i && (i.textContent = n('saturationValue', this.lang, { value: String(e.saturation) })));
    }
    updateText(e, t) {
      let a = [
        ['as-font-size-label', 'fontSize'],
        ['as-label-dyslexiaFont', 'dyslexiaFont'],
        ['as-label-darkMode', 'darkMode'],
        ['as-label-lightMode', 'lightMode'],
        ['as-label-highContrast', 'highContrast'],
        ['as-label-negativeContrast', 'negativeContrast'],
        ['as-label-grayscale', 'grayscale'],
        ['as-saturation', 'saturation'],
      ];
      for (let [i, o] of a) {
        let r = e.querySelector(`#${i}`);
        r &&
          (r.tagName === 'INPUT'
            ? r.setAttribute('aria-label', n(o, t))
            : (r.textContent = n(o, t)));
      }
      (e.querySelectorAll('[data-font]').forEach((i, o) => {
        let r = ['fontSizeSm', 'fontSizeDefault', 'fontSizeLg'];
        i.textContent = n(r[o], t);
      }),
        this.syncUI(this.prefs.get()));
    }
    applyFontSize(e) {
      h('font-size', `html { font-size: ${R[e]} !important; }`);
    }
    applyDyslexiaFont(e) {
      e
        ? h('dyslexia', `${$} html, html * { font-family: 'OpenDyslexic', sans-serif !important; }`)
        : d('dyslexia');
    }
    applyDarkMode(e) {
      e
        ? (document.documentElement.classList.add('as-dark-mode'), h('dark-mode', I))
        : (document.documentElement.classList.remove('as-dark-mode'), d('dark-mode'));
    }
    applyLightMode(e) {
      e
        ? (document.documentElement.classList.add('as-light-mode'), h('light-mode', F))
        : (document.documentElement.classList.remove('as-light-mode'), d('light-mode'));
    }
    applyHighContrast(e) {
      e ? h('high-contrast', N) : d('high-contrast');
    }
    applyCombinedFilters(e) {
      let t = [];
      if (
        (e.negativeContrast && t.push('invert(1)', 'hue-rotate(180deg)'),
        e.grayscale && t.push('grayscale(100%)'),
        e.saturation !== 100 && t.push(`saturate(${e.saturation}%)`),
        t.length > 0)
      ) {
        let a = t.join(' '),
          i = e.negativeContrast
            ? 'html img, html video, html picture { filter: invert(1) hue-rotate(180deg) !important; }'
            : '';
        h('filters', `html { filter: ${a} !important; } ${i}`);
      } else d('filters');
    }
  };
  var x = class {
    constructor(e) {
      this.prefs = e;
      l(this, 'container', null);
      l(this, 'lang', 'en');
      l(this, 'onLangChange', null);
    }
    render(e, t, a) {
      ((this.lang = t),
        (this.onLangChange = a != null ? a : null),
        (this.container = document.createElement('section')),
        (this.container.className = 'as-section'),
        this.container.setAttribute('aria-labelledby', 'as-section-language'),
        (this.container.innerHTML = this.buildHTML()),
        e.appendChild(this.container),
        this.bindEvents(),
        this.syncUI(this.prefs.get()));
    }
    updateLabels(e) {
      if (((this.lang = e), !this.container)) return;
      this.container.querySelector('h2').textContent = n('sectionLanguage', e);
      let t = this.container.querySelector('#as-lang-label');
      (t && (t.textContent = n('language', e)),
        this.container.querySelectorAll('[data-lang]').forEach((a) => {
          let i = a.dataset.lang;
          a.textContent = n(i === 'en' ? 'langEn' : 'langHi', e);
        }),
        this.syncUI(this.prefs.get()));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-language" class="as-section-title">${n('sectionLanguage', e)}</h2>
      <div class="as-control-group">
        <span class="as-label" id="as-lang-label">${n('language', e)}</span>
        <div class="as-btn-group" role="group" aria-labelledby="as-lang-label">
          <button type="button" class="as-btn as-btn-segment" data-lang="en" aria-pressed="true">${n('langEn', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-lang="hi" aria-pressed="false">${n('langHi', e)}</button>
        </div>
      </div>`;
    }
    bindEvents() {
      this.container &&
        this.container.querySelectorAll('[data-lang]').forEach((e) => {
          e.addEventListener('click', () => {
            var a;
            let t = e.dataset.lang;
            (this.prefs.update({ language: t }),
              (a = this.onLangChange) == null || a.call(this, t));
          });
        });
    }
    syncUI(e) {
      this.container &&
        this.container.querySelectorAll('[data-lang]').forEach((t) => {
          let i = t.dataset.lang === e.language;
          (t.setAttribute('aria-pressed', String(i)), t.classList.toggle('as-active', i));
        });
    }
  };
  var E = class {
    constructor(e) {
      this.prefs = e;
      l(this, 'container', null);
      l(this, 'lang', 'en');
      l(this, 'focusHandler', null);
      l(this, 'trackerEl', null);
      l(this, 'keyHandler', null);
    }
    render(e, t) {
      ((this.lang = t),
        (this.container = document.createElement('section')),
        (this.container.className = 'as-section'),
        this.container.setAttribute('aria-labelledby', 'as-section-navigation'),
        (this.container.innerHTML = this.buildHTML()),
        e.appendChild(this.container),
        this.bindEvents(),
        this.syncUI(this.prefs.get()));
    }
    apply(e) {
      (this.applyKeyboardNavMode(e.keyboardNavMode),
        this.applySkipNavigation(e.skipNavigation),
        this.applyFocusTracker(e.focusTracker));
    }
    reset() {
      (this.stopKeyboardNavMode(), this.removeSkipLink(), this.stopFocusTracker());
    }
    updateLabels(e) {
      ((this.lang = e),
        this.container &&
          ((this.container.querySelector('h2').textContent = n('sectionNavigation', e)),
          this.updateText(this.container, e)));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-navigation" class="as-section-title">${n('sectionNavigation', e)}</h2>
      ${this.switchRow('keyboardNavMode', 'keyboardNavMode')}
      <div class="as-control-row">
        <button type="button" class="as-btn as-btn-action" id="as-skip-nav-btn">${n('skipNavigation', e)}</button>
      </div>
      ${this.switchRow('focusTracker', 'focusTracker')}`;
    }
    switchRow(e, t) {
      let a = this.lang;
      return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${n(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${n('off', a)}</span>
        </button>
      </div>`;
    }
    bindEvents() {
      var e;
      this.container &&
        ((e = this.container.querySelector('#as-skip-nav-btn')) == null ||
          e.addEventListener('click', () => {
            this.activateSkipLink();
          }),
        this.container.querySelectorAll('[data-toggle]').forEach((t) => {
          t.addEventListener('click', () => {
            let a = t.dataset.toggle,
              o = { keyboardNavMode: 'keyboardNavMode', focusTracker: 'focusTracker' }[a];
            if (o) {
              let r = this.prefs.get();
              this.prefs.update({ [o]: !r[o] });
            }
          });
        }));
    }
    syncUI(e) {
      if (!this.container) return;
      let t = [
        ['keyboardNavMode', e.keyboardNavMode],
        ['focusTracker', e.focusTracker],
      ];
      for (let [a, i] of t) {
        let o = this.container.querySelector(`#as-toggle-${a}`);
        if (o) {
          (o.setAttribute('aria-checked', String(i)), o.classList.toggle('as-checked', i));
          let r = o.querySelector('.as-switch-text');
          r && (r.textContent = n(i ? 'on' : 'off', this.lang));
        }
      }
    }
    updateText(e, t) {
      let a = [
        ['as-label-keyboardNavMode', 'keyboardNavMode'],
        ['as-label-focusTracker', 'focusTracker'],
      ];
      for (let [o, r] of a) {
        let c = e.querySelector(`#${o}`);
        c && (c.textContent = n(r, t));
      }
      let i = e.querySelector('#as-skip-nav-btn');
      (i && (i.textContent = n('skipNavigation', t)), this.syncUI(this.prefs.get()));
    }
    applyKeyboardNavMode(e) {
      e
        ? (h(
            'keyboard-nav',
            `
        *:focus, *:focus-visible {
          outline: 3px solid #1A56A0 !important;
          outline-offset: 2px !important;
        }
        [accesskey]::after {
          content: ' [' attr(accesskey) ']';
          font-size: 0.75rem;
          color: #1A56A0;
          font-weight: bold;
        }`,
          ),
          (this.keyHandler = (t) => {
            t.altKey && t.key === '1' && this.activateSkipLink();
          }),
          document.addEventListener('keydown', this.keyHandler))
        : this.stopKeyboardNavMode();
    }
    stopKeyboardNavMode() {
      (d('keyboard-nav'),
        this.keyHandler &&
          (document.removeEventListener('keydown', this.keyHandler), (this.keyHandler = null)));
    }
    applySkipNavigation(e) {
      e ? this.ensureSkipLink() : this.removeSkipLink();
    }
    ensureSkipLink() {
      var a;
      let e = document.getElementById('skip-to-content');
      e ||
        ((e = document.createElement('a')),
        (e.id = 'skip-to-content'),
        (e.href = '#main-content'),
        e.setAttribute('data-accessshield', 'true'),
        (e.textContent = n('skipNavigation', this.lang)),
        Object.assign(e.style, {
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }),
        e.addEventListener('focus', () => {
          Object.assign(e.style, {
            position: 'fixed',
            top: '8px',
            left: '8px',
            width: 'auto',
            height: 'auto',
            overflow: 'visible',
            zIndex: '100000',
            padding: '12px 16px',
            background: '#1A56A0',
            color: '#fff',
            borderRadius: '6px',
            fontWeight: '600',
            textDecoration: 'none',
          });
        }),
        e.addEventListener('blur', () => {
          Object.assign(e.style, {
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          });
        }),
        document.body.prepend(e));
      let t = document.getElementById('main-content');
      t ||
        ((t =
          (a = document.querySelector('main')) != null
            ? a
            : document.querySelector('[role="main"]')),
        t && !t.id && (t.id = 'main-content'));
    }
    activateSkipLink() {
      (this.prefs.update({ skipNavigation: !0 }), this.ensureSkipLink());
      let e = document.getElementById('skip-to-content');
      e == null || e.focus();
      let t = document.getElementById('main-content');
      t && (t.setAttribute('tabindex', '-1'), t.focus());
    }
    removeSkipLink() {
      var e;
      (e = document.getElementById('skip-to-content')) == null || e.remove();
    }
    applyFocusTracker(e) {
      e
        ? ((this.trackerEl = g('focus-tracker', 'div')),
          Object.assign(this.trackerEl.style, {
            position: 'fixed',
            width: '4px',
            height: '4px',
            backgroundColor: '#E07B00',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '99991',
            transition: 'top 0.1s, left 0.1s',
            boxShadow: '0 0 8px 2px rgba(224, 123, 0, 0.6)',
            display: 'none',
          }),
          this.trackerEl.setAttribute('aria-hidden', 'true'),
          (this.focusHandler = () => {
            let t = document.activeElement;
            if (!t || !this.trackerEl || t === document.body) {
              this.trackerEl && (this.trackerEl.style.display = 'none');
              return;
            }
            let a = t.getBoundingClientRect();
            ((this.trackerEl.style.display = 'block'),
              (this.trackerEl.style.top = `${a.top + a.height / 2 - 2}px`),
              (this.trackerEl.style.left = `${a.left + a.width / 2 - 2}px`));
          }),
          document.addEventListener('focusin', this.focusHandler),
          this.focusHandler())
        : this.stopFocusTracker();
    }
    stopFocusTracker() {
      (this.focusHandler &&
        (document.removeEventListener('focusin', this.focusHandler), (this.focusHandler = null)),
        f('focus-tracker'),
        (this.trackerEl = null));
    }
  };
  var q = 3,
    ne = 0.6,
    L = class {
      constructor(e) {
        this.prefs = e;
        l(this, 'container', null);
        l(this, 'lang', 'en');
        l(this, 'guideMouseHandler', null);
        l(this, 'maskMouseHandler', null);
        l(this, 'guideEl', null);
        l(this, 'maskTop', null);
        l(this, 'maskBottom', null);
      }
      render(e, t) {
        ((this.lang = t),
          (this.container = document.createElement('section')),
          (this.container.className = 'as-section'),
          this.container.setAttribute('aria-labelledby', 'as-section-reading'),
          (this.container.innerHTML = this.buildHTML()),
          e.appendChild(this.container),
          this.bindEvents(),
          this.syncUI(this.prefs.get()));
      }
      apply(e) {
        (this.applyReadingGuide(e.readingGuide),
          this.applyReadingMask(e.readingMask),
          this.applyLinkHighlight(e.linkHighlight),
          this.applyFocusIndicator(e.focusIndicator));
      }
      reset() {
        (this.stopReadingGuide(),
          this.stopReadingMask(),
          d('link-highlight'),
          d('focus-indicator'));
      }
      updateLabels(e) {
        ((this.lang = e),
          this.container &&
            ((this.container.querySelector('h2').textContent = n('sectionReading', e)),
            this.updateText(this.container, e)));
      }
      buildHTML() {
        let e = this.lang;
        return `
      <h2 id="as-section-reading" class="as-section-title">${n('sectionReading', e)}</h2>
      ${this.switchRow('readingGuide', 'readingGuide')}
      ${this.switchRow('readingMask', 'readingMask')}
      ${this.switchRow('linkHighlight', 'linkHighlight')}
      ${this.switchRow('focusIndicator', 'focusIndicator')}`;
      }
      switchRow(e, t) {
        let a = this.lang;
        return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${n(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${n('off', a)}</span>
        </button>
      </div>`;
      }
      bindEvents() {
        if (!this.container) return;
        let e = {
          readingGuide: 'readingGuide',
          readingMask: 'readingMask',
          linkHighlight: 'linkHighlight',
          focusIndicator: 'focusIndicator',
        };
        this.container.querySelectorAll('[data-toggle]').forEach((t) => {
          t.addEventListener('click', () => {
            let a = t.dataset.toggle,
              i = e[a];
            if (i) {
              let o = this.prefs.get();
              this.prefs.update({ [i]: !o[i] });
            }
          });
        });
      }
      syncUI(e) {
        if (!this.container) return;
        let t = [
          ['readingGuide', e.readingGuide],
          ['readingMask', e.readingMask],
          ['linkHighlight', e.linkHighlight],
          ['focusIndicator', e.focusIndicator],
        ];
        for (let [a, i] of t) {
          let o = this.container.querySelector(`#as-toggle-${a}`);
          if (o) {
            (o.setAttribute('aria-checked', String(i)), o.classList.toggle('as-checked', i));
            let r = o.querySelector('.as-switch-text');
            r && (r.textContent = n(i ? 'on' : 'off', this.lang));
          }
        }
      }
      updateText(e, t) {
        let a = [
          ['as-label-readingGuide', 'readingGuide'],
          ['as-label-readingMask', 'readingMask'],
          ['as-label-linkHighlight', 'linkHighlight'],
          ['as-label-focusIndicator', 'focusIndicator'],
        ];
        for (let [i, o] of a) {
          let r = e.querySelector(`#${i}`);
          r && (r.textContent = n(o, t));
        }
        this.syncUI(this.prefs.get());
      }
      applyReadingGuide(e) {
        e
          ? ((this.guideEl = g('reading-guide', 'div')),
            Object.assign(this.guideEl.style, {
              position: 'fixed',
              left: '0',
              width: '100%',
              height: `${q}px`,
              backgroundColor: '#1A56A0',
              pointerEvents: 'none',
              zIndex: '99990',
              top: '0',
              transition: 'top 0.05s ease-out',
            }),
            this.guideEl.setAttribute('aria-hidden', 'true'),
            (this.guideMouseHandler = (t) => {
              this.guideEl && (this.guideEl.style.top = `${t.clientY - q / 2}px`);
            }),
            document.addEventListener('mousemove', this.guideMouseHandler, { passive: !0 }))
          : this.stopReadingGuide();
      }
      stopReadingGuide() {
        (this.guideMouseHandler &&
          (document.removeEventListener('mousemove', this.guideMouseHandler),
          (this.guideMouseHandler = null)),
          f('reading-guide'),
          (this.guideEl = null));
      }
      applyReadingMask(e) {
        if (e) {
          let t = {
            position: 'fixed',
            left: '0',
            width: '100%',
            backgroundColor: `rgba(0, 0, 0, ${ne})`,
            pointerEvents: 'none',
            zIndex: '99989',
          };
          ((this.maskTop = g('reading-mask-top', 'div')),
            Object.assign(this.maskTop.style, { ...t, top: '0', height: '0' }),
            this.maskTop.setAttribute('aria-hidden', 'true'),
            (this.maskBottom = g('reading-mask-bottom', 'div')),
            Object.assign(this.maskBottom.style, { ...t, bottom: '0', height: '0' }),
            this.maskBottom.setAttribute('aria-hidden', 'true'));
          let a = (i) => {
            let o = i.clientY,
              r = 40;
            (this.maskTop && (this.maskTop.style.height = `${Math.max(0, o - r / 2)}px`),
              this.maskBottom &&
                (this.maskBottom.style.height = `${Math.max(0, window.innerHeight - o - r / 2)}px`));
          };
          ((this.maskMouseHandler = a), document.addEventListener('mousemove', a, { passive: !0 }));
        } else this.stopReadingMask();
      }
      stopReadingMask() {
        (this.maskMouseHandler &&
          (document.removeEventListener('mousemove', this.maskMouseHandler),
          (this.maskMouseHandler = null)),
          f('reading-mask-top'),
          f('reading-mask-bottom'),
          (this.maskTop = null),
          (this.maskBottom = null));
      }
      applyLinkHighlight(e) {
        e
          ? h(
              'link-highlight',
              `
        a, a:visited {
          outline: 3px solid #E07B00 !important;
          outline-offset: 2px !important;
          background-color: rgba(254, 243, 226, 0.5) !important;
        }`,
            )
          : d('link-highlight');
      }
      applyFocusIndicator(e) {
        e
          ? h(
              'focus-indicator',
              `
        *:focus-visible {
          outline: 3px solid #1A56A0 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(26, 86, 160, 0.3) !important;
        }`,
            )
          : d('focus-indicator');
      }
    };
  function m() {
    return typeof window != 'undefined' && 'speechSynthesis' in window;
  }
  function U(s) {
    return s === 'hi' ? 'hi-IN' : 'en-IN';
  }
  function oe(s) {
    var a, i;
    let e = window.speechSynthesis.getVoices(),
      t = s === 'hi' ? 'hi' : 'en';
    return (i =
      (a = e.find((o) => o.lang === U(s))) != null ? a : e.find((o) => o.lang.startsWith(t))) !=
      null
      ? i
      : e[0];
  }
  function re(s) {
    return Math.min(2, Math.max(0.5, s));
  }
  function W(s, e, t) {
    if (!m() || !s.trim()) return !1;
    window.speechSynthesis.cancel();
    let a = new SpeechSynthesisUtterance(s.trim());
    ((a.lang = U(e.lang)), (a.rate = re(e.rate)));
    let i = oe(e.lang);
    return (
      i && (a.voice = i),
      t && ((a.onend = () => t()), (a.onerror = () => t())),
      window.speechSynthesis.speak(a),
      !0
    );
  }
  function H() {
    m() && window.speechSynthesis.cancel();
  }
  function O() {
    var t, a, i;
    let e = (
      (i =
        (a =
          (t = document.getElementById('main-content')) != null
            ? t
            : document.querySelector('main')) != null
          ? a
          : document.querySelector('[role="main"]')) != null
        ? i
        : document.body
    ).cloneNode(!0);
    return (
      e
        .querySelectorAll(
          '#accessshield-widget, script, style, noscript, [data-accessshield], [aria-hidden="true"]',
        )
        .forEach((o) => o.remove()),
      e.innerText.replace(/\s+/g, ' ').trim()
    );
  }
  function K() {
    let s = window.getSelection();
    return !s || s.isCollapsed ? '' : s.toString().replace(/\s+/g, ' ').trim();
  }
  function B(s) {
    if (!(s instanceof Element) || s.closest('#accessshield-widget')) return null;
    let e = s.closest(
      'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, button, a',
    );
    return e && e.innerText.replace(/\s+/g, ' ').trim().length > 0 ? e : null;
  }
  function _() {
    m() &&
      (window.speechSynthesis.getVoices(),
      (window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      }));
  }
  var A = { slow: 0.75, normal: 1, fast: 1.25 },
    le = 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, button, a',
    w = class {
      constructor(e) {
        this.prefs = e;
        l(this, 'container', null);
        l(this, 'statusEl', null);
        l(this, 'lang', 'en');
        l(this, 'clickHandler', null);
        l(this, 'highlightEl', null);
        _();
      }
      render(e, t) {
        ((this.lang = t),
          (this.container = document.createElement('section')),
          (this.container.className = 'as-section'),
          this.container.setAttribute('aria-labelledby', 'as-section-speech'),
          (this.container.innerHTML = this.buildHTML()),
          e.appendChild(this.container),
          (this.statusEl = this.container.querySelector('#as-speech-status')),
          this.bindEvents(),
          this.syncUI(this.prefs.get()));
      }
      apply(e) {
        this.applyClickToRead(e.textToSpeech);
      }
      reset() {
        (H(), this.clearHighlight(), this.stopClickToRead(), this.setStatus(''));
      }
      updateLabels(e) {
        ((this.lang = e),
          this.container &&
            ((this.container.querySelector('h2').textContent = n('sectionSpeech', e)),
            this.updateText(this.container, e)));
      }
      syncUI(e) {
        if (!this.container) return;
        let t = this.container.querySelector('#as-toggle-textToSpeech');
        if (t) {
          (t.setAttribute('aria-checked', String(e.textToSpeech)),
            t.classList.toggle('as-checked', e.textToSpeech));
          let o = t.querySelector('.as-switch-text');
          o && (o.textContent = n(e.textToSpeech ? 'on' : 'off', this.lang));
        }
        let a = ['slow', 'normal', 'fast'];
        for (let o of a) {
          let r = this.container.querySelector(`#as-rate-${o}`),
            c = e.speechRate === A[o];
          (r == null || r.classList.toggle('as-active', c),
            r == null || r.setAttribute('aria-pressed', String(c)));
        }
        let i = this.container.querySelector('#as-speech-unsupported');
        i && (i.hidden = m());
      }
      buildHTML() {
        let e = this.lang,
          t = m();
        return `
      <h2 id="as-section-speech" class="as-section-title">${n('sectionSpeech', e)}</h2>
      <p id="as-speech-unsupported" class="as-hint" ${t ? 'hidden' : ''} role="alert">
        ${n('speechUnsupported', e)}
      </p>
      ${this.switchRow('textToSpeech', 'clickToRead')}
      <div class="as-control-group" role="group" aria-labelledby="as-label-speechRate">
        <span class="as-label" id="as-label-speechRate">${n('speechRate', e)}</span>
        <div class="as-btn-group as-btn-group-wrap">
          ${this.rateBtn('slow', 'speechSlow')}
          ${this.rateBtn('normal', 'speechNormal')}
          ${this.rateBtn('fast', 'speechFast')}
        </div>
      </div>
      <div class="as-speech-actions" role="group" aria-label="${n('speechActions', e)}">
        <button type="button" class="as-btn as-btn-action" id="as-read-selection">${n('readSelection', e)}</button>
        <button type="button" class="as-btn as-btn-action" id="as-read-page">${n('readPage', e)}</button>
        <button type="button" class="as-btn as-btn-action as-btn-stop" id="as-stop-speech">${n('stopSpeech', e)}</button>
      </div>
      <p id="as-speech-status" class="as-speech-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
      }
      switchRow(e, t) {
        let a = this.lang;
        return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${n(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${n('off', a)}</span>
        </button>
      </div>`;
      }
      rateBtn(e, t) {
        return `<button type="button" class="as-btn as-btn-segment" id="as-rate-${e}"
      aria-pressed="false" data-rate="${e}">${n(t, this.lang)}</button>`;
      }
      bindEvents() {
        var e, t, a, i;
        this.container &&
          ((e = this.container.querySelector('#as-toggle-textToSpeech')) == null ||
            e.addEventListener('click', () => {
              let o = this.prefs.get();
              this.prefs.update({ textToSpeech: !o.textToSpeech });
            }),
          this.container.querySelectorAll('[data-rate]').forEach((o) => {
            o.addEventListener('click', () => {
              let r = o.dataset.rate;
              r in A && this.prefs.update({ speechRate: A[r] });
            });
          }),
          (t = this.container.querySelector('#as-read-selection')) == null ||
            t.addEventListener('click', () => {
              this.readSelection();
            }),
          (a = this.container.querySelector('#as-read-page')) == null ||
            a.addEventListener('click', () => {
              this.readPage();
            }),
          (i = this.container.querySelector('#as-stop-speech')) == null ||
            i.addEventListener('click', () => {
              this.stop();
            }));
      }
      readSelection() {
        let e = K();
        if (!e) {
          this.setStatus(n('speechNoSelection', this.lang));
          return;
        }
        this.speak(e);
      }
      readPage() {
        let e = O();
        if (!e) {
          this.setStatus(n('speechNoContent', this.lang));
          return;
        }
        this.speak(e.slice(0, 8e3));
      }
      speak(e, t) {
        let a = this.prefs.get();
        (this.clearHighlight(),
          t && ((this.highlightEl = t), t.classList.add('as-tts-reading')),
          W(e, { lang: a.language, rate: a.speechRate }, () => {
            (this.clearHighlight(), this.setStatus(n('speechFinished', this.lang)));
          })
            ? this.setStatus(n('speechSpeaking', this.lang))
            : this.setStatus(n('speechUnsupported', this.lang)));
      }
      stop() {
        (H(), this.clearHighlight(), this.setStatus(n('speechStopped', this.lang)));
      }
      setStatus(e) {
        this.statusEl && (this.statusEl.textContent = e);
      }
      applyClickToRead(e) {
        e
          ? (h(
              'tts-click',
              `
        ${le} {
          cursor: pointer !important;
        }
        .as-tts-reading {
          outline: 3px solid #1A56A0 !important;
          outline-offset: 4px !important;
          background-color: rgba(235, 243, 251, 0.85) !important;
        }`,
            ),
            (this.clickHandler = (t) => {
              let a = B(t.target);
              if (!a) return;
              (t.preventDefault(), t.stopPropagation());
              let i = a.innerText.replace(/\s+/g, ' ').trim();
              i && this.speak(i, a);
            }),
            document.addEventListener('click', this.clickHandler, !0))
          : this.stopClickToRead();
      }
      stopClickToRead() {
        (d('tts-click'),
          this.clickHandler &&
            (document.removeEventListener('click', this.clickHandler, !0),
            (this.clickHandler = null)),
          this.clearHighlight());
      }
      clearHighlight() {
        (this.highlightEl &&
          (this.highlightEl.classList.remove('as-tts-reading'), (this.highlightEl = null)),
          document.querySelectorAll('.as-tts-reading').forEach((e) => {
            e.classList.remove('as-tts-reading');
          }));
      }
      updateText(e, t) {
        let a = [
          ['as-label-textToSpeech', 'clickToRead'],
          ['as-label-speechRate', 'speechRate'],
        ];
        for (let [c, p] of a) {
          let u = e.querySelector(`#${c}`);
          u && (u.textContent = n(p, t));
        }
        let i = [
          ['as-read-selection', 'readSelection'],
          ['as-read-page', 'readPage'],
          ['as-stop-speech', 'stopSpeech'],
        ];
        for (let [c, p] of i) {
          let u = e.querySelector(`#${c}`);
          u && (u.textContent = n(p, t));
        }
        let o = [
          ['slow', 'speechSlow'],
          ['normal', 'speechNormal'],
          ['fast', 'speechFast'],
        ];
        for (let [c, p] of o) {
          let u = e.querySelector(`#as-rate-${c}`);
          u && (u.textContent = n(p, t));
        }
        let r = e.querySelector('#as-speech-unsupported');
        (r && (r.textContent = n('speechUnsupported', t)), this.syncUI(this.prefs.get()));
      }
    };
  var D = `/* AccessShield Widget \u2014 Shadow DOM styles (WCAG 2.2 AA compliant) */

:host {
  all: initial;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #1a1a2e;
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* Launcher button */
.as-launcher {
  position: fixed;
  z-index: 99999;
  width: 3.25rem;
  height: 3.25rem;
  min-width: 3.25rem;
  min-height: 3.25rem;
  padding: 0;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #1a56a0;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.15s ease, transform 0.15s ease;
}

.as-launcher:hover {
  background: #0d2e5a;
}

.as-launcher:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(26, 86, 160, 0.4);
}

.as-launcher svg {
  width: 1.75rem;
  height: 1.75rem;
  fill: currentColor;
}

.as-launcher.as-pos-bottom-right { bottom: 1rem; right: 1rem; }
.as-launcher.as-pos-bottom-left { bottom: 1rem; left: 1rem; }
.as-launcher.as-pos-top-right { top: 1rem; right: 1rem; }
.as-launcher.as-pos-top-left { top: 1rem; left: 1rem; }

/* Panel */
.as-panel {
  position: fixed;
  top: 0;
  z-index: 99998;
  width: 21.25rem;
  max-width: calc(100vw - 2rem);
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.2s ease;
  overflow: hidden;
}

.as-panel.as-open {
  transform: translateX(0);
}

.as-panel.as-pos-bottom-right,
.as-panel.as-pos-top-right { right: 0; }
.as-panel.as-pos-bottom-left,
.as-panel.as-pos-top-left {
  right: auto;
  left: 0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  transform: translateX(-100%);
}
.as-panel.as-pos-bottom-left.as-open,
.as-panel.as-pos-top-left.as-open {
  transform: translateX(0);
}

/* Panel header */
.as-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #d1d5db;
  background: #f4f8fd;
  flex-shrink: 0;
}

.as-panel-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a3a5c;
}

.as-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: #1a1a2e;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.as-close-btn:hover {
  background: #ebf3fb;
}

.as-close-btn:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 2px;
}

/* Panel content */
.as-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
  -webkit-overflow-scrolling: touch;
}

/* Sections */
.as-section {
  margin-bottom: 1.5rem;
}

.as-section-title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1a3a5c;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #d1d5db;
}

/* Controls */
.as-control-group {
  margin-bottom: 0.75rem;
}

.as-control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  min-height: 2.75rem;
}

.as-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  flex: 1;
}

/* Button group (font size, language) */
.as-btn-group {
  display: flex;
  gap: 0.25rem;
}

.as-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #f9fafb;
  color: #1a1a2e;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.1s, border-color 0.1s;
}

.as-btn:hover {
  background: #ebf3fb;
  border-color: #1a56a0;
}

.as-btn:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 2px;
}

.as-btn.as-active,
.as-btn-segment.as-active {
  background: #1a56a0;
  color: #ffffff;
  border-color: #1a56a0;
}

.as-btn-action {
  width: 100%;
  background: #ebf3fb;
  border-color: #1a56a0;
  color: #1a3a5c;
  font-weight: 600;
}

.as-btn-action:hover {
  background: #1a56a0;
  color: #ffffff;
}

/* Switch toggle */
.as-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
}

.as-switch:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 2px;
}

.as-switch-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  background: #d1d5db;
  border-radius: 9999px;
  transition: background 0.15s;
}

.as-switch.as-checked .as-switch-track {
  background: #1a56a0;
}

.as-switch-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.15s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.as-switch.as-checked .as-switch-thumb {
  transform: translateX(1.25rem);
}

.as-switch-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  min-width: 2rem;
}

.as-switch.as-checked .as-switch-text {
  color: #1a56a0;
}

.as-btn-group-wrap {
  flex-wrap: wrap;
  margin-top: 0.375rem;
}

.as-speech-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.as-btn-stop {
  background: #fdeaea;
  border-color: #8b1a1a;
  color: #8b1a1a;
}

.as-btn-stop:hover {
  background: #8b1a1a;
  color: #ffffff;
}

.as-hint {
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.5;
}

.as-speech-status {
  margin: 0.75rem 0 0;
  min-height: 1.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #1a56a0;
}

/* Slider */
.as-slider {
  width: 100%;
  height: 2.75rem;
  margin: 0.25rem 0;
  cursor: pointer;
  accent-color: #1a56a0;
}

.as-slider:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 2px;
}

.as-slider-value {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
}

/* Panel footer */
.as-panel-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #d1d5db;
  flex-shrink: 0;
}

.as-reset-btn {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background: #8b1a1a;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.as-reset-btn:hover {
  background: #6b1515;
}

.as-reset-btn:focus-visible {
  outline: 2px solid #1a56a0;
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .as-launcher,
  .as-panel,
  .as-switch-track,
  .as-switch-thumb,
  .as-btn {
    transition: none;
  }
}
`;
  var b = {
    fontSize: 'default',
    dyslexiaFont: !1,
    darkMode: !1,
    lightMode: !1,
    highContrast: !1,
    negativeContrast: !1,
    grayscale: !1,
    saturation: 100,
    readingGuide: !1,
    readingMask: !1,
    linkHighlight: !1,
    focusIndicator: !1,
    keyboardNavMode: !1,
    skipNavigation: !1,
    focusTracker: !1,
    textToSpeech: !1,
    speechRate: 1,
    language: 'en',
  };
  var j = 'accessshield_prefs_',
    de = 2e3,
    v = class {
      constructor(e, t, a) {
        l(this, 'prefs');
        l(this, 'token');
        l(this, 'apiUrl');
        l(this, 'listeners', []);
        ((this.token = e), (this.apiUrl = t), (this.prefs = { ...b, ...a }));
      }
      static loadFromStorage(e) {
        try {
          let t = localStorage.getItem(`${j}${e}`);
          return t ? JSON.parse(t) : null;
        } catch (t) {
          return null;
        }
      }
      get() {
        return { ...this.prefs };
      }
      update(e) {
        ((this.prefs = { ...this.prefs, ...e }),
          this.saveToStorage(),
          this.notify(),
          this.postToApi());
      }
      reset() {
        ((this.prefs = { ...b, language: this.prefs.language }),
          this.saveToStorage(),
          this.notify(),
          this.postToApi());
      }
      resetAll() {
        ((this.prefs = { ...b }), this.saveToStorage(), this.notify(), this.postToApi());
      }
      onChange(e) {
        return (
          this.listeners.push(e),
          () => {
            this.listeners = this.listeners.filter((t) => t !== e);
          }
        );
      }
      saveToStorage() {
        try {
          localStorage.setItem(`${j}${this.token}`, JSON.stringify(this.prefs));
        } catch (e) {}
      }
      notify() {
        let e = this.get();
        for (let t of this.listeners) t(e);
      }
      postToApi() {
        let e = new AbortController(),
          t = setTimeout(() => e.abort(), de);
        fetch(`${this.apiUrl}/api/v1/widget/preferences`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token, preferences: this.prefs }),
          signal: e.signal,
        }).finally(() => clearTimeout(t));
      }
    };
  var he = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <circle cx="12" cy="4" r="2" fill="currentColor"/>
  <path d="M12 7c-2.5 0-4.5 1.5-5.5 3.5L4 14h2.5l1-3h9l1 3H20l-2.5-3.5C16.5 8.5 14.5 7 12 7z" fill="currentColor"/>
  <path d="M8 16h8v5h-2v-3h-4v3H8v-5z" fill="currentColor"/>
</svg>`,
    G = {
      'bottom-right': 'as-pos-bottom-right',
      'bottom-left': 'as-pos-bottom-left',
      'top-right': 'as-pos-top-right',
      'top-left': 'as-pos-top-left',
    },
    y = class {
      constructor(e, t) {
        l(this, 'host');
        l(this, 'shadow');
        l(this, 'prefs');
        l(this, 'options');
        l(this, 'launcher', null);
        l(this, 'panel', null);
        l(this, 'isOpen', !1);
        l(this, 'lang');
        l(this, 'visual');
        l(this, 'reading');
        l(this, 'speech');
        l(this, 'navigation');
        l(this, 'language');
        l(this, 'escapeHandler', null);
        l(this, 'focusTrapHandler', null);
        var a;
        ((this.options = e),
          (this.lang = (a = t == null ? void 0 : t.language) != null ? a : e.lang),
          (this.prefs = new v(e.token, e.apiUrl, { ...t, language: this.lang })),
          (this.host = document.createElement('div')),
          (this.host.id = 'accessshield-widget'),
          (this.shadow = this.host.attachShadow({ mode: 'closed' })),
          (this.visual = new S(this.prefs)),
          (this.reading = new L(this.prefs)),
          (this.speech = new w(this.prefs)),
          (this.navigation = new E(this.prefs)),
          (this.language = new x(this.prefs)),
          this.applyAllPreferences(this.prefs.get()),
          this.prefs.onChange((i) => this.onPreferencesChange(i)),
          this.render(),
          document.body.appendChild(this.host));
      }
      render() {
        let e = document.createElement('style');
        ((e.textContent = D),
          this.shadow.appendChild(e),
          this.createLauncher(),
          this.createPanel(),
          this.bindGlobalKeys());
      }
      createLauncher() {
        let e = document.createElement('button');
        ((e.className = `as-launcher ${G[this.options.position]}`),
          (e.type = 'button'),
          e.setAttribute('aria-label', n('launcherLabel', this.lang)),
          e.setAttribute('aria-expanded', 'false'),
          e.setAttribute('aria-controls', 'as-panel'),
          (e.innerHTML = he),
          e.addEventListener('click', () => this.togglePanel()),
          this.shadow.appendChild(e),
          (this.launcher = e));
      }
      createPanel() {
        var a, i;
        let e = document.createElement('div');
        ((e.id = 'as-panel'),
          (e.className = `as-panel ${G[this.options.position]}`),
          e.setAttribute('role', 'dialog'),
          e.setAttribute('aria-modal', 'true'),
          e.setAttribute('aria-labelledby', 'as-panel-title'),
          e.setAttribute('aria-hidden', 'true'),
          (e.hidden = !0),
          (e.innerHTML = `
      <header class="as-panel-header">
        <h1 id="as-panel-title" class="as-panel-title">${n('panelTitle', this.lang)}</h1>
        <button type="button" class="as-close-btn" aria-label="${n('closePanel', this.lang)}">&times;</button>
      </header>
      <div class="as-panel-content" id="as-panel-content"></div>
      <footer class="as-panel-footer">
        <button type="button" class="as-reset-btn" id="as-reset-btn">${n('resetAll', this.lang)}</button>
      </footer>`));
        let t = e.querySelector('#as-panel-content');
        (this.visual.render(t, this.lang),
          this.reading.render(t, this.lang),
          this.speech.render(t, this.lang),
          this.navigation.render(t, this.lang),
          this.language.render(t, this.lang, (o) => this.onLanguageChange(o)),
          (a = e.querySelector('.as-close-btn')) == null ||
            a.addEventListener('click', () => this.closePanel()),
          (i = e.querySelector('#as-reset-btn')) == null ||
            i.addEventListener('click', () => this.resetAll()),
          this.shadow.appendChild(e),
          (this.panel = e));
      }
      togglePanel() {
        this.isOpen ? this.closePanel() : this.openPanel();
      }
      openPanel() {
        !this.panel ||
          !this.launcher ||
          ((this.isOpen = !0),
          (this.panel.hidden = !1),
          this.panel.setAttribute('aria-hidden', 'false'),
          this.panel.classList.add('as-open'),
          this.launcher.setAttribute('aria-expanded', 'true'),
          requestAnimationFrame(() => {
            let e = this.getFocusableElements()[0];
            e == null || e.focus();
          }),
          this.enableFocusTrap());
      }
      closePanel() {
        !this.panel ||
          !this.launcher ||
          ((this.isOpen = !1),
          this.panel.classList.remove('as-open'),
          this.panel.setAttribute('aria-hidden', 'true'),
          (this.panel.hidden = !0),
          this.launcher.setAttribute('aria-expanded', 'false'),
          this.disableFocusTrap(),
          this.launcher.focus());
      }
      getFocusableElements() {
        return this.panel
          ? Array.from(
              this.panel.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
              ),
            ).filter((t) => !t.hasAttribute('disabled') && t.offsetParent !== null)
          : [];
      }
      enableFocusTrap() {
        ((this.focusTrapHandler = (e) => {
          if (!(e instanceof KeyboardEvent) || e.key !== 'Tab' || !this.panel) return;
          let t = this.getFocusableElements();
          if (t.length === 0) return;
          let a = t[0],
            i = t[t.length - 1],
            o = this.shadow.activeElement;
          e.shiftKey && o === a
            ? (e.preventDefault(), i.focus())
            : !e.shiftKey && o === i && (e.preventDefault(), a.focus());
        }),
          this.shadow.addEventListener('keydown', this.focusTrapHandler));
      }
      disableFocusTrap() {
        this.focusTrapHandler &&
          (this.shadow.removeEventListener('keydown', this.focusTrapHandler),
          (this.focusTrapHandler = null));
      }
      bindGlobalKeys() {
        ((this.escapeHandler = (e) => {
          !(e instanceof KeyboardEvent) ||
            e.key !== 'Escape' ||
            !this.isOpen ||
            (e.stopPropagation(), this.closePanel());
        }),
          document.addEventListener('keydown', this.escapeHandler));
      }
      onPreferencesChange(e) {
        (this.applyAllPreferences(e),
          this.visual.syncUI(e),
          this.reading.syncUI(e),
          this.speech.syncUI(e),
          this.navigation.syncUI(e),
          this.language.syncUI(e));
      }
      applyAllPreferences(e) {
        (this.visual.apply(e),
          this.reading.apply(e),
          this.speech.apply(e),
          this.navigation.apply(e));
      }
      onLanguageChange(e) {
        if (
          ((this.lang = e),
          this.updateAllLabels(e),
          this.launcher && this.launcher.setAttribute('aria-label', n('launcherLabel', e)),
          this.panel)
        ) {
          let t = this.panel.querySelector('#as-panel-title');
          t && (t.textContent = n('panelTitle', e));
          let a = this.panel.querySelector('.as-close-btn');
          a && a.setAttribute('aria-label', n('closePanel', e));
          let i = this.panel.querySelector('#as-reset-btn');
          i && (i.textContent = n('resetAll', e));
        }
      }
      updateAllLabels(e) {
        (this.visual.updateLabels(e),
          this.reading.updateLabels(e),
          this.speech.updateLabels(e),
          this.navigation.updateLabels(e),
          this.language.updateLabels(e));
      }
      resetAll() {
        (this.prefs.resetAll(),
          this.visual.reset(),
          this.reading.reset(),
          this.speech.reset(),
          this.navigation.reset(),
          M(),
          this.applyAllPreferences(this.prefs.get()),
          this.visual.syncUI(this.prefs.get()),
          this.reading.syncUI(this.prefs.get()),
          this.speech.syncUI(this.prefs.get()),
          this.navigation.syncUI(this.prefs.get()),
          this.language.syncUI(this.prefs.get()));
      }
      destroy() {
        (this.escapeHandler && document.removeEventListener('keydown', this.escapeHandler),
          this.disableFocusTrap(),
          this.visual.reset(),
          this.reading.reset(),
          this.speech.reset(),
          this.navigation.reset(),
          M(),
          this.host.remove(),
          (this.launcher = null),
          (this.panel = null));
      }
    };
  var pe = 'https://api.accessshield.in',
    ue = 3e3;
  function ge() {
    var o, r, c, p;
    let s = (o = document.currentScript) != null ? o : document.querySelector('script[data-token]');
    if (!s) return null;
    let e = s.dataset.token;
    if (!e) return null;
    let t = (r = s.dataset.position) != null ? r : 'bottom-right',
      a = (c = s.dataset.lang) != null ? c : 'en',
      i = (p = s.dataset.apiUrl) != null ? p : pe;
    return { token: e, position: t, lang: a, apiUrl: i };
  }
  async function fe(s, e) {
    var i;
    let t = new AbortController(),
      a = setTimeout(() => t.abort(), ue);
    try {
      let o = await fetch(`${e}/api/v1/widget/verify?token=${encodeURIComponent(s)}`, {
        signal: t.signal,
      });
      if ((clearTimeout(a), !o.ok)) return !1;
      let r = await o.json();
      return ((i = r == null ? void 0 : r.data) == null ? void 0 : i.valid) === !0;
    } catch (o) {
      return (clearTimeout(a), o instanceof DOMException && o.name === 'AbortError', 'timeout');
    }
  }
  async function V() {
    var a;
    if (document.getElementById('accessshield-widget')) return;
    let s = ge();
    if (!s) {
      console.warn('[AccessShield] Missing data-token attribute on widget script tag.');
      return;
    }
    let e = (a = v.loadFromStorage(s.token)) != null ? a : void 0;
    if ((e && z(e), (await fe(s.token, s.apiUrl)) === !1)) {
      console.warn('[AccessShield] Invalid widget token \u2014 widget will not render.');
      return;
    }
    new y(s, e);
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => void V())
    : V();
  return te(me);
})();
//# sourceMappingURL=widget.min.js.map
