import { e as re } from './a11y-test-BL_u61FI.js';
import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { r as p } from './index-pP6CS22B.js';
import { d as oe, P as y, b as j, c as N, a as M } from './index-CPotrtYk.js';
import { R as ae, c as D, I as te } from './index-Lf60WBJ2.js';
import { u as ne } from './index-vWhAg_4k.js';
import { u as se } from './index-B3ghne5W.js';
import { u as ie } from './index-WyfESzTi.js';
import { P as de } from './index-B78SPcxA.js';
import { c as E, f as ce } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DLHbBEj9.js';
import './index-DJqjwM60.js';
var w = 'Radio',
  [le, F] = M(w),
  [ue, _] = le(w);
function V(o) {
  const {
      __scopeRadio: n,
      checked: r = !1,
      children: s,
      disabled: a,
      form: i,
      name: d,
      onCheck: c,
      required: l,
      value: f = 'on',
      internal_do_not_use_render: u,
    } = o,
    [t, m] = p.useState(null),
    [v, R] = p.useState(null),
    b = p.useRef(!1),
    x = t ? !!i || !!t.closest('form') : !0,
    h = {
      checked: r,
      disabled: a,
      required: l,
      name: d,
      form: i,
      value: f,
      control: t,
      setControl: m,
      hasConsumerStoppedPropagationRef: b,
      isFormControl: x,
      bubbleInput: v,
      setBubbleInput: R,
      onCheck: () => (c == null ? void 0 : c()),
    };
  return e.jsx(ue, { scope: n, ...h, children: me(u) ? u(h) : s });
}
var B = 'RadioTrigger',
  C = p.forwardRef(({ __scopeRadio: o, onClick: n, ...r }, s) => {
    const {
        checked: a,
        disabled: i,
        value: d,
        setControl: c,
        onCheck: l,
        hasConsumerStoppedPropagationRef: f,
        isFormControl: u,
        bubbleInput: t,
      } = _(B, o),
      m = j(s, c);
    return e.jsx(y.button, {
      type: 'button',
      role: 'radio',
      'aria-checked': a,
      'data-state': K(a),
      'data-disabled': i ? '' : void 0,
      disabled: i,
      value: d,
      ...r,
      ref: m,
      onClick: N(n, (v) => {
        (a || l(),
          t && u && ((f.current = v.isPropagationStopped()), f.current || v.stopPropagation()));
      }),
    });
  });
C.displayName = B;
var pe = p.forwardRef((o, n) => {
  const {
    __scopeRadio: r,
    name: s,
    checked: a,
    required: i,
    disabled: d,
    value: c,
    onCheck: l,
    form: f,
    ...u
  } = o;
  return e.jsx(V, {
    __scopeRadio: r,
    checked: a,
    disabled: d,
    required: i,
    onCheck: l,
    name: s,
    form: f,
    value: c,
    internal_do_not_use_render: ({ isFormControl: t }) =>
      e.jsxs(e.Fragment, {
        children: [e.jsx(C, { ...u, ref: n, __scopeRadio: r }), t && e.jsx(G, { __scopeRadio: r })],
      }),
  });
});
pe.displayName = w;
var O = 'RadioIndicator',
  L = p.forwardRef((o, n) => {
    const { __scopeRadio: r, forceMount: s, ...a } = o,
      i = _(O, r);
    return e.jsx(de, {
      present: s || i.checked,
      children: e.jsx(y.span, {
        'data-state': K(i.checked),
        'data-disabled': i.disabled ? '' : void 0,
        ...a,
        ref: n,
      }),
    });
  });
L.displayName = O;
var U = 'RadioBubbleInput',
  G = p.forwardRef(({ __scopeRadio: o, ...n }, r) => {
    const {
        control: s,
        checked: a,
        required: i,
        disabled: d,
        name: c,
        value: l,
        form: f,
        bubbleInput: u,
        setBubbleInput: t,
        hasConsumerStoppedPropagationRef: m,
      } = _(U, o),
      v = j(r, t),
      R = ie(a),
      b = se(s);
    p.useEffect(() => {
      const h = u;
      if (!h) return;
      const J = window.HTMLInputElement.prototype,
        S = Object.getOwnPropertyDescriptor(J, 'checked').set,
        Z = !m.current;
      if (R !== a && S) {
        const ee = new Event('click', { bubbles: Z });
        (S.call(h, a), h.dispatchEvent(ee));
      }
    }, [u, R, a, m]);
    const x = p.useRef(a);
    return e.jsx(y.input, {
      type: 'radio',
      'aria-hidden': !0,
      defaultChecked: x.current,
      required: i,
      disabled: d,
      name: c,
      value: l,
      form: f,
      ...n,
      tabIndex: -1,
      ref: v,
      style: {
        ...n.style,
        ...b,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
        transform: 'translateX(-100%)',
      },
    });
  });
