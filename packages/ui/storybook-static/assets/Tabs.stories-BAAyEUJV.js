import { j as n } from './jsx-runtime-Z5uAzocK.js';
import { e as M } from './a11y-test-BL_u61FI.js';
import { r as m } from './index-pP6CS22B.js';
import { d as F, P as f, c as T, a as q } from './index-CPotrtYk.js';
import { R as G, I as L, c as C } from './index-Lf60WBJ2.js';
import { P as $ } from './index-B78SPcxA.js';
import { u as O } from './index-vWhAg_4k.js';
import { u as k } from './index-DJqjwM60.js';
import { c as K, f as B } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DLHbBEj9.js';
var g = 'Tabs',
  [z] = q(g, [C]),
  N = C(),
  [H, x] = z(g),
  j = m.forwardRef((e, r) => {
    const {
        __scopeTabs: l,
        value: a,
        onValueChange: s,
        defaultValue: c,
        orientation: t = 'horizontal',
        dir: d,
        activationMode: o = 'automatic',
        ...v
      } = e,
      u = O(d),
      [i, p] = F({ prop: a, onChange: s, defaultProp: c ?? '', caller: g });
    return n.jsx(H, {
      scope: l,
      baseId: k(),
      value: i,
      onValueChange: p,
      orientation: t,
      dir: u,
      activationMode: o,
      children: n.jsx(f.div, { dir: u, 'data-orientation': t, ...v, ref: r }),
    });
  });
j.displayName = g;
var R = 'TabsList',
  _ = m.forwardRef((e, r) => {
    const { __scopeTabs: l, loop: a = !0, ...s } = e,
      c = x(R, l),
      t = N(l);
    return n.jsx(G, {
      asChild: !0,
      ...t,
      orientation: c.orientation,
      dir: c.dir,
      loop: a,
      children: n.jsx(f.div, { role: 'tablist', 'aria-orientation': c.orientation, ...s, ref: r }),
    });
  });
_.displayName = R;
var A = 'TabsTrigger',
  E = m.forwardRef((e, r) => {
    const { __scopeTabs: l, value: a, disabled: s = !1, ...c } = e,
      t = x(A, l),
      d = N(l),
      o = P(t.baseId, a),
      v = S(t.baseId, a),
      u = a === t.value;
    return n.jsx(L, {
      asChild: !0,
      ...d,
      focusable: !s,
      active: u,
      children: n.jsx(f.button, {
        type: 'button',
        role: 'tab',
        'aria-selected': u,
        'aria-controls': v,
        'data-state': u ? 'active' : 'inactive',
        'data-disabled': s ? '' : void 0,
        disabled: s,
        id: o,
        ...c,
        ref: r,
        onMouseDown: T(e.onMouseDown, (i) => {
          !s && i.button === 0 && i.ctrlKey === !1 ? t.onValueChange(a) : i.preventDefault();
        }),
        onKeyDown: T(e.onKeyDown, (i) => {
          [' ', 'Enter'].includes(i.key) && t.onValueChange(a);
        }),
        onFocus: T(e.onFocus, () => {
          const i = t.activationMode !== 'manual';
          !u && !s && i && t.onValueChange(a);
        }),
      }),
    });
  });
E.displayName = A;
var D = 'TabsContent',
  V = m.forwardRef((e, r) => {
    const { __scopeTabs: l, value: a, forceMount: s, children: c, ...t } = e,
      d = x(D, l),
      o = P(d.baseId, a),
      v = S(d.baseId, a),
      u = a === d.value,
      i = m.useRef(u);
    return (
      m.useEffect(() => {
        const p = requestAnimationFrame(() => (i.current = !1));
        return () => cancelAnimationFrame(p);
      }, []),
      n.jsx($, {
        present: s || u,
        children: ({ present: p }) =>
          n.jsx(f.div, {
            'data-state': u ? 'active' : 'inactive',
            'data-orientation': d.orientation,
            role: 'tabpanel',
            'aria-labelledby': o,
            hidden: !p,
            id: v,
            tabIndex: 0,
            ...t,
            ref: r,
            style: { ...e.style, animationDuration: i.current ? '0s' : void 0 },
            children: p && c,
          }),
      })
    );
  });
V.displayName = D;
function P(e, r) {
  return `${e}-trigger-${r}`;
}
function S(e, r) {
  return `${e}-content-${r}`;
}
var J = j,
  Q = _,
  U = E,
  W = V;
function y({
  items: e,
  defaultValue: r,
  value: l,
  onValueChange: a,
  ariaLabel: s = 'Tabs',
  className: c,
}) {
  var d;
  const t = r ?? ((d = e[0]) == null ? void 0 : d.value);
  return n.jsxs(J, {
    defaultValue: t,
    value: l,
    onValueChange: a,
    className: c,
    children: [
      n.jsx(Q, {
        'aria-label': s,
        className: 'flex gap-1 border-b border-border',
        children: e.map((o) =>
          n.jsx(
            U,
            {
              value: o.value,
              disabled: o.disabled,
              className: K(
                'inline-flex min-h-11 items-center px-4 py-2 text-sm font-medium text-text-tertiary',
                'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary',
                'disabled:cursor-not-allowed disabled:opacity-50',
                B,
              ),
              children: o.label,
            },
            o.value,
          ),
        ),
      }),
      e.map((o) =>
        n.jsx(
          W,
          {
            value: o.value,
            className: 'pt-4 focus-visible:outline-none',
            tabIndex: 0,
            children: o.content,
          },
          o.value,
        ),
      ),
    ],
  });
}
y.displayName = 'Tabs';
y.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Tabs',
  props: {
    items: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'TabItem' }], raw: 'TabItem[]' },
      description: '',
    },
    defaultValue: { required: !1, tsType: { name: 'string' }, description: '' },
    value: { required: !1, tsType: { name: 'string' }, description: '' },
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
    ariaLabel: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Tabs'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const de = { title: 'Components/Tabs', component: y, tags: ['autodocs'] },
  b = {
    args: {
      items: [
        {
          value: 'overview',
          label: 'Overview',
          content: n.jsx('p', { children: 'Dashboard overview content' }),
        },
        { value: 'issues', label: 'Issues', content: n.jsx('p', { children: '12 open issues' }) },
        {
          value: 'reports',
          label: 'Reports',
          content: n.jsx('p', { children: 'Download compliance reports' }),
        },
      ],
    },
    play: async ({ canvasElement: e }) => {
      await M(e);
    },
  };
var h, I, w;
b.parameters = {
  ...b.parameters,
  docs: {
    ...((h = b.parameters) == null ? void 0 : h.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      value: 'overview',
      label: 'Overview',
      content: <p>Dashboard overview content</p>
    }, {
      value: 'issues',
      label: 'Issues',
      content: <p>12 open issues</p>
    }, {
      value: 'reports',
      label: 'Reports',
      content: <p>Download compliance reports</p>
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((w = (I = b.parameters) == null ? void 0 : I.docs) == null ? void 0 : w.source),
    },
  },
};
const ue = ['Default'];
export { b as Default, ue as __namedExportsOrder, de as default };
