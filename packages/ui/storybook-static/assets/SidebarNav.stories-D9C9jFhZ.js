import { e as h } from './a11y-test-BL_u61FI.js';
import { j as a } from './jsx-runtime-Z5uAzocK.js';
import { r as x } from './index-pP6CS22B.js';
import { c as t, f as l } from './cn-D6O4h8v-.js';
import { b as y, f as g } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
function i({
  items: n,
  label: p = 'Main navigation',
  collapsible: m = !0,
  defaultCollapsed: u = !1,
  className: f,
}) {
  const [s, b] = x.useState(u);
  return a.jsxs('nav', {
    'aria-label': p,
    className: t('flex flex-col', f),
    children: [
      m &&
        a.jsx('button', {
          type: 'button',
          onClick: () => b((e) => !e),
          'aria-expanded': !s,
          'aria-controls': 'sidebar-nav-list',
          'aria-label': s ? 'Expand sidebar' : 'Collapse sidebar',
          className: t(
            'mb-4 inline-flex min-h-11 min-w-11 items-center justify-center self-end rounded-md',
            'text-text-tertiary hover:bg-primary-light hover:text-primary',
            l,
          ),
          children: s
            ? a.jsx(y, { size: 20, 'aria-hidden': 'true' })
            : a.jsx(g, { size: 20, 'aria-hidden': 'true' }),
        }),
      a.jsx('ul', {
        id: 'sidebar-nav-list',
        className: 'space-y-1',
        children: n.map((e) =>
          a.jsx(
            'li',
            {
              children: a.jsxs('a', {
                href: e.href,
                'aria-current': e.current ? 'page' : void 0,
                className: t(
                  'flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  e.current
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary',
                  l,
                  s && 'justify-center px-2',
                ),
                children: [
                  e.icon && a.jsx('span', { 'aria-hidden': 'true', children: e.icon }),
                  !s && a.jsx('span', { children: e.label }),
                  s && a.jsx('span', { className: 'sr-only', children: e.label }),
                ],
              }),
            },
            e.id,
          ),
        ),
      }),
    ],
  });
}
i.displayName = 'SidebarNav';
i.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'SidebarNav',
  props: {
    items: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'SidebarNavItem' }], raw: 'SidebarNavItem[]' },
      description: '',
    },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Main navigation'", computed: !1 },
    },
    collapsible: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'true', computed: !1 },
    },
    defaultCollapsed: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const R = { title: 'Components/SidebarNav', component: i, tags: ['autodocs'] },
  r = {
    args: {
      items: [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard', current: !0 },
        { id: 'scans', label: 'Scans', href: '/scans' },
        { id: 'issues', label: 'Issues', href: '/issues' },
        { id: 'reports', label: 'Reports', href: '/reports' },
        { id: 'settings', label: 'Settings', href: '/settings' },
      ],
    },
    play: async ({ canvasElement: n }) => {
      await h(n);
    },
  };
var o, d, c;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((o = r.parameters) == null ? void 0 : o.docs),
    source: {
      originalSource: `{
  args: {
    items: [{
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      current: true
    }, {
      id: 'scans',
      label: 'Scans',
      href: '/scans'
    }, {
      id: 'issues',
      label: 'Issues',
      href: '/issues'
    }, {
      id: 'reports',
      label: 'Reports',
      href: '/reports'
    }, {
      id: 'settings',
      label: 'Settings',
      href: '/settings'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((c = (d = r.parameters) == null ? void 0 : d.docs) == null ? void 0 : c.source),
    },
  },
};
const T = ['Default'];
export { r as Default, T as __namedExportsOrder, R as default };
