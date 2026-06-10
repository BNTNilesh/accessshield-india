import { e as h } from './a11y-test-BL_u61FI.js';
import { j as e } from './jsx-runtime-Z5uAzocK.js';
import { c as b } from './cn-D6O4h8v-.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-pP6CS22B.js';
function l({
  value: t,
  min: a = 0,
  max: n = 100,
  label: i = 'Progress',
  showValue: v = !0,
  className: x,
}) {
  const c = Math.min(n, Math.max(a, t)),
    o = Math.round(((c - a) / (n - a)) * 100),
    y = `${o}% complete`;
  return e.jsxs('div', {
    className: b('space-y-2', x),
    children: [
      e.jsxs('div', {
        className: 'flex items-center justify-between text-sm',
        children: [
          e.jsx('span', { className: 'font-medium text-text-secondary', children: i }),
          v &&
            e.jsxs('span', {
              className: 'text-text-tertiary',
              'aria-hidden': 'true',
              children: [o, '%'],
            }),
        ],
      }),
      e.jsx('div', {
        role: 'progressbar',
        'aria-valuenow': c,
        'aria-valuemin': a,
        'aria-valuemax': n,
        'aria-valuetext': y,
        'aria-label': i,
        className: 'h-2 w-full overflow-hidden rounded-full bg-gray-200',
        children: e.jsx('div', {
          className:
            'h-full rounded-full bg-primary transition-all duration-300 motion-reduce:transition-none',
          style: { width: `${o}%` },
          'aria-hidden': 'true',
        }),
      }),
    ],
  });
}
l.displayName = 'Progress';
l.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Progress',
  props: {
    value: { required: !0, tsType: { name: 'number' }, description: '' },
    min: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '0', computed: !1 },
    },
    max: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '100', computed: !1 },
    },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Progress'", computed: !1 },
    },
    showValue: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'true', computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const S = { title: 'Components/Progress', component: l, tags: ['autodocs'] },
  s = {
    args: { value: 65, label: 'Scan progress' },
    play: async ({ canvasElement: t }) => {
      await h(t);
    },
  },
  r = { args: { value: 100, label: 'Scan complete' } };
var u, d, m;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((u = s.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    value: 65,
    label: 'Scan progress'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((m = (d = s.parameters) == null ? void 0 : d.docs) == null ? void 0 : m.source),
    },
  },
};
var p, f, g;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((p = r.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    value: 100,
    label: 'Scan complete'
  }
}`,
      ...((g = (f = r.parameters) == null ? void 0 : f.docs) == null ? void 0 : g.source),
    },
  },
};
const E = ['Default', 'Complete'];
export { r as Complete, s as Default, E as __namedExportsOrder, S as default };
