import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { c as h } from './index-Csjf2uca.js';
import { r as x } from './index-pP6CS22B.js';
import { c as g, f as v } from './cn-D6O4h8v-.js';
import { L as j } from './icons-nm7YP-nX.js';
const w = h(
    [
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      v,
      'disabled:cursor-not-allowed',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-primary text-white hover:bg-primary-dark',
          secondary: 'bg-white text-primary-dark border border-border hover:bg-primary-light',
          ghost: 'bg-transparent text-primary-dark hover:bg-primary-light',
          danger: 'bg-error-700 text-white hover:bg-red-800',
        },
        size: {
          sm: 'min-h-11 px-3 py-1.5 text-sm',
          md: 'min-h-11 px-4 py-2 text-base',
          lg: 'min-h-11 px-6 py-3 text-lg',
        },
      },
      defaultVariants: { variant: 'primary', size: 'md' },
    },
  ),
  m = x.forwardRef(
    (
      {
        children: o,
        variant: l,
        size: p,
        isLoading: a = !1,
        disabled: c,
        disabledReason: t,
        className: u,
        type: b = 'button',
        onClick: s,
        ...i
      },
      y,
    ) => {
      const r = !!(c ?? a),
        n = t && r ? `${i.id ?? 'btn'}-disabled-reason` : void 0,
        f = (d) => {
          if (r) {
            d.preventDefault();
            return;
          }
          s == null || s(d);
        };
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx('button', {
            ref: y,
            type: b,
            'aria-disabled': r || void 0,
            'aria-busy': a || void 0,
            'aria-describedby': n ?? i['aria-describedby'],
            className: g(w({ variant: l, size: p }), r && 'opacity-50 cursor-not-allowed', u),
            onClick: f,
            ...i,
            children: a
              ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx('span', { className: 'sr-only', children: 'Loading' }),
                    e.jsx(j, { size: 16, className: 'mr-2 animate-spin', 'aria-hidden': 'true' }),
                    o,
                  ],
                })
              : o,
          }),
          t && r && e.jsx('span', { id: n, className: 'sr-only', children: t }),
        ],
      });
    },
  );
m.displayName = 'Button';
m.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Button',
  props: {
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    isLoading: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    disabledReason: {
      required: !1,
      tsType: { name: 'string' },
      description: 'Explanation shown when disabled — keeps button focusable per a11y',
    },
    type: { defaultValue: { value: "'button'", computed: !1 }, required: !1 },
  },
  composes: ['ButtonHTMLAttributes', 'VariantProps'],
};
export { m as B };
