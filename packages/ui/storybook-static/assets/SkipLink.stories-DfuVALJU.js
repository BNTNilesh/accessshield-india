import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { e as p } from './a11y-test-BL_u61FI.js';
import { c as m, f as l } from './cn-D6O4h8v-.js';
import './index-pP6CS22B.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
function t({ href: s = '#main-content', label: c = 'Skip to main content', className: r }) {
  return e.jsx('a', {
    href: s,
    className: m(
      'sr-only focus:not-sr-only',
      'focus:absolute focus:left-4 focus:top-4 focus:z-50',
      'focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg',
      l,
      r,
    ),
    children: c,
  });
}
t.displayName = 'SkipLink';
t.__docgenInfo = {
  description: 'WCAG 2.4.1 Bypass Blocks — skip navigation link',
  methods: [],
  displayName: 'SkipLink',
  props: {
    href: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'#main-content'", computed: !1 },
    },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Skip to main content'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const g = { title: 'Components/SkipLink', component: t, tags: ['autodocs'] },
  n = {
    render: () =>
      e.jsxs(e.Fragment, {
        children: [
          e.jsx(t, {}),
          e.jsxs('main', {
            id: 'main-content',
            className: 'mt-4 p-4',
            children: [
              e.jsx('h1', { children: 'Page content' }),
              e.jsx('p', { children: 'Tab to the skip link to test focus visibility.' }),
            ],
          }),
        ],
      }),
    play: async ({ canvasElement: s }) => {
      await p(s);
    },
  };
var a, o, i;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((a = n.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  render: () => <>
      <SkipLink />
      <main id="main-content" className="mt-4 p-4">
        <h1>Page content</h1>
        <p>Tab to the skip link to test focus visibility.</p>
      </main>
    </>,
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((i = (o = n.parameters) == null ? void 0 : o.docs) == null ? void 0 : i.source),
    },
  },
};
const j = ['Default'];
export { n as Default, j as __namedExportsOrder, g as default };
