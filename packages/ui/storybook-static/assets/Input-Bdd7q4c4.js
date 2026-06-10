import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { r as x } from './index-pP6CS22B.js';
import { c as f, f as T } from './cn-D6O4h8v-.js';
const u = x.forwardRef(
  (
    {
      label: y,
      hint: r,
      error: t,
      showCharCount: d = !1,
      maxLength: i,
      required: a,
      disabled: c,
      className: b,
      containerClassName: g,
      id: h,
      value: n,
      defaultValue: o,
      ...j
    },
    N,
  ) => {
    const v = x.useId(),
      s = h ?? v,
      l = r ? `${s}-hint` : void 0,
      p = t ? `${s}-error` : void 0,
      m = d ? `${s}-count` : void 0,
      I = [l, p, m].filter(Boolean).join(' ') || void 0,
      q = typeof n == 'string' ? n.length : typeof o == 'string' ? o.length : 0;
    return e.jsxs('div', {
      className: f('space-y-1.5', g),
      children: [
        e.jsxs('label', {
          htmlFor: s,
          className: 'text-sm font-medium text-text-secondary',
          children: [
            y,
            a &&
              e.jsx('span', {
                'aria-label': 'required',
                className: 'ml-0.5 text-error-700',
                children: '*',
              }),
          ],
        }),
        e.jsx('input', {
          ref: N,
          id: s,
          required: a,
          disabled: c,
          maxLength: i,
          'aria-required': a || void 0,
          'aria-invalid': t ? !0 : void 0,
          'aria-describedby': I,
          className: f(
            'w-full min-h-11 rounded-md border px-3 py-2 text-base text-text-primary',
            T,
            t ? 'border-error-700' : 'border-border',
            c && 'cursor-not-allowed bg-gray-50 opacity-60',
            b,
          ),
          value: n,
          defaultValue: o,
          ...j,
        }),
        e.jsxs('div', {
          className: 'flex items-start justify-between gap-2',
          children: [
            e.jsxs('div', {
              className: 'flex-1',
              children: [
                r &&
                  !t &&
                  e.jsx('p', { id: l, className: 'text-sm text-text-tertiary', children: r }),
                t &&
                  e.jsx('p', {
                    id: p,
                    role: 'alert',
                    className: 'text-sm text-error-700',
                    children: t,
                  }),
              ],
            }),
            d &&
              i &&
              e.jsxs('p', {
                id: m,
                className: 'text-sm text-text-tertiary',
                'aria-live': 'polite',
                children: [q, '/', i],
              }),
          ],
        }),
      ],
    });
  },
);
u.displayName = 'Input';
u.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Input',
  props: {
    label: { required: !0, tsType: { name: 'string' }, description: '' },
    hint: { required: !1, tsType: { name: 'string' }, description: '' },
    error: { required: !1, tsType: { name: 'string' }, description: '' },
    showCharCount: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    maxLength: { required: !1, tsType: { name: 'number' }, description: '' },
    containerClassName: { required: !1, tsType: { name: 'string' }, description: '' },
  },
  composes: ['Omit'],
};
export { u as I };
