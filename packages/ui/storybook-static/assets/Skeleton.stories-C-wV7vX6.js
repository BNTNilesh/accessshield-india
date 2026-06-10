import { e as m } from './a11y-test-BL_u61FI.js';
import { j as n } from './jsx-runtime-Z5uAzocK.js';
import { c as i } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-pP6CS22B.js';
function t({ className: a, label: o = 'Loading content', lines: s = 1 }) {
  return n.jsxs('div', {
    role: 'status',
    'aria-label': o,
    'aria-busy': 'true',
    className: i('space-y-2', a),
    children: [
      Array.from({ length: s }).map((p, r) =>
        n.jsx(
          'div',
          {
            'aria-hidden': 'true',
            className: i(
              'h-4 animate-pulse rounded-md bg-gray-200',
              r === s - 1 && s > 1 && 'w-3/4',
            ),
          },
          r,
        ),
      ),
      n.jsx('span', { className: 'sr-only', children: o }),
    ],
  });
}
t.displayName = 'Skeleton';
t.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Skeleton',
  props: {
    className: { required: !1, tsType: { name: 'string' }, description: '' },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: 'Accessible label for the loading container',
      defaultValue: { value: "'Loading content'", computed: !1 },
    },
    lines: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '1', computed: !1 },
    },
  },
};
const N = { title: 'Components/Skeleton', component: t, tags: ['autodocs'] },
  e = {
    args: { lines: 3, label: 'Loading dashboard' },
    play: async ({ canvasElement: a }) => {
      await m(a);
    },
  };
var l, d, c;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((l = e.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  args: {
    lines: 3,
    label: 'Loading dashboard'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((c = (d = e.parameters) == null ? void 0 : d.docs) == null ? void 0 : c.source),
    },
  },
};
const v = ['Default'];
export { e as Default, v as __namedExportsOrder, N as default };
