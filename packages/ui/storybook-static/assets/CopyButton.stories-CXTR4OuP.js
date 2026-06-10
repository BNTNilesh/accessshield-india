import { e as u } from './a11y-test-BL_u61FI.js';
import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { r as n } from './index-pP6CS22B.js';
import { c as y, f } from './cn-D6O4h8v-.js';
import { C as x, c as h } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
function o({ text: t, label: l = 'Copy to clipboard', className: d }) {
  const [r, s] = n.useState(!1),
    m = n.useCallback(async () => {
      try {
        (await navigator.clipboard.writeText(t), s(!0), setTimeout(() => s(!1), 2e3));
      } catch {
        s(!1);
      }
    }, [t]);
  return e.jsxs('div', {
    className: 'inline-flex items-center gap-2',
    children: [
      e.jsx('button', {
        type: 'button',
        onClick: () => void m(),
        'aria-label': l,
        className: y(
          'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md',
          'border border-border bg-white text-text-secondary hover:bg-primary-light hover:text-primary',
          f,
          d,
        ),
        children: r
          ? e.jsx(x, { size: 16, 'aria-hidden': 'true' })
          : e.jsx(h, { size: 16, 'aria-hidden': 'true' }),
      }),
      e.jsx('span', {
        role: 'status',
        'aria-live': 'polite',
        className: 'sr-only',
        children: r ? 'Copied!' : '',
      }),
    ],
  });
}
o.displayName = 'CopyButton';
o.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'CopyButton',
  props: {
    text: { required: !0, tsType: { name: 'string' }, description: '' },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Copy to clipboard'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const E = { title: 'Components/CopyButton', component: o, tags: ['autodocs'] },
  a = {
    args: { text: 'https://accessshield.in/scan/abc123', label: 'Copy scan link' },
    play: async ({ canvasElement: t }) => {
      await u(t);
    },
  };
var i, c, p;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((i = a.parameters) == null ? void 0 : i.docs),
    source: {
      originalSource: `{
  args: {
    text: 'https://accessshield.in/scan/abc123',
    label: 'Copy scan link'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((p = (c = a.parameters) == null ? void 0 : c.docs) == null ? void 0 : p.source),
    },
  },
};
const T = ['Default'];
export { a as Default, T as __namedExportsOrder, E as default };
