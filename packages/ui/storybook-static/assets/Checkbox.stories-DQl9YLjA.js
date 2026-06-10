import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { e as te } from './a11y-test-BL_u61FI.js';
import { r as i } from './index-pP6CS22B.js';
import { P as S, d as re, b as H, c as q, a as oe } from './index-CPotrtYk.js';
import { u as ne } from './index-WyfESzTi.js';
import { u as se } from './index-B3ghne5W.js';
import { P as ae } from './index-B78SPcxA.js';
import { c as W, f as ce } from './cn-D6O4h8v-.js';
import { M as ie, C as de } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DLHbBEj9.js';
var I = 'Checkbox',
  [le] = oe(I),
  [pe, w] = le(I);
function ue(r) {
  const {
      __scopeCheckbox: o,
      checked: s,
      children: a,
      defaultChecked: n,
      disabled: t,
      form: u,
      name: m,
      onCheckedChange: d,
      required: p,
      value: h = 'on',
      internal_do_not_use_render: f,
    } = r,
    [b, g] = re({ prop: s, defaultProp: n ?? !1, onChange: d, caller: I }),
    [k, C] = i.useState(null),
    [v, c] = i.useState(null),
    l = i.useRef(!1),
    R = k ? !!u || !!k.closest('form') : !0,
    _ = {
      checked: b,
      disabled: t,
      setChecked: g,
      control: k,
      setControl: C,
      name: m,
      form: u,
      value: h,
      hasConsumerStoppedPropagationRef: l,
      required: p,
      defaultChecked: x(n) ? !1 : n,
      isFormControl: R,
      bubbleInput: v,
      setBubbleInput: c,
    };
  return e.jsx(pe, { scope: o, ..._, children: me(f) ? f(_) : a });
}
var K = 'CheckboxTrigger',
  U = i.forwardRef(({ __scopeCheckbox: r, onKeyDown: o, onClick: s, ...a }, n) => {
    const {
        control: t,
        value: u,
        disabled: m,
        checked: d,
        required: p,
        setControl: h,
        setChecked: f,
        hasConsumerStoppedPropagationRef: b,
        isFormControl: g,
        bubbleInput: k,
      } = w(K, r),
      C = H(n, h),
      v = i.useRef(d);
    return (
      i.useEffect(() => {
        const c = t == null ? void 0 : t.form;
        if (c) {
          const l = () => f(v.current);
          return (c.addEventListener('reset', l), () => c.removeEventListener('reset', l));
        }
      }, [t, f]),
      e.jsx(S.button, {
        type: 'button',
        role: 'checkbox',
        'aria-checked': x(d) ? 'mixed' : d,
        'aria-required': p,
        'data-state': Y(d),
        'data-disabled': m ? '' : void 0,
        disabled: m,
        value: u,
        ...a,
        ref: C,
        onKeyDown: q(o, (c) => {
          c.key === 'Enter' && c.preventDefault();
        }),
        onClick: q(s, (c) => {
          (f((l) => (x(l) ? !0 : !l)),
            k && g && ((b.current = c.isPropagationStopped()), b.current || c.stopPropagation()));
        }),
      })
    );
  });
U.displayName = K;
var V = i.forwardRef((r, o) => {
  const {
    __scopeCheckbox: s,
    name: a,
    checked: n,
    defaultChecked: t,
    required: u,
    disabled: m,
    value: d,
    onCheckedChange: p,
    form: h,
    ...f
  } = r;
  return e.jsx(ue, {
    __scopeCheckbox: s,
    checked: n,
    defaultChecked: t,
    disabled: m,
    required: u,
    onCheckedChange: p,
    name: a,
    form: h,
    value: d,
    internal_do_not_use_render: ({ isFormControl: b }) =>
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(U, { ...f, ref: o, __scopeCheckbox: s }),
          b && e.jsx(Q, { __scopeCheckbox: s }),
        ],
      }),
  });
});
V.displayName = I;
var X = 'CheckboxIndicator',
  $ = i.forwardRef((r, o) => {
    const { __scopeCheckbox: s, forceMount: a, ...n } = r,
      t = w(X, s);
    return e.jsx(ae, {
      present: a || x(t.checked) || t.checked === !0,
      children: e.jsx(S.span, {
        'data-state': Y(t.checked),
        'data-disabled': t.disabled ? '' : void 0,
        ...n,
        ref: o,
        style: { pointerEvents: 'none', ...r.style },
      }),
    });
  });
$.displayName = X;
var J = 'CheckboxBubbleInput',
  Q = i.forwardRef(({ __scopeCheckbox: r, ...o }, s) => {
    const {
        control: a,
        hasConsumerStoppedPropagationRef: n,
        checked: t,
        defaultChecked: u,
        required: m,
        disabled: d,
        name: p,
        value: h,
        form: f,
        bubbleInput: b,
        setBubbleInput: g,
      } = w(J, r),
      k = H(s, g),
      C = ne(t),
      v = se(a);
    i.useEffect(() => {
      const l = b;
      if (!l) return;
      const R = window.HTMLInputElement.prototype,
        T = Object.getOwnPropertyDescriptor(R, 'checked').set,
        Z = !n.current;
      if (C !== t && T) {
        const ee = new Event('click', { bubbles: Z });
        ((l.indeterminate = x(t)), T.call(l, x(t) ? !1 : t), l.dispatchEvent(ee));
      }
    }, [b, C, t, n]);
    const c = i.useRef(x(t) ? !1 : t);
    return e.jsx(S.input, {
      type: 'checkbox',
      'aria-hidden': !0,
      defaultChecked: u ?? c.current,
      required: m,
      disabled: d,
      name: p,
      value: h,
      form: f,
      ...o,
      tabIndex: -1,
      ref: k,
      style: {
        ...o.style,
        ...v,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
        transform: 'translateX(-100%)',
      },
    });
  });
