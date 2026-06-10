import { e as d } from './a11y-test-BL_u61FI.js';
import { j as r } from './jsx-runtime-Z5uAzocK.js';
import { c as i, f } from './cn-D6O4h8v-.js';
import { b as x } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-pP6CS22B.js';
function c({ items: a, className: p }) {
  return r.jsx('nav', {
    'aria-label': 'Breadcrumb',
    className: p,
    children: r.jsx('ol', {
      className: 'flex flex-wrap items-center gap-1 text-sm',
      children: a.map((e, n) => {
        const u = n === a.length - 1,
          s = e.current ?? u;
        return r.jsxs(
          'li',
          {
            className: 'inline-flex items-center gap-1',
            children: [
              n > 0 &&
                r.jsx(x, { size: 14, className: 'text-text-tertiary', 'aria-hidden': 'true' }),
              e.href && !s
                ? r.jsx('a', {
                    href: e.href,
                    className: i(
                      'inline-flex min-h-11 items-center text-primary hover:underline',
                      f,
                    ),
                    children: e.label,
                  })
                : r.jsx('span', {
                    'aria-current': s ? 'page' : void 0,
                    className: i(
                      'inline-flex min-h-11 items-center',
                      s ? 'font-medium text-text-primary' : 'text-text-tertiary',
                    ),
                    children: e.label,
                  }),
            ],
          },
          `${e.label}-${n}`,
        );
      }),
    }),
  });
}
c.displayName = 'Breadcrumb';
c.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Breadcrumb',
  props: {
    items: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'BreadcrumbItem' }], raw: 'BreadcrumbItem[]' },
      description: '',
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const S = { title: 'Components/Breadcrumb', component: c, tags: ['autodocs'] },
  t = {
    args: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Scans', href: '/scans' },
        { label: 'Scan #1247', current: !0 },
      ],
    },
    play: async ({ canvasElement: a }) => {
      await d(a);
    },
  };
var l, m, o;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((l = t.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'Scans',
      href: '/scans'
    }, {
      label: 'Scan #1247',
      current: true
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((o = (m = t.parameters) == null ? void 0 : m.docs) == null ? void 0 : o.source),
    },
  },
};
const w = ['Default'];
export { t as Default, w as __namedExportsOrder, S as default };
