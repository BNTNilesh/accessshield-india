'use strict';
var AccessShieldWidget = (() => {
  var T = Object.defineProperty;
  var ge = Object.getOwnPropertyDescriptor;
  var fe = Object.getOwnPropertyNames;
  var me = Object.prototype.hasOwnProperty;
  var ve = (s, e, t) =>
    e in s ? T(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t);
  var be = (s, e) => {
      for (var t in e) T(s, t, { get: e[t], enumerable: !0 });
    },
    ye = (s, e, t, a) => {
      if ((e && typeof e == 'object') || typeof e == 'function')
        for (let n of fe(e))
          !me.call(s, n) &&
            n !== t &&
            T(s, n, { get: () => e[n], enumerable: !(a = ge(e, n)) || a.enumerable });
      return s;
    };
  var ke = (s) => ye(T({}, '__esModule', { value: !0 }), s);
  var l = (s, e, t) => ve(s, typeof e != 'symbol' ? e + '' : e, t);
  var Ue = {};
  be(Ue, { DEFAULT_PREFERENCES: () => S, Widget: () => w });
  var F = {
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
    readOnHover: 'Read on Hover',
    readOnHoverHint: 'Hover or tap text to hear it. Links and buttons still work normally.',
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
    speechUnlockHint: 'Turn Read on Hover on, or tap Read Page once, then hover text.',
    language: 'Language',
    langEn: 'English',
    langHi: 'Hindi',
    launcherLabel: 'Accessibility Options',
    on: 'On',
    off: 'Off',
    ariaPressed: 'Selected',
  };
  var V = {
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
    readOnHover: '\u0939\u094B\u0935\u0930 \u092A\u0930 \u092A\u0922\u093C\u0947\u0902',
    readOnHoverHint:
      '\u092A\u093E\u0920 \u0938\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0909\u0938 \u092A\u0930 \u0939\u094B\u0935\u0930 \u0915\u0930\u0947\u0902 \u092F\u093E \u091F\u0948\u092A \u0915\u0930\u0947\u0902\u0964 \u0932\u093F\u0902\u0915 \u0914\u0930 \u092C\u091F\u0928 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0930\u0942\u092A \u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964',
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
    speechUnlockHint:
      "\u092A\u0939\u0932\u0947 '\u0939\u094B\u0935\u0930 \u092A\u0930 \u092A\u0922\u093C\u0947\u0902' \u091A\u093E\u0932\u0942 \u0915\u0930\u0947\u0902 \u092F\u093E '\u092A\u0943\u0937\u094D\u0920 \u092A\u0922\u093C\u0947\u0902' \u091F\u0948\u092A \u0915\u0930\u0947\u0902, \u092B\u093F\u0930 \u092A\u093E\u0920 \u092A\u0930 \u0939\u094B\u0935\u0930 \u0915\u0930\u0947\u0902\u0964",
    language: '\u092D\u093E\u0937\u093E',
    langEn: '\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u093C\u0940',
    langHi: '\u0939\u093F\u0902\u0926\u0940',
    launcherLabel: '\u0938\u0941\u0932\u092D\u0924\u093E \u0935\u093F\u0915\u0932\u094D\u092A',
    on: '\u091A\u093E\u0932\u0942',
    off: '\u092C\u0902\u0926',
    ariaPressed: '\u091A\u092F\u0928\u093F\u0924',
  };
  var xe = { en: F, hi: V };
  function o(s, e, t) {
    var i, r;
    let n = (r = (i = xe[e][s]) != null ? i : F[s]) != null ? r : s;
    if (t) for (let [c, u] of Object.entries(t)) n = n.replace(`{${c}}`, u);
    return n;
  }
  var X = 'as-widget-style-';
  function h(s, e) {
    let t = `${X}${s}`,
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
    (e = document.getElementById(`${X}${s}`)) == null || e.remove();
  }
  function U() {
    document.querySelectorAll('[data-accessshield="true"]').forEach((s) => s.remove());
  }
  function y(s, e) {
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
  function k(s) {
    var e;
    (e = document.getElementById(`as-widget-el-${s}`)) == null || e.remove();
  }
  var Y = `
@font-face {
  font-family: 'OpenDyslexic';
  src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`,
    J = { sm: '87.5%', default: '100%', lg: '125%' },
    Z = `
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
    Q = `
.as-light-mode, .as-light-mode body {
  background-color: #ffffff !important;
  color: #1a1a2e !important;
  color-scheme: light !important;
}`,
    ee = `
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
  function te(s) {
    (s.fontSize && h('font-size', `html { font-size: ${J[s.fontSize]} !important; }`),
      s.dyslexiaFont &&
        h('dyslexia', `${Y} html, html * { font-family: 'OpenDyslexic', sans-serif !important; }`),
      s.darkMode && (document.documentElement.classList.add('as-dark-mode'), h('dark-mode', Z)),
      s.lightMode && (document.documentElement.classList.add('as-light-mode'), h('light-mode', Q)),
      s.highContrast && h('high-contrast', ee));
    let e = [];
    (s.negativeContrast && e.push('invert(1)', 'hue-rotate(180deg)'),
      s.grayscale && e.push('grayscale(100%)'),
      s.saturation !== void 0 && s.saturation !== 100 && e.push(`saturate(${s.saturation}%)`),
      e.length > 0 && h('filters', `html { filter: ${e.join(' ')} !important; }`));
  }
  var M = class {
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
          ((this.container.querySelector('h2').textContent = o('sectionVisual', e)),
          this.updateText(this.container, e)));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-visual" class="as-section-title">${o('sectionVisual', e)}</h2>
      <div class="as-control-group">
        <span class="as-label" id="as-font-size-label">${o('fontSize', e)}</span>
        <div class="as-btn-group" role="group" aria-labelledby="as-font-size-label">
          <button type="button" class="as-btn as-btn-segment" data-font="sm" aria-pressed="false">${o('fontSizeSm', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-font="default" aria-pressed="true">${o('fontSizeDefault', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-font="lg" aria-pressed="false">${o('fontSizeLg', e)}</button>
        </div>
      </div>
      ${this.switchRow('dyslexiaFont', 'dyslexiaFont')}
      ${this.switchRow('darkMode', 'darkMode')}
      ${this.switchRow('lightMode', 'lightMode')}
      ${this.switchRow('highContrast', 'highContrast')}
      ${this.switchRow('negativeContrast', 'negativeContrast')}
      ${this.switchRow('grayscale', 'grayscale')}
      <div class="as-control-group">
        <label class="as-label" for="as-saturation">${o('saturation', e)}</label>
        <input type="range" id="as-saturation" class="as-slider" min="0" max="200" value="100"
          aria-valuemin="0" aria-valuemax="200" aria-valuenow="100"
          aria-label="${o('saturation', e)}" />
        <span class="as-slider-value" id="as-saturation-value" aria-live="polite">${o('saturationValue', e, { value: '100' })}</span>
      </div>`;
    }
    switchRow(e, t) {
      let a = this.lang;
      return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${o(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${o('off', a)}</span>
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
              n = this.prefs.get(),
              r = {
                dyslexiaFont: 'dyslexiaFont',
                darkMode: 'darkMode',
                lightMode: 'lightMode',
                highContrast: 'highContrast',
                negativeContrast: 'negativeContrast',
                grayscale: 'grayscale',
              }[a];
            r && this.prefs.update({ [r]: !n[r] });
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
      this.container.querySelectorAll('[data-font]').forEach((i) => {
        let c = i.dataset.font === e.fontSize;
        (i.setAttribute('aria-pressed', String(c)), i.classList.toggle('as-active', c));
      });
      let t = [
        ['dyslexiaFont', e.dyslexiaFont],
        ['darkMode', e.darkMode],
        ['lightMode', e.lightMode],
        ['highContrast', e.highContrast],
        ['negativeContrast', e.negativeContrast],
        ['grayscale', e.grayscale],
      ];
      for (let [i, r] of t) {
        let c = this.container.querySelector(`#as-toggle-${i}`);
        if (c) {
          (c.setAttribute('aria-checked', String(r)), c.classList.toggle('as-checked', r));
          let u = c.querySelector('.as-switch-text');
          u && (u.textContent = o(r ? 'on' : 'off', this.lang));
        }
      }
      let a = this.container.querySelector('#as-saturation'),
        n = this.container.querySelector('#as-saturation-value');
      (a &&
        ((a.value = String(e.saturation)), a.setAttribute('aria-valuenow', String(e.saturation))),
        n && (n.textContent = o('saturationValue', this.lang, { value: String(e.saturation) })));
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
      for (let [n, i] of a) {
        let r = e.querySelector(`#${n}`);
        r &&
          (r.tagName === 'INPUT'
            ? r.setAttribute('aria-label', o(i, t))
            : (r.textContent = o(i, t)));
      }
      (e.querySelectorAll('[data-font]').forEach((n, i) => {
        let r = ['fontSizeSm', 'fontSizeDefault', 'fontSizeLg'];
        n.textContent = o(r[i], t);
      }),
        this.syncUI(this.prefs.get()));
    }
    applyFontSize(e) {
      h('font-size', `html { font-size: ${J[e]} !important; }`);
    }
    applyDyslexiaFont(e) {
      e
        ? h('dyslexia', `${Y} html, html * { font-family: 'OpenDyslexic', sans-serif !important; }`)
        : d('dyslexia');
    }
    applyDarkMode(e) {
      e
        ? (document.documentElement.classList.add('as-dark-mode'), h('dark-mode', Z))
        : (document.documentElement.classList.remove('as-dark-mode'), d('dark-mode'));
    }
    applyLightMode(e) {
      e
        ? (document.documentElement.classList.add('as-light-mode'), h('light-mode', Q))
        : (document.documentElement.classList.remove('as-light-mode'), d('light-mode'));
    }
    applyHighContrast(e) {
      e ? h('high-contrast', ee) : d('high-contrast');
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
          n = e.negativeContrast
            ? 'html img, html video, html picture { filter: invert(1) hue-rotate(180deg) !important; }'
            : '';
        h('filters', `html { filter: ${a} !important; } ${n}`);
      } else d('filters');
    }
  };
  var H = class {
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
      this.container.querySelector('h2').textContent = o('sectionLanguage', e);
      let t = this.container.querySelector('#as-lang-label');
      (t && (t.textContent = o('language', e)),
        this.container.querySelectorAll('[data-lang]').forEach((a) => {
          let n = a.dataset.lang;
          a.textContent = o(n === 'en' ? 'langEn' : 'langHi', e);
        }),
        this.syncUI(this.prefs.get()));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-language" class="as-section-title">${o('sectionLanguage', e)}</h2>
      <div class="as-control-group">
        <span class="as-label" id="as-lang-label">${o('language', e)}</span>
        <div class="as-btn-group" role="group" aria-labelledby="as-lang-label">
          <button type="button" class="as-btn as-btn-segment" data-lang="en" aria-pressed="true">${o('langEn', e)}</button>
          <button type="button" class="as-btn as-btn-segment" data-lang="hi" aria-pressed="false">${o('langHi', e)}</button>
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
          let n = t.dataset.lang === e.language;
          (t.setAttribute('aria-pressed', String(n)), t.classList.toggle('as-active', n));
        });
    }
  };
  var A = class {
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
          ((this.container.querySelector('h2').textContent = o('sectionNavigation', e)),
          this.updateText(this.container, e)));
    }
    buildHTML() {
      let e = this.lang;
      return `
      <h2 id="as-section-navigation" class="as-section-title">${o('sectionNavigation', e)}</h2>
      ${this.switchRow('keyboardNavMode', 'keyboardNavMode')}
      <div class="as-control-row">
        <button type="button" class="as-btn as-btn-action" id="as-skip-nav-btn">${o('skipNavigation', e)}</button>
      </div>
      ${this.switchRow('focusTracker', 'focusTracker')}`;
    }
    switchRow(e, t) {
      let a = this.lang;
      return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${o(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${o('off', a)}</span>
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
              i = { keyboardNavMode: 'keyboardNavMode', focusTracker: 'focusTracker' }[a];
            if (i) {
              let r = this.prefs.get();
              this.prefs.update({ [i]: !r[i] });
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
      for (let [a, n] of t) {
        let i = this.container.querySelector(`#as-toggle-${a}`);
        if (i) {
          (i.setAttribute('aria-checked', String(n)), i.classList.toggle('as-checked', n));
          let r = i.querySelector('.as-switch-text');
          r && (r.textContent = o(n ? 'on' : 'off', this.lang));
        }
      }
    }
    updateText(e, t) {
      let a = [
        ['as-label-keyboardNavMode', 'keyboardNavMode'],
        ['as-label-focusTracker', 'focusTracker'],
      ];
      for (let [i, r] of a) {
        let c = e.querySelector(`#${i}`);
        c && (c.textContent = o(r, t));
      }
      let n = e.querySelector('#as-skip-nav-btn');
      (n && (n.textContent = o('skipNavigation', t)), this.syncUI(this.prefs.get()));
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
        (e.textContent = o('skipNavigation', this.lang)),
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
        ? ((this.trackerEl = y('focus-tracker', 'div')),
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
        k('focus-tracker'),
        (this.trackerEl = null));
    }
  };
  var ae = 3,
    Le = 0.6,
    C = class {
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
            ((this.container.querySelector('h2').textContent = o('sectionReading', e)),
            this.updateText(this.container, e)));
      }
      buildHTML() {
        let e = this.lang;
        return `
      <h2 id="as-section-reading" class="as-section-title">${o('sectionReading', e)}</h2>
      ${this.switchRow('readingGuide', 'readingGuide')}
      ${this.switchRow('readingMask', 'readingMask')}
      ${this.switchRow('linkHighlight', 'linkHighlight')}
      ${this.switchRow('focusIndicator', 'focusIndicator')}`;
      }
      switchRow(e, t) {
        let a = this.lang;
        return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${o(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${o('off', a)}</span>
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
              n = e[a];
            if (n) {
              let i = this.prefs.get();
              this.prefs.update({ [n]: !i[n] });
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
        for (let [a, n] of t) {
          let i = this.container.querySelector(`#as-toggle-${a}`);
          if (i) {
            (i.setAttribute('aria-checked', String(n)), i.classList.toggle('as-checked', n));
            let r = i.querySelector('.as-switch-text');
            r && (r.textContent = o(n ? 'on' : 'off', this.lang));
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
        for (let [n, i] of a) {
          let r = e.querySelector(`#${n}`);
          r && (r.textContent = o(i, t));
        }
        this.syncUI(this.prefs.get());
      }
      applyReadingGuide(e) {
        e
          ? ((this.guideEl = y('reading-guide', 'div')),
            Object.assign(this.guideEl.style, {
              position: 'fixed',
              left: '0',
              width: '100%',
              height: `${ae}px`,
              backgroundColor: '#1A56A0',
              pointerEvents: 'none',
              zIndex: '99990',
              top: '0',
              transition: 'top 0.05s ease-out',
            }),
            this.guideEl.setAttribute('aria-hidden', 'true'),
            (this.guideMouseHandler = (t) => {
              this.guideEl && (this.guideEl.style.top = `${t.clientY - ae / 2}px`);
            }),
            document.addEventListener('mousemove', this.guideMouseHandler, { passive: !0 }))
          : this.stopReadingGuide();
      }
      stopReadingGuide() {
        (this.guideMouseHandler &&
          (document.removeEventListener('mousemove', this.guideMouseHandler),
          (this.guideMouseHandler = null)),
          k('reading-guide'),
          (this.guideEl = null));
      }
      applyReadingMask(e) {
        if (e) {
          let t = {
            position: 'fixed',
            left: '0',
            width: '100%',
            backgroundColor: `rgba(0, 0, 0, ${Le})`,
            pointerEvents: 'none',
            zIndex: '99989',
          };
          ((this.maskTop = y('reading-mask-top', 'div')),
            Object.assign(this.maskTop.style, { ...t, top: '0', height: '0' }),
            this.maskTop.setAttribute('aria-hidden', 'true'),
            (this.maskBottom = y('reading-mask-bottom', 'div')),
            Object.assign(this.maskBottom.style, { ...t, bottom: '0', height: '0' }),
            this.maskBottom.setAttribute('aria-hidden', 'true'));
          let a = (n) => {
            let i = n.clientY,
              r = 40;
            (this.maskTop && (this.maskTop.style.height = `${Math.max(0, i - r / 2)}px`),
              this.maskBottom &&
                (this.maskBottom.style.height = `${Math.max(0, window.innerHeight - i - r / 2)}px`));
          };
          ((this.maskMouseHandler = a), document.addEventListener('mousemove', a, { passive: !0 }));
        } else this.stopReadingMask();
      }
      stopReadingMask() {
        (this.maskMouseHandler &&
          (document.removeEventListener('mousemove', this.maskMouseHandler),
          (this.maskMouseHandler = null)),
          k('reading-mask-top'),
          k('reading-mask-bottom'),
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
  var we =
      'a, button, input, select, textarea, summary, [role="button"], [role="link"], [role="tab"], [contenteditable="true"]',
    q = 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption',
    f = 0,
    R = null,
    z = !1;
  function b() {
    return typeof window != 'undefined' && 'speechSynthesis' in window;
  }
  function O(s) {
    return s === 'hi' ? 'hi-IN' : 'en-US';
  }
  function P() {
    return window.speechSynthesis.getVoices();
  }
  function ne(s) {
    var n, i, r;
    let e = P();
    if (e.length === 0) return;
    let t = O(s),
      a = s === 'hi' ? 'hi' : 'en';
    return (r =
      (i = (n = e.find((c) => c.lang === t)) != null ? n : e.find((c) => c.lang.startsWith(a))) !=
      null
        ? i
        : e.find((c) => c.default)) != null
      ? r
      : e[0];
  }
  function Te(s) {
    return Math.min(2, Math.max(0.5, s));
  }
  function $(s) {
    return s.replace(/\s+/g, ' ').trim();
  }
  function v() {
    R && (clearInterval(R), (R = null));
  }
  function Me(s) {
    (v(),
      (R = setInterval(() => {
        if (s !== f) {
          v();
          return;
        }
        let e = window.speechSynthesis;
        e.speaking && !e.paused && (e.pause(), e.resume());
      }, 1e4)));
  }
  function He(s) {
    if (P().length > 0) {
      s();
      return;
    }
    let e = window.speechSynthesis,
      t = () => {
        (e.removeEventListener('voiceschanged', t), s());
      };
    (e.addEventListener('voiceschanged', t),
      window.setTimeout(() => {
        (e.removeEventListener('voiceschanged', t), s());
      }, 300));
  }
  function x(s) {
    if (!b()) return;
    ((z = !0), W());
    let e = new SpeechSynthesisUtterance(' ');
    ((e.volume = 0.01), (e.lang = O(s)), (e.rate = 1));
    let t = ne(s);
    (t && (e.voice = t), window.speechSynthesis.speak(e));
  }
  function Ae(s) {
    var i;
    let e = $(s);
    if (!e) return [];
    let t = (i = e.match(/[^.!?]+[.!?]+|[^.!?]+$/g)) != null ? i : [e],
      a = [],
      n = '';
    for (let r of t) {
      let c = n ? `${n} ${r}` : r;
      c.length > 280 && n ? (a.push(n.trim()), (n = r.trim())) : (n = c.trim());
    }
    return (n && a.push(n.trim()), a.length > 0 ? a : [e]);
  }
  function se(s) {
    if (!(s instanceof Element)) return !1;
    if (s.closest('#accessshield-widget') || s.closest(we)) return !0;
    let t = s;
    return !!(t.tabIndex >= 0 || t.isContentEditable);
  }
  function L(s) {
    if (!(s instanceof Element) || s.closest('#accessshield-widget') || se(s)) return null;
    let e = s.closest(q);
    return !e || se(e) ? null : $(e.innerText).length > 0 ? e : null;
  }
  function ie(s, e, t, a, n) {
    if (!b()) return !1;
    if (e.needsUnlock && !z) return (a == null || a(), !1);
    let i = Ae(s);
    if (i.length === 0) return !1;
    let r = ++f;
    (v(), window.speechSynthesis.cancel());
    let c = new Map(),
      u = (p) => {
        if (r !== f) return;
        let g = i[p];
        if (!g) {
          (v(), t == null || t());
          return;
        }
        let m = new SpeechSynthesisUtterance(g);
        ((m.lang = O(e.lang)), (m.rate = Te(e.rate)));
        let D = ne(e.lang);
        (D && (m.voice = D),
          (m.onstart = () => {
            r === f && (p === 0 && (n == null || n()), Me(r));
          }),
          (m.onend = () => {
            r === f && u(p + 1);
          }),
          (m.onerror = (pe) => {
            var G;
            if (r !== f) return;
            let N = pe.error,
              j = (G = c.get(p)) != null ? G : 0;
            if ((N === 'canceled' || N === 'interrupted') && j < 2) {
              (c.set(p, j + 1), window.setTimeout(() => u(p), 120));
              return;
            }
            if (N === 'not-allowed') {
              ((z = !1), v(), a == null || a());
              return;
            }
            p + 1 < i.length ? u(p + 1) : (v(), t == null || t());
          }),
          window.speechSynthesis.speak(m));
        let B = window.speechSynthesis;
        B.paused && B.resume();
      };
    return (
      He(() => {
        r === f &&
          window.setTimeout(() => {
            r === f && u(0);
          }, 80);
      }),
      !0
    );
  }
  function K() {
    ((f += 1), v(), b() && window.speechSynthesis.cancel());
  }
  function oe() {
    var t, a, n;
    let e = (
      (n =
        (a =
          (t = document.getElementById('main-content')) != null
            ? t
            : document.querySelector('main')) != null
          ? a
          : document.querySelector('[role="main"]')) != null
        ? n
        : document.body
    ).cloneNode(!0);
    return (
      e
        .querySelectorAll(
          '#accessshield-widget, script, style, noscript, [data-accessshield], [aria-hidden="true"]',
        )
        .forEach((i) => i.remove()),
      $(e.innerText)
    );
  }
  function re() {
    let s = window.getSelection();
    return !s || s.isCollapsed ? '' : $(s.toString());
  }
  function W() {
    b() &&
      (P(),
      (window.speechSynthesis.onvoiceschanged = () => {
        P();
      }));
  }
  var _ = { slow: 0.75, normal: 1, fast: 1.25 },
    le = 300,
    I = class {
      constructor(e) {
        this.prefs = e;
        l(this, 'container', null);
        l(this, 'statusEl', null);
        l(this, 'lang', 'en');
        l(this, 'hoverHandler', null);
        l(this, 'leaveHandler', null);
        l(this, 'focusHandler', null);
        l(this, 'tapHandler', null);
        l(this, 'hoverDebounceTimer', null);
        l(this, 'highlightEl', null);
        l(this, 'lastReadBlock', null);
        W();
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
        this.applyHoverToRead(e.textToSpeech);
      }
      reset() {
        (K(), this.clearHighlight(), this.stopHoverToRead(), this.setStatus(''));
      }
      updateLabels(e) {
        ((this.lang = e),
          this.container &&
            ((this.container.querySelector('h2').textContent = o('sectionSpeech', e)),
            this.updateText(this.container, e)));
      }
      syncUI(e) {
        if (!this.container) return;
        let t = this.container.querySelector('#as-toggle-textToSpeech');
        if (t) {
          (t.setAttribute('aria-checked', String(e.textToSpeech)),
            t.classList.toggle('as-checked', e.textToSpeech));
          let i = t.querySelector('.as-switch-text');
          i && (i.textContent = o(e.textToSpeech ? 'on' : 'off', this.lang));
        }
        let a = ['slow', 'normal', 'fast'];
        for (let i of a) {
          let r = this.container.querySelector(`#as-rate-${i}`),
            c = e.speechRate === _[i];
          (r == null || r.classList.toggle('as-active', c),
            r == null || r.setAttribute('aria-pressed', String(c)));
        }
        let n = this.container.querySelector('#as-speech-unsupported');
        n && (n.hidden = b());
      }
      buildHTML() {
        let e = this.lang,
          t = b();
        return `
      <h2 id="as-section-speech" class="as-section-title">${o('sectionSpeech', e)}</h2>
      <p id="as-speech-unsupported" class="as-hint" ${t ? 'hidden' : ''} role="alert">
        ${o('speechUnsupported', e)}
      </p>
      ${this.switchRow('textToSpeech', 'readOnHover')}
      <p id="as-read-on-hover-hint" class="as-hint">${o('readOnHoverHint', e)}</p>
      <div class="as-control-group" role="group" aria-labelledby="as-label-speechRate">
        <span class="as-label" id="as-label-speechRate">${o('speechRate', e)}</span>
        <div class="as-btn-group as-btn-group-wrap">
          ${this.rateBtn('slow', 'speechSlow')}
          ${this.rateBtn('normal', 'speechNormal')}
          ${this.rateBtn('fast', 'speechFast')}
        </div>
      </div>
      <div class="as-speech-actions" role="group" aria-label="${o('speechActions', e)}">
        <button type="button" class="as-btn as-btn-action" id="as-read-selection">${o('readSelection', e)}</button>
        <button type="button" class="as-btn as-btn-action" id="as-read-page">${o('readPage', e)}</button>
        <button type="button" class="as-btn as-btn-action as-btn-stop" id="as-stop-speech">${o('stopSpeech', e)}</button>
      </div>
      <p id="as-speech-status" class="as-speech-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
      }
      switchRow(e, t) {
        let a = this.lang;
        return `
      <div class="as-control-row">
        <span class="as-label" id="as-label-${e}">${o(t, a)}</span>
        <button type="button" class="as-switch" role="switch" aria-checked="false"
          aria-labelledby="as-label-${e}" data-toggle="${e}" id="as-toggle-${e}">
          <span class="as-switch-track"><span class="as-switch-thumb"></span></span>
          <span class="as-switch-text">${o('off', a)}</span>
        </button>
      </div>`;
      }
      rateBtn(e, t) {
        return `<button type="button" class="as-btn as-btn-segment" id="as-rate-${e}"
      aria-pressed="false" data-rate="${e}">${o(t, this.lang)}</button>`;
      }
      bindEvents() {
        var e, t, a, n;
        this.container &&
          ((e = this.container.querySelector('#as-toggle-textToSpeech')) == null ||
            e.addEventListener('click', () => {
              let i = this.prefs.get(),
                r = !i.textToSpeech;
              (r && x(i.language), this.prefs.update({ textToSpeech: r }));
            }),
          this.container.querySelectorAll('[data-rate]').forEach((i) => {
            i.addEventListener('click', () => {
              let r = i.dataset.rate;
              r in _ && this.prefs.update({ speechRate: _[r] });
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
          (n = this.container.querySelector('#as-stop-speech')) == null ||
            n.addEventListener('click', () => {
              this.stop();
            }));
      }
      readSelection() {
        x(this.prefs.get().language);
        let e = re();
        if (!e) {
          this.setStatus(o('speechNoSelection', this.lang));
          return;
        }
        this.speak(e);
      }
      readPage() {
        x(this.prefs.get().language);
        let e = oe();
        if (!e) {
          this.setStatus(o('speechNoContent', this.lang));
          return;
        }
        this.speak(e.slice(0, 8e3));
      }
      speak(e, t, a = !1) {
        let n = this.prefs.get();
        (this.clearHighlight(),
          t &&
            ((this.highlightEl = t), (this.lastReadBlock = t), t.classList.add('as-tts-reading')));
        let i = !1,
          r = window.setTimeout(() => {
            i ||
              (this.clearHighlight(),
              (this.lastReadBlock = null),
              this.setStatus(o('speechUnlockHint', this.lang)));
          }, 600);
        ie(
          e,
          { lang: n.language, rate: n.speechRate, needsUnlock: a },
          () => {
            (window.clearTimeout(r),
              this.clearHighlight(),
              (this.lastReadBlock = null),
              this.setStatus(o('speechFinished', this.lang)));
          },
          () => {
            (window.clearTimeout(r),
              this.clearHighlight(),
              (this.lastReadBlock = null),
              this.setStatus(o('speechUnlockHint', this.lang)));
          },
          () => {
            ((i = !0), window.clearTimeout(r), this.setStatus(o('speechSpeaking', this.lang)));
          },
        ) ||
          (window.clearTimeout(r),
          a
            ? this.setStatus(o('speechUnlockHint', this.lang))
            : this.setStatus(o('speechUnsupported', this.lang)));
      }
      stop() {
        (K(),
          this.clearHighlight(),
          (this.lastReadBlock = null),
          this.setStatus(o('speechStopped', this.lang)));
      }
      setStatus(e) {
        this.statusEl && (this.statusEl.textContent = e);
      }
      clearHoverDebounce() {
        this.hoverDebounceTimer &&
          (clearTimeout(this.hoverDebounceTimer), (this.hoverDebounceTimer = null));
      }
      queueRead(e, t = !0) {
        if (this.lastReadBlock === e) return;
        let a = e.innerText.replace(/\s+/g, ' ').trim();
        a && this.speak(a, e, t);
      }
      applyHoverToRead(e) {
        (this.stopHoverToRead(),
          e &&
            (h(
              'tts-hover',
              `
        ${q} {
          cursor: help !important;
        }
        .as-tts-reading {
          outline: 3px solid #1A56A0 !important;
          outline-offset: 4px !important;
          background-color: rgba(235, 243, 251, 0.85) !important;
        }`,
            ),
            (this.hoverHandler = (t) => {
              let a = L(t.target);
              a &&
                (this.clearHoverDebounce(),
                (this.hoverDebounceTimer = setTimeout(() => {
                  this.queueRead(a);
                }, le)));
            }),
            (this.leaveHandler = (t) => {
              if (!(t.target instanceof Element)) return;
              let a = L(t.target);
              if (!a) return;
              let n = t.relatedTarget instanceof Element ? t.relatedTarget : null;
              (n && a.contains(n)) || this.clearHoverDebounce();
            }),
            (this.focusHandler = (t) => {
              let a = L(t.target);
              a &&
                (this.clearHoverDebounce(),
                (this.hoverDebounceTimer = setTimeout(() => {
                  this.queueRead(a);
                }, le)));
            }),
            (this.tapHandler = (t) => {
              if (window.matchMedia('(hover: hover)').matches) return;
              let a = L(t.target);
              a && (this.clearHoverDebounce(), x(this.prefs.get().language), this.queueRead(a, !1));
            }),
            document.addEventListener('mouseover', this.hoverHandler),
            document.addEventListener('mouseout', this.leaveHandler),
            document.addEventListener('focusin', this.focusHandler),
            document.addEventListener('click', this.tapHandler)));
      }
      stopHoverToRead() {
        (d('tts-hover'),
          d('tts-click'),
          this.clearHoverDebounce(),
          this.hoverHandler &&
            (document.removeEventListener('mouseover', this.hoverHandler),
            (this.hoverHandler = null)),
          this.leaveHandler &&
            (document.removeEventListener('mouseout', this.leaveHandler),
            (this.leaveHandler = null)),
          this.focusHandler &&
            (document.removeEventListener('focusin', this.focusHandler),
            (this.focusHandler = null)),
          this.tapHandler &&
            (document.removeEventListener('click', this.tapHandler), (this.tapHandler = null)),
          (this.lastReadBlock = null),
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
          ['as-label-textToSpeech', 'readOnHover'],
          ['as-label-speechRate', 'speechRate'],
        ];
        for (let [u, p] of a) {
          let g = e.querySelector(`#${u}`);
          g && (g.textContent = o(p, t));
        }
        let n = e.querySelector('#as-read-on-hover-hint');
        n && (n.textContent = o('readOnHoverHint', t));
        let i = [
          ['as-read-selection', 'readSelection'],
          ['as-read-page', 'readPage'],
          ['as-stop-speech', 'stopSpeech'],
        ];
        for (let [u, p] of i) {
          let g = e.querySelector(`#${u}`);
          g && (g.textContent = o(p, t));
        }
        let r = [
          ['slow', 'speechSlow'],
          ['normal', 'speechNormal'],
          ['fast', 'speechFast'],
        ];
        for (let [u, p] of r) {
          let g = e.querySelector(`#as-rate-${u}`);
          g && (g.textContent = o(p, t));
        }
        let c = e.querySelector('#as-speech-unsupported');
        (c && (c.textContent = o('speechUnsupported', t)), this.syncUI(this.prefs.get()));
      }
    };
  var ce = `/* AccessShield Widget \u2014 Shadow DOM styles (WCAG 2.2 AA compliant) */

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
  var S = {
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
  var de = 'accessshield_prefs_',
    Re = 2e3,
    E = class {
      constructor(e, t, a) {
        l(this, 'prefs');
        l(this, 'token');
        l(this, 'apiUrl');
        l(this, 'listeners', []);
        ((this.token = e), (this.apiUrl = t), (this.prefs = { ...S, ...a }));
      }
      static loadFromStorage(e) {
        try {
          let t = localStorage.getItem(`${de}${e}`);
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
        ((this.prefs = { ...S, language: this.prefs.language }),
          this.saveToStorage(),
          this.notify(),
          this.postToApi());
      }
      resetAll() {
        ((this.prefs = { ...S }), this.saveToStorage(), this.notify(), this.postToApi());
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
          localStorage.setItem(`${de}${this.token}`, JSON.stringify(this.prefs));
        } catch (e) {}
      }
      notify() {
        let e = this.get();
        for (let t of this.listeners) t(e);
      }
      postToApi() {
        let e = new AbortController(),
          t = setTimeout(() => e.abort(), Re);
        fetch(`${this.apiUrl}/api/v1/widget/preferences`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token, preferences: this.prefs }),
          signal: e.signal,
        }).finally(() => clearTimeout(t));
      }
    };
  var Pe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <circle cx="12" cy="4" r="2" fill="currentColor"/>
  <path d="M12 7c-2.5 0-4.5 1.5-5.5 3.5L4 14h2.5l1-3h9l1 3H20l-2.5-3.5C16.5 8.5 14.5 7 12 7z" fill="currentColor"/>
  <path d="M8 16h8v5h-2v-3h-4v3H8v-5z" fill="currentColor"/>
</svg>`,
    he = {
      'bottom-right': 'as-pos-bottom-right',
      'bottom-left': 'as-pos-bottom-left',
      'top-right': 'as-pos-top-right',
      'top-left': 'as-pos-top-left',
    },
    w = class {
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
          (this.prefs = new E(e.token, e.apiUrl, { ...t, language: this.lang })),
          (this.host = document.createElement('div')),
          (this.host.id = 'accessshield-widget'),
          (this.shadow = this.host.attachShadow({ mode: 'closed' })),
          (this.visual = new M(this.prefs)),
          (this.reading = new C(this.prefs)),
          (this.speech = new I(this.prefs)),
          (this.navigation = new A(this.prefs)),
          (this.language = new H(this.prefs)),
          this.applyAllPreferences(this.prefs.get()),
          this.prefs.onChange((n) => this.onPreferencesChange(n)),
          this.render(),
          document.body.appendChild(this.host));
      }
      render() {
        let e = document.createElement('style');
        ((e.textContent = ce),
          this.shadow.appendChild(e),
          this.createLauncher(),
          this.createPanel(),
          this.bindGlobalKeys());
      }
      createLauncher() {
        let e = document.createElement('button');
        ((e.className = `as-launcher ${he[this.options.position]}`),
          (e.type = 'button'),
          e.setAttribute('aria-label', o('launcherLabel', this.lang)),
          e.setAttribute('aria-expanded', 'false'),
          e.setAttribute('aria-controls', 'as-panel'),
          (e.innerHTML = Pe),
          e.addEventListener('click', () => this.togglePanel()),
          this.shadow.appendChild(e),
          (this.launcher = e));
      }
      createPanel() {
        var a, n;
        let e = document.createElement('div');
        ((e.id = 'as-panel'),
          (e.className = `as-panel ${he[this.options.position]}`),
          e.setAttribute('role', 'dialog'),
          e.setAttribute('aria-modal', 'true'),
          e.setAttribute('aria-labelledby', 'as-panel-title'),
          e.setAttribute('aria-hidden', 'true'),
          (e.hidden = !0),
          (e.innerHTML = `
      <header class="as-panel-header">
        <h1 id="as-panel-title" class="as-panel-title">${o('panelTitle', this.lang)}</h1>
        <button type="button" class="as-close-btn" aria-label="${o('closePanel', this.lang)}">&times;</button>
      </header>
      <div class="as-panel-content" id="as-panel-content"></div>
      <footer class="as-panel-footer">
        <button type="button" class="as-reset-btn" id="as-reset-btn">${o('resetAll', this.lang)}</button>
      </footer>`));
        let t = e.querySelector('#as-panel-content');
        (this.visual.render(t, this.lang),
          this.reading.render(t, this.lang),
          this.speech.render(t, this.lang),
          this.navigation.render(t, this.lang),
          this.language.render(t, this.lang, (i) => this.onLanguageChange(i)),
          (a = e.querySelector('.as-close-btn')) == null ||
            a.addEventListener('click', () => this.closePanel()),
          (n = e.querySelector('#as-reset-btn')) == null ||
            n.addEventListener('click', () => this.resetAll()),
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
            n = t[t.length - 1],
            i = this.shadow.activeElement;
          e.shiftKey && i === a
            ? (e.preventDefault(), n.focus())
            : !e.shiftKey && i === n && (e.preventDefault(), a.focus());
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
          this.launcher && this.launcher.setAttribute('aria-label', o('launcherLabel', e)),
          this.panel)
        ) {
          let t = this.panel.querySelector('#as-panel-title');
          t && (t.textContent = o('panelTitle', e));
          let a = this.panel.querySelector('.as-close-btn');
          a && a.setAttribute('aria-label', o('closePanel', e));
          let n = this.panel.querySelector('#as-reset-btn');
          n && (n.textContent = o('resetAll', e));
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
          U(),
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
          U(),
          this.host.remove(),
          (this.launcher = null),
          (this.panel = null));
      }
    };
  var $e = 'https://api.accessshield.in',
    Ie = 3e3;
  function Ne() {
    var i, r, c, u;
    let s = (i = document.currentScript) != null ? i : document.querySelector('script[data-token]');
    if (!s) return null;
    let e = s.dataset.token;
    if (!e) return null;
    let t = (r = s.dataset.position) != null ? r : 'bottom-right',
      a = (c = s.dataset.lang) != null ? c : 'en',
      n = (u = s.dataset.apiUrl) != null ? u : $e;
    return { token: e, position: t, lang: a, apiUrl: n };
  }
  async function Fe(s, e) {
    var n;
    let t = new AbortController(),
      a = setTimeout(() => t.abort(), Ie);
    try {
      let i = await fetch(`${e}/api/v1/widget/verify?token=${encodeURIComponent(s)}`, {
        signal: t.signal,
      });
      if ((clearTimeout(a), !i.ok)) return !1;
      let r = await i.json();
      return ((n = r == null ? void 0 : r.data) == null ? void 0 : n.valid) === !0;
    } catch (i) {
      return (clearTimeout(a), i instanceof DOMException && i.name === 'AbortError', 'timeout');
    }
  }
  async function ue() {
    var a;
    if (document.getElementById('accessshield-widget')) return;
    let s = Ne();
    if (!s) {
      console.warn('[AccessShield] Missing data-token attribute on widget script tag.');
      return;
    }
    let e = (a = E.loadFromStorage(s.token)) != null ? a : void 0;
    if ((e && te(e), (await Fe(s.token, s.apiUrl)) === !1)) {
      console.warn('[AccessShield] Invalid widget token \u2014 widget will not render.');
      return;
    }
    new w(s, e);
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => void ue())
    : ue();
  return ke(Ue);
})();
//# sourceMappingURL=widget.min.js.map
