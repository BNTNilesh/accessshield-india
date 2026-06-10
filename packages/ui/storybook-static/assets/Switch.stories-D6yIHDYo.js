import { e as L } from './a11y-test-BL_u61FI.js';
import { j as t } from './jsx-runtime-Z5uAzocK.js';
import { r as d } from './index-pP6CS22B.js';
import { P as _, d as V, b as A, c as W, a as $ } from './index-CPotrtYk.js';
import { u as X } from './index-WyfESzTi.js';
import { u as J } from './index-B3ghne5W.js';
import { c as P, f as K } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DLHbBEj9.js';
var v = 'Switch',
  [Q] = $(v),
  [Y, R] = Q(v);
function Z(e) {
  const {
      __scopeSwitch: r,
      checked: n,
      children: a,
      defaultChecked: o,
      disabled: s,
      form: c,
      name: i,
      onCheckedChange: l,
      required: f,
      value: u = 'on',
      internal_do_not_use_render: p,
    } = e,
    [h, w] = V({ prop: n, defaultProp: o ?? !1, onChange: l, caller: v }),
    [m, b] = d.useState(null),
    [S, k] = d.useState(null),
    x = d.useRef(!1),
    y = m ? !!c || !!m.closest('form') : !0,
    C = {
      checked: h,
      setChecked: w,
      disabled: s,
      control: m,
      setControl: b,
      name: i,
      form: c,
      value: u,
      hasConsumerStoppedPropagationRef: x,
      required: f,
      defaultChecked: o,
      isFormControl: y,
      bubbleInput: S,
      setBubbleInput: k,
    };
  return t.jsx(Y, { scope: r, ...C, children: ee(p) ? p(C) : a });
}
var B = 'SwitchTrigger',
  q = d.forwardRef(({ __scopeSwitch: e, onClick: r, ...n }, a) => {
    const {
        value: o,
        disabled: s,
        checked: c,
        required: i,
        setControl: l,
        setChecked: f,
        hasConsumerStoppedPropagationRef: u,
        isFormControl: p,
        bubbleInput: h,
      } = R(B, e),
      w = A(a, l);
    return t.jsx(_.button, {
      type: 'button',
      role: 'switch',
      'aria-checked': c,
      'aria-required': i,
      'data-state': U(c),
      'data-disabled': s ? '' : void 0,
      disabled: s,
      value: o,
      ...n,
      ref: w,
      onClick: W(r, (m) => {
        (f((b) => !b),
          h && p && ((u.current = m.isPropagationStopped()), u.current || m.stopPropagation()));
      }),
    });
  });
q.displayName = B;
var M = d.forwardRef((e, r) => {
  const {
    __scopeSwitch: n,
    name: a,
    checked: o,
    defaultChecked: s,
    required: c,
    disabled: i,
    value: l,
    onCheckedChange: f,
    form: u,
    ...p
  } = e;
  return t.jsx(Z, {
    __scopeSwitch: n,
    checked: o,
    defaultChecked: s,
    disabled: i,
    required: c,
    onCheckedChange: f,
    name: a,
    form: u,
    value: l,
    internal_do_not_use_render: ({ isFormControl: h }) =>
      t.jsxs(t.Fragment, {
        children: [
          t.jsx(q, { ...p, ref: r, __scopeSwitch: n }),
          h && t.jsx(O, { __scopeSwitch: n }),
        ],
      }),
  });
});
M.displayName = v;
var F = 'SwitchThumb',
  H = d.forwardRef((e, r) => {
    const { __scopeSwitch: n, ...a } = e,
      o = R(F, n);
    return t.jsx(_.span, {
      'data-state': U(o.checked),
      'data-disabled': o.disabled ? '' : void 0,
      ...a,
      ref: r,
    });
  });
H.displayName = F;
var D = 'SwitchBubbleInput',
  O = d.forwardRef(({ __scopeSwitch: e, ...r }, n) => {
    const {
        control: a,
        hasConsumerStoppedPropagationRef: o,
        checked: s,
        defaultChecked: c,
        required: i,
        disabled: l,
        name: f,
        value: u,
        form: p,
        bubbleInput: h,
        setBubbleInput: w,
      } = R(D, e),
      m = A(n, w),
      b = X(s),
      S = J(a);
    d.useEffect(() => {
      const x = h;
      if (!x) return;
      const y = window.HTMLInputElement.prototype,
        N = Object.getOwnPropertyDescriptor(y, 'checked').set,
        z = !o.current;
      if (b !== s && N) {
        const G = new Event('click', { bubbles: z });
        (N.call(x, s), x.dispatchEvent(G));
      }
    }, [h, b, s, o]);
    const k = d.useRef(s);
    return t.jsx(_.input, {
      type: 'checkbox',
      'aria-hidden': !0,
      defaultChecked: c ?? k.current,
      required: i,
      disabled: l,
      name: f,
      value: u,
      form: p,
      ...r,
      tabIndex: -1,
      ref: m,
      style: {
        ...r.style,
        ...S,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
        transform: 'translateX(-100%)',
      },
    });
  });
O.displayName = D;
function ee(e) {
  return typeof e == 'function';
}
function U(e) {
  return e ? 'checked' : 'unchecked';
}
const j = d.forwardRef(({ label: e, hint: r, id: n, className: a, ...o }, s) => {
  const c = d.useId(),
    i = n ?? c,
    l = r ? `${i}-hint` : void 0;
  return t.jsxs('div', {
    className: 'flex items-center justify-between gap-4',
    children: [
      t.jsxs('div', {
        children: [
          t.jsx('label', {
            htmlFor: i,
            className: 'text-sm font-medium text-text-secondary',
            children: e,
          }),
          r && t.jsx('p', { id: l, className: 'text-sm text-text-tertiary', children: r }),
        ],
      }),
      t.jsx(M, {
        ref: s,
        id: i,
        role: 'switch',
        'aria-describedby': l,
        className: P(
          'relative inline-flex h-6 w-11 min-h-11 min-w-11 shrink-0 cursor-pointer items-center rounded-full',
          'border-2 border-transparent transition-colors',
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-border',
          K,
          a,
        ),
        ...o,
        children: t.jsx(H, {
          className: P(
            'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
            'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
          ),
        }),
      }),
    ],
  });
});
j.displayName = 'Switch';
j.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Switch',
  props: {
    label: { required: !0, tsType: { name: 'string' }, description: '' },
    hint: { required: !1, tsType: { name: 'string' }, description: '' },
  },
  composes: ['ComponentPropsWithoutRef'],
};
const pe = { title: 'Components/Switch', component: j, tags: ['autodocs'] },
  g = {
    args: { label: 'Auto-scan on deploy', hint: 'Trigger scans when new code is deployed' },
    play: async ({ canvasElement: e }) => {
      await L(e);
    },
  };
var E, I, T;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((E = g.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Auto-scan on deploy',
    hint: 'Trigger scans when new code is deployed'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((T = (I = g.parameters) == null ? void 0 : I.docs) == null ? void 0 : T.source),
    },
  },
};
const he = ['Default'];
export { g as Default, he as __namedExportsOrder, pe as default };
