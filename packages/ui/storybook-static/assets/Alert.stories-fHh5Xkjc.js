import { e as z } from './a11y-test-BL_u61FI.js';
import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { c as P } from './index-Csjf2uca.js';
import { r as s } from './index-pP6CS22B.js';
import { c as v, f as W } from './cn-D6O4h8v-.js';
import { I as X, a as b, C as Y, X as B } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
const D = P('relative flex gap-3 rounded-lg border p-4', {
    variants: {
      variant: {
        error: 'border-error-700/30 bg-error-100 text-error-700',
        success: 'border-success-700/30 bg-success-100 text-success-700',
        warning: 'border-accent/30 bg-accent-light text-accent-700',
        info: 'border-primary/30 bg-primary-light text-primary-dark',
      },
    },
    defaultVariants: { variant: 'info' },
  }),
  F = { error: b, success: Y, warning: b, info: X },
  H = { error: 'alert', success: 'status', warning: 'alert', info: 'status' },
  O = { error: 'assertive', success: 'polite', warning: 'assertive', info: 'polite' };
function p({
  variant: l = 'info',
  title: u,
  children: k,
  onDismiss: r,
  autoDismissMs: m,
  className: q,
  ...C
}) {
  const [T, L] = s.useState(!0),
    [f, a] = s.useState(!1),
    g = s.useRef(),
    d = s.useCallback(() => {
      (L(!1), r == null || r());
    }, [r]);
  if (
    (s.useEffect(() => {
      if (!(!m || f)) return ((g.current = setTimeout(d, m)), () => clearTimeout(g.current));
    }, [m, f, d]),
    !T)
  )
    return null;
  const t = l ?? 'info',
    M = F[t],
    U = H[t],
    _ = O[t];
  return e.jsxs('div', {
    role: U,
    'aria-live': _,
    'aria-atomic': 'true',
    className: v(D({ variant: t }), q),
    onMouseEnter: () => a(!0),
    onMouseLeave: () => a(!1),
    onFocus: () => a(!0),
    onBlur: () => a(!1),
    ...C,
    children: [
      e.jsx(M, { size: 20, className: 'shrink-0', 'aria-hidden': 'true' }),
      e.jsxs('div', {
        className: 'flex-1',
        children: [
          u && e.jsx('p', { className: 'font-semibold', children: u }),
          e.jsx('div', { className: u ? 'mt-1 text-sm' : 'text-sm', children: k }),
        ],
      }),
      r &&
        e.jsx('button', {
          type: 'button',
          onClick: d,
          'aria-label': 'Dismiss alert',
          className: v(
            'inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md',
            W,
          ),
          children: e.jsx(B, { size: 16, 'aria-hidden': 'true' }),
        }),
    ],
  });
}
p.displayName = 'Alert';
p.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Alert',
  props: {
    title: { required: !1, tsType: { name: 'string' }, description: '' },
    onDismiss: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: { arguments: [], return: { name: 'void' } },
      },
      description: '',
    },
    autoDismissMs: { required: !1, tsType: { name: 'number' }, description: '' },
    variant: { defaultValue: { value: "'info'", computed: !1 }, required: !1 },
  },
  composes: ['HTMLAttributes', 'VariantProps'],
};
const ae = { title: 'Components/Alert', component: p, tags: ['autodocs'] },
  n = {
    args: { variant: 'error', title: 'Scan failed', children: 'Unable to reach the target URL.' },
    play: async ({ canvasElement: l }) => {
      await z(l);
    },
  },
  i = {
    args: {
      variant: 'success',
      title: 'Scan complete',
      children: 'Your accessibility score is 87.',
    },
  },
  o = { args: { variant: 'warning', children: '3 critical issues require immediate attention.' } },
  c = {
    args: {
      variant: 'info',
      children: 'New IS 17802 rules available.',
      onDismiss: () => {},
      autoDismissMs: 1e4,
    },
  };
var h, x, y;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((h = n.parameters) == null ? void 0 : h.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'error',
    title: 'Scan failed',
    children: 'Unable to reach the target URL.'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((y = (x = n.parameters) == null ? void 0 : x.docs) == null ? void 0 : y.source),
    },
  },
};
var S, w, N;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((S = i.parameters) == null ? void 0 : S.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'success',
    title: 'Scan complete',
    children: 'Your accessibility score is 87.'
  }
}`,
      ...((N = (w = i.parameters) == null ? void 0 : w.docs) == null ? void 0 : N.source),
    },
  },
};
var I, j, E;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((I = o.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'warning',
    children: '3 critical issues require immediate attention.'
  }
}`,
      ...((E = (j = o.parameters) == null ? void 0 : j.docs) == null ? void 0 : E.source),
    },
  },
};
var A, R, V;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((A = c.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'info',
    children: 'New IS 17802 rules available.',
    onDismiss: () => {},
    autoDismissMs: 10000
  }
}`,
      ...((V = (R = c.parameters) == null ? void 0 : R.docs) == null ? void 0 : V.source),
    },
  },
};
const te = ['Error', 'Success', 'Warning', 'Dismissible'];
export {
  c as Dismissible,
  n as Error,
  i as Success,
  o as Warning,
  te as __namedExportsOrder,
  ae as default,
};
