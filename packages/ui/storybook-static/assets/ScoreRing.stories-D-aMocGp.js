import { e as M } from './a11y-test-BL_u61FI.js';
import { j as t } from './jsx-runtime-Z5uAzocK.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-pP6CS22B.js';
function $(r) {
  return r >= 80 ? '#1A6B3C' : r >= 60 ? '#1A56A0' : r >= 40 ? '#E07B00' : '#8B1A1A';
}
function m({
  score: r,
  maxScore: c = 100,
  size: e = 120,
  label: E = 'Accessibility score',
  className: S,
}) {
  const o = (Math.min(c, Math.max(0, r)) / c) * 100,
    i = 10,
    l = (e - i) / 2,
    d = 2 * Math.PI * l,
    j = d - (o / 100) * d,
    u = $(o),
    w = `${E}: ${Math.round(o)} out of ${c}`;
  return t.jsx('div', {
    className: S,
    role: 'img',
    'aria-label': w,
    style: { width: e, height: e },
    children: t.jsxs('svg', {
      width: e,
      height: e,
      viewBox: `0 0 ${e} ${e}`,
      'aria-hidden': 'true',
      children: [
        t.jsx('circle', {
          cx: e / 2,
          cy: e / 2,
          r: l,
          fill: 'none',
          stroke: '#E5E7EB',
          strokeWidth: i,
        }),
        t.jsx('circle', {
          cx: e / 2,
          cy: e / 2,
          r: l,
          fill: 'none',
          stroke: u,
          strokeWidth: i,
          strokeLinecap: 'round',
          strokeDasharray: d,
          strokeDashoffset: j,
          transform: `rotate(-90 ${e / 2} ${e / 2})`,
        }),
        t.jsx('text', {
          x: '50%',
          y: '50%',
          dominantBaseline: 'central',
          textAnchor: 'middle',
          fill: u,
          fontSize: e * 0.22,
          fontWeight: '700',
          fontFamily: 'system-ui, sans-serif',
          children: Math.round(o),
        }),
      ],
    }),
  });
}
m.displayName = 'ScoreRing';
m.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'ScoreRing',
  props: {
    score: { required: !0, tsType: { name: 'number' }, description: '' },
    maxScore: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '100', computed: !1 },
    },
    size: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '120', computed: !1 },
    },
    label: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Accessibility score'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const L = { title: 'Components/ScoreRing', component: m, tags: ['autodocs'] },
  s = {
    args: { score: 87 },
    play: async ({ canvasElement: r }) => {
      await M(r);
    },
  },
  a = { args: { score: 62 } },
  n = { args: { score: 34 } };
var p, f, g;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((p = s.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    score: 87
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((g = (f = s.parameters) == null ? void 0 : f.docs) == null ? void 0 : g.source),
    },
  },
};
var h, y, x;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((h = a.parameters) == null ? void 0 : h.docs),
    source: {
      originalSource: `{
  args: {
    score: 62
  }
}`,
      ...((x = (y = a.parameters) == null ? void 0 : y.docs) == null ? void 0 : x.source),
    },
  },
};
var A, b, v;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((A = n.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    score: 34
  }
}`,
      ...((v = (b = n.parameters) == null ? void 0 : b.docs) == null ? void 0 : v.source),
    },
  },
};
const _ = ['High', 'Medium', 'Low'];
export { s as High, n as Low, a as Medium, _ as __namedExportsOrder, L as default };
