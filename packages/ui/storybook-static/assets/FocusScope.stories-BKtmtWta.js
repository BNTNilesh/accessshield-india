import { j as r } from './jsx-runtime-Z5uAzocK.js';
import { e as F } from './a11y-test-BL_u61FI.js';
import { B as N } from './Button-1pDptO5G.js';
import { I as S } from './Input-Bdd7q4c4.js';
import { r as d } from './index-pP6CS22B.js';
import { c as w } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-Csjf2uca.js';
import './icons-nm7YP-nX.js';
const T =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
function R(n = {}) {
  const { active: i = !0, returnFocusTo: u, onEscape: s } = n,
    o = d.useRef(null),
    l = d.useRef(null),
    a = d.useCallback(() => {
      const t = o.current;
      return t
        ? Array.from(t.querySelectorAll(T)).filter(
            (c) => !c.hasAttribute('aria-disabled') && c.offsetParent !== null,
          )
        : [];
    }, []);
  return (
    d.useEffect(() => {
      var h;
      if (!i) return;
      l.current = document.activeElement ?? null;
      const t = o.current;
      if (!t) return;
      const c = a();
      c.length > 0
        ? (h = c[0]) == null || h.focus()
        : (t.setAttribute('tabindex', '-1'), t.focus());
      const x = (e) => {
        if (e.key === 'Escape' && s) {
          (e.preventDefault(), s());
          return;
        }
        if (e.key !== 'Tab') return;
        const p = a();
        if (p.length === 0) {
          e.preventDefault();
          return;
        }
        const b = p[0],
          y = p[p.length - 1];
        !b ||
          !y ||
          (e.shiftKey
            ? document.activeElement === b && (e.preventDefault(), y.focus())
            : document.activeElement === y && (e.preventDefault(), b.focus()));
      };
      return (
        t.addEventListener('keydown', x),
        () => {
          t.removeEventListener('keydown', x);
          const e = u ?? l.current;
          e == null || e.focus();
        }
      );
    }, [i, a, s, u]),
    o
  );
}
function f({ children: n, trapped: i = !0, returnFocusTo: u, onEscape: s, className: o, ...l }) {
  const a = R({ active: i, returnFocusTo: u, onEscape: s });
  return r.jsx('div', { ref: a, className: w(o), ...l, children: n });
}
f.displayName = 'FocusScope';
f.__docgenInfo = {
  description: 'Wraps focus-trapped regions such as modals and drawers',
  methods: [],
  displayName: 'FocusScope',
  props: {
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    trapped: {
      required: !1,
      tsType: { name: 'boolean' },
      description: 'Whether focus trapping is active',
      defaultValue: { value: 'true', computed: !1 },
    },
    returnFocusTo: {
      required: !1,
      tsType: {
        name: 'union',
        raw: 'HTMLElement | null',
        elements: [{ name: 'HTMLElement' }, { name: 'null' }],
      },
      description: 'Return focus to this element on deactivate',
    },
    onEscape: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: { arguments: [], return: { name: 'void' } },
      },
      description: 'Called when Escape is pressed',
    },
  },
  composes: ['HTMLAttributes'],
};
const M = { title: 'Components/FocusScope', component: f, tags: ['autodocs'] },
  m = {
    render: () =>
      r.jsxs(f, {
        className: 'rounded-lg border border-border p-4',
        children: [
          r.jsx('p', {
            className: 'mb-4 text-sm text-text-secondary',
            children: 'Focus is trapped within this region.',
          }),
          r.jsxs('div', {
            className: 'space-y-4',
            children: [r.jsx(S, { label: 'Name' }), r.jsx(N, { children: 'Submit' })],
          }),
        ],
      }),
    play: async ({ canvasElement: n }) => {
      await F(n);
    },
  };
var E, v, g;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((E = m.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  render: () => <FocusScope className="rounded-lg border border-border p-4">
      <p className="mb-4 text-sm text-text-secondary">Focus is trapped within this region.</p>
      <div className="space-y-4">
        <Input label="Name" />
        <Button>Submit</Button>
      </div>
    </FocusScope>,
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((g = (v = m.parameters) == null ? void 0 : v.docs) == null ? void 0 : g.source),
    },
  },
};
const O = ['Default'];
export { m as Default, O as __namedExportsOrder, M as default };
