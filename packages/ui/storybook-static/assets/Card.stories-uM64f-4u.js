import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { e as A } from './a11y-test-BL_u61FI.js';
import { c as N } from './cn-D6O4h8v-.js';
import './index-pP6CS22B.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
function n({
  children: i,
  as: x = 'div',
  heading: a,
  headingLevel: v = 3,
  description: t,
  className: h,
  ...y
}) {
  const f = `h${v}`,
    l = a ? 'card-heading' : void 0,
    o = t ? 'card-description' : void 0;
  return e.jsxs(x, {
    className: N('rounded-lg border border-border bg-white p-6 shadow-sm', h),
    'aria-labelledby': l,
    'aria-describedby': o,
    ...y,
    children: [
      a && e.jsx(f, { id: l, className: 'text-lg font-semibold text-text-primary', children: a }),
      t && e.jsx('p', { id: o, className: 'mt-1 text-sm text-text-secondary', children: t }),
      e.jsx('div', { className: a || t ? 'mt-4' : void 0, children: i }),
    ],
  });
}
n.displayName = 'Card';
n.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Card',
  props: {
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    as: {
      required: !1,
      tsType: {
        name: 'union',
        raw: "'article' | 'div'",
        elements: [
          { name: 'literal', value: "'article'" },
          { name: 'literal', value: "'div'" },
        ],
      },
      description: 'Use article for self-contained content, div for grouped UI',
      defaultValue: { value: "'div'", computed: !1 },
    },
    heading: { required: !1, tsType: { name: 'string' }, description: '' },
    headingLevel: {
      required: !1,
      tsType: {
        name: 'union',
        raw: '2 | 3 | 4 | 5 | 6',
        elements: [
          { name: 'literal', value: '2' },
          { name: 'literal', value: '3' },
          { name: 'literal', value: '4' },
          { name: 'literal', value: '5' },
          { name: 'literal', value: '6' },
        ],
      },
      description: '',
      defaultValue: { value: '3', computed: !1 },
    },
    description: { required: !1, tsType: { name: 'string' }, description: '' },
  },
  composes: ['HTMLAttributes'],
};
const q = { title: 'Components/Card', component: n, tags: ['autodocs'] },
  s = {
    args: {
      heading: 'Latest scan results',
      description: 'Completed on 9 June 2026',
      children: e.jsx('p', {
        className: 'text-sm text-text-secondary',
        children: '87% WCAG 2.2 AA compliance',
      }),
    },
    play: async ({ canvasElement: i }) => {
      await A(i);
    },
  },
  r = {
    args: {
      as: 'article',
      heading: 'RPwD Act compliance guide',
      headingLevel: 2,
      children: e.jsx('p', {
        className: 'text-sm',
        children: 'Understanding your legal obligations under Indian law.',
      }),
    },
  };
var d, c, m;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((d = s.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    heading: 'Latest scan results',
    description: 'Completed on 9 June 2026',
    children: <p className="text-sm text-text-secondary">87% WCAG 2.2 AA compliance</p>
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((m = (c = s.parameters) == null ? void 0 : c.docs) == null ? void 0 : m.source),
    },
  },
};
var p, u, g;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((p = r.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    as: 'article',
    heading: 'RPwD Act compliance guide',
    headingLevel: 2,
    children: <p className="text-sm">Understanding your legal obligations under Indian law.</p>
  }
}`,
      ...((g = (u = r.parameters) == null ? void 0 : u.docs) == null ? void 0 : g.source),
    },
  },
};
const D = ['Default', 'Article'];
export { r as Article, s as Default, D as __namedExportsOrder, q as default };