G.displayName = U;
function me(o) {
  return typeof o == 'function';
}
function K(o) {
  return o ? 'checked' : 'unchecked';
}
var fe = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  I = 'RadioGroup',
  [ve] = M(I, [D, F]),
  $ = D(),
  k = F(),
  [Re, he] = ve(I),
  z = p.forwardRef((o, n) => {
    const {
        __scopeRadioGroup: r,
        name: s,
        defaultValue: a,
        value: i,
        required: d = !1,
        disabled: c = !1,
        orientation: l,
        dir: f,
        loop: u = !0,
        onValueChange: t,
        ...m
      } = o,
      v = $(r),
      R = ne(f),
      [b, x] = oe({ prop: i, defaultProp: a ?? null, onChange: t, caller: I });
    return e.jsx(Re, {
      scope: r,
      name: s,
      required: d,
      disabled: c,
      value: b,
      onValueChange: x,
      children: e.jsx(ae, {
        asChild: !0,
        ...v,
        orientation: l,
        dir: R,
        loop: u,
        children: e.jsx(y.div, {
          role: 'radiogroup',
          'aria-required': d,
          'aria-orientation': l,
          'data-disabled': c ? '' : void 0,
          dir: R,
          ...m,
          ref: n,
        }),
      }),
    });
  });
z.displayName = I;
var be = 'RadioGroupItem',
  xe = 'RadioGroupItemProvider',
  H = 'RadioGroupItemTrigger',
  ge = 'RadioGroupItemBubbleInput';
function ye(o) {
  const {
      __scopeRadioGroup: n,
      value: r,
      disabled: s,
      children: a,
      internal_do_not_use_render: i,
    } = o,
    d = he(xe, n),
    c = k(n),
    l = d.disabled || s;
  return e.jsx(V, {
    ...c,
    checked: d.value === r,
    disabled: l,
    required: d.required,
    name: d.name,
    value: r,
    onCheck: () => d.onValueChange(r),
    internal_do_not_use_render: i,
    children: a,
  });
}
var Q = p.forwardRef((o, n) => {
  const { __scopeRadioGroup: r, ...s } = o,
    a = $(r),
    i = k(r),
    { checked: d, disabled: c } = _(H, i.__scopeRadio),
    l = p.useRef(null),
    f = j(n, l),
    u = p.useRef(!1);
  return (
    p.useEffect(() => {
      const t = (v) => {
          fe.includes(v.key) && (u.current = !0);
        },
        m = () => (u.current = !1);
      return (
        document.addEventListener('keydown', t),
        document.addEventListener('keyup', m),
        () => {
          (document.removeEventListener('keydown', t), document.removeEventListener('keyup', m));
        }
      );
    }, []),
    e.jsx(te, {
      asChild: !0,
      ...a,
      focusable: !c,
      active: d,
      children: e.jsx(C, {
        ...i,
        ...s,
        ref: f,
        onKeyDown: N(s.onKeyDown, (t) => {
          t.key === 'Enter' && t.preventDefault();
        }),
        onFocus: N(s.onFocus, () => {
          var t;
          u.current && ((t = l.current) == null || t.click());
        }),
      }),
    })
  );
});
Q.displayName = H;
var W = p.forwardRef((o, n) => {
  const { __scopeRadioGroup: r, value: s, disabled: a, ...i } = o;
  return e.jsx(ye, {
    __scopeRadioGroup: r,
    value: s,
    disabled: a,
    internal_do_not_use_render: ({ isFormControl: d }) =>
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(Q, { ...i, ref: n, __scopeRadioGroup: r }),
          d && e.jsx(X, { __scopeRadioGroup: r }),
        ],
      }),
  });
});
W.displayName = be;
var X = p.forwardRef((o, n) => {
  const { __scopeRadioGroup: r, ...s } = o,
    a = k(r);
  return e.jsx(G, { ...a, ...s, ref: n });
});
X.displayName = ge;
var _e = 'RadioGroupIndicator',
  Y = p.forwardRef((o, n) => {
    const { __scopeRadioGroup: r, ...s } = o,
      a = k(r);
    return e.jsx(L, { ...a, ...s, ref: n });
  });