Q.displayName = J;
function me(r) {
  return typeof r == 'function';
}
function x(r) {
  return r === 'indeterminate';
}
function Y(r) {
  return x(r) ? 'indeterminate' : r ? 'checked' : 'unchecked';
}
const y = i.forwardRef(
  ({ label: r, hint: o, indeterminate: s, id: a, className: n, checked: t, ...u }, m) => {
    const d = i.useId(),
      p = a ?? d,
      h = o ? `${p}-hint` : void 0;
    return e.jsxs('div', {
      className: 'flex items-start gap-3',
      children: [
        e.jsx(V, {
          ref: m,
          id: p,
          'aria-describedby': h,
          className: W(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-white',
            'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white',
            'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white',
            ce,
            n,
          ),
          checked: s ? 'indeterminate' : t,
          ...u,
          children: e.jsx($, {
            children: s
              ? e.jsx(ie, { size: 12, 'aria-hidden': 'true' })
              : e.jsx(de, { size: 12, 'aria-hidden': 'true' }),
          }),
        }),
        e.jsxs('div', {
          children: [
            e.jsx('label', {
              htmlFor: p,
              className: 'text-sm font-medium text-text-secondary',
              children: r,
            }),
            o && e.jsx('p', { id: h, className: 'text-sm text-text-tertiary', children: o }),
          ],
        }),
      ],
    });
  },
);
y.displayName = 'Checkbox';
function P({ legend: r, hint: o, children: s, className: a }) {
  const n = o ? 'checkbox-group-hint' : void 0;
  return e.jsxs('fieldset', {
    className: W('space-y-3', a),
    'aria-describedby': n,
    children: [
      e.jsx('legend', { className: 'text-sm font-semibold text-text-primary', children: r }),
      o && e.jsx('p', { id: n, className: 'text-sm text-text-tertiary', children: o }),
      e.jsx('div', { className: 'space-y-3', children: s }),
    ],
  });
}
P.displayName = 'CheckboxGroup';
y.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Checkbox',
  props: {
    label: { required: !0, tsType: { name: 'string' }, description: '' },
    hint: { required: !1, tsType: { name: 'string' }, description: '' },
    indeterminate: { required: !1, tsType: { name: 'boolean' }, description: '' },
  },
  composes: ['ComponentPropsWithoutRef'],
};
P.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'CheckboxGroup',
  props: {
    legend: { required: !0, tsType: { name: 'string' }, description: '' },
    hint: { required: !1, tsType: { name: 'string' }, description: '' },
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const Re = { title: 'Components/Checkbox', component: y, tags: ['autodocs'] },
  j = {
    args: { label: 'Enable email notifications', hint: 'Receive scan completion alerts' },
    play: async ({ canvasElement: r }) => {
      await te(r);
    },
  },
  N = { args: { label: 'Select all', indeterminate: !0 } },
  E = {
    render: () =>
      e.jsxs(P, {
        legend: 'Notification preferences',
        hint: 'Choose how you want to be notified',
        children: [
          e.jsx(y, { label: 'Email', defaultChecked: !0 }),
          e.jsx(y, { label: 'SMS' }),
          e.jsx(y, { label: 'WhatsApp' }),
        ],
      }),
  };
var M, A, G;
j.parameters = {
  ...j.parameters,
  docs: {
    ...((M = j.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Enable email notifications',
    hint: 'Receive scan completion alerts'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((G = (A = j.parameters) == null ? void 0 : A.docs) == null ? void 0 : G.source),
    },
  },
};
var B, D, F;
N.parameters = {
  ...N.parameters,
  docs: {
    ...((B = N.parameters) == null ? void 0 : B.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Select all',
    indeterminate: true
  }
}`,
      ...((F = (D = N.parameters) == null ? void 0 : D.docs) == null ? void 0 : F.source),
    },
  },
};
var O, z, L;
E.parameters = {
  ...E.parameters,
  docs: {
    ...((O = E.parameters) == null ? void 0 : O.docs),
    source: {
      originalSource: `{
  render: () => <CheckboxGroup legend="Notification preferences" hint="Choose how you want to be notified">
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="SMS" />
      <Checkbox label="WhatsApp" />
    </CheckboxGroup>
}`,
      ...((L = (z = E.parameters) == null ? void 0 : z.docs) == null ? void 0 : L.source),
    },
  },
};
const _e = ['Default', 'Indeterminate', 'Group'];
export { j as Default, E as Group, N as Indeterminate, _e as __namedExportsOrder, Re as default };