Y.displayName = _e;
function P({
  legend: o,
  options: n,
  value: r,
  defaultValue: s,
  onValueChange: a,
  name: i,
  required: d,
  disabled: c,
  orientation: l = 'vertical',
  className: f,
}) {
  const u = p.useId();
  return e.jsxs('fieldset', {
    className: E('space-y-3', f),
    disabled: c,
    children: [
      e.jsx('legend', { className: 'text-sm font-semibold text-text-primary', children: o }),
      e.jsx(z, {
        value: r,
        defaultValue: s,
        onValueChange: a,
        name: i,
        required: d,
        orientation: l,
        'aria-labelledby': `${u}-legend`,
        className: E('flex gap-4', l === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'),
        children: n.map((t) => {
          const m = `${u}-${t.value}`,
            v = t.hint ? `${m}-hint` : void 0;
          return e.jsxs(
            'div',
            {
              className: 'flex items-start gap-3',
              children: [
                e.jsx(W, {
                  value: t.value,
                  id: m,
                  disabled: t.disabled,
                  'aria-describedby': v,
                  className: E(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-white',
                    'data-[state=checked]:border-primary',
                    ce,
                  ),
                  children: e.jsx(Y, {
                    className: 'flex items-center justify-center',
                    children: e.jsx('span', {
                      className: 'h-2.5 w-2.5 rounded-full bg-primary',
                      'aria-hidden': 'true',
                    }),
                  }),
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('label', {
                      htmlFor: m,
                      className: 'text-sm font-medium text-text-secondary',
                      children: t.label,
                    }),
                    t.hint &&
                      e.jsx('p', {
                        id: v,
                        className: 'text-sm text-text-tertiary',
                        children: t.hint,
                      }),
                  ],
                }),
              ],
            },
            t.value,
          );
        }),
      }),
    ],
  });
}
P.displayName = 'RadioGroup';
P.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'RadioGroup',
  props: {
    legend: { required: !0, tsType: { name: 'string' }, description: '' },
    options: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'RadioOption' }], raw: 'RadioOption[]' },
      description: '',
    },
    value: { required: !1, tsType: { name: 'string' }, description: '' },
    defaultValue: { required: !1, tsType: { name: 'string' }, description: '' },
    onValueChange: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(value: string) => void',
        signature: {
          arguments: [{ type: { name: 'string' }, name: 'value' }],
          return: { name: 'void' },
        },
      },
      description: '',
    },
    name: { required: !1, tsType: { name: 'string' }, description: '' },
    required: { required: !1, tsType: { name: 'boolean' }, description: '' },
    disabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
    orientation: {
      required: !1,
      tsType: {
        name: 'union',
        raw: "'horizontal' | 'vertical'",
        elements: [
          { name: 'literal', value: "'horizontal'" },
          { name: 'literal', value: "'vertical'" },
        ],
      },
      description: '',
      defaultValue: { value: "'vertical'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const Ve = { title: 'Components/RadioGroup', component: P, tags: ['autodocs'] },
  g = {
    args: {
      legend: 'Scan depth',
      options: [
        { value: 'quick', label: 'Quick scan', hint: 'Homepage only' },
        { value: 'full', label: 'Full scan', hint: 'All linked pages' },
        { value: 'custom', label: 'Custom', hint: 'Select specific URLs' },
      ],
      defaultValue: 'quick',
    },
    play: async ({ canvasElement: o }) => {
      await re(o);
    },
  };
var A, T, q;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((A = g.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    legend: 'Scan depth',
    options: [{
      value: 'quick',
      label: 'Quick scan',
      hint: 'Homepage only'
    }, {
      value: 'full',
      label: 'Full scan',
      hint: 'All linked pages'
    }, {
      value: 'custom',
      label: 'Custom',
      hint: 'Select specific URLs'
    }],
    defaultValue: 'quick'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((q = (T = g.parameters) == null ? void 0 : T.docs) == null ? void 0 : q.source),
    },
  },
};
const Be = ['Default'];
export { g as Default, Be as __namedExportsOrder, Ve as default };
