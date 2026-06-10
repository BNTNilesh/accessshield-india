import { j as e } from './jsx-runtime-Z5uAzocK.js';
function s({ size: n = 16, className: i, children: r, ...o }) {
  return e.jsx('svg', {
    width: n,
    height: n,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    className: i,
    ...o,
    children: r,
  });
}
function c(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('circle', { cx: '12', cy: '12', r: '10' }),
      e.jsx('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
      e.jsx('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }),
    ],
  });
}
function t(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('path', {
        d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
      }),
      e.jsx('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      e.jsx('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' }),
    ],
  });
}
function d(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('circle', { cx: '12', cy: '12', r: '10' }),
      e.jsx('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
      e.jsx('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' }),
    ],
  });
}
function p(n) {
  return e.jsx(s, { ...n, children: e.jsx('line', { x1: '5', y1: '12', x2: '19', y2: '12' }) });
}
function x(n) {
  return e.jsx(s, { ...n, children: e.jsx('polyline', { points: '20 6 9 17 4 12' }) });
}
function a(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
      e.jsx('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
    ],
  });
}
function l(n) {
  return e.jsx(s, { ...n, children: e.jsx('polyline', { points: '6 9 12 15 18 9' }) });
}
function y(n) {
  return e.jsx(s, { ...n, children: e.jsx('polyline', { points: '18 15 12 9 6 15' }) });
}
function u(n) {
  return e.jsx(s, { ...n, children: e.jsx('polyline', { points: '15 18 9 12 15 6' }) });
}
function m(n) {
  return e.jsx(s, { ...n, children: e.jsx('polyline', { points: '9 18 15 12 9 6' }) });
}
function h(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
      e.jsx('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
    ],
  });
}
function f(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('circle', { cx: '11', cy: '11', r: '8' }),
      e.jsx('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
    ],
  });
}
function j(n) {
  return e.jsxs(s, {
    ...n,
    children: [
      e.jsx('line', { x1: '12', y1: '2', x2: '12', y2: '6' }),
      e.jsx('line', { x1: '12', y1: '18', x2: '12', y2: '22' }),
      e.jsx('line', { x1: '4.93', y1: '4.93', x2: '7.76', y2: '7.76' }),
      e.jsx('line', { x1: '16.24', y1: '16.24', x2: '19.07', y2: '19.07' }),
      e.jsx('line', { x1: '2', y1: '12', x2: '6', y2: '12' }),
      e.jsx('line', { x1: '18', y1: '12', x2: '22', y2: '12' }),
      e.jsx('line', { x1: '4.93', y1: '19.07', x2: '7.76', y2: '16.24' }),
      e.jsx('line', { x1: '16.24', y1: '7.76', x2: '19.07', y2: '4.93' }),
    ],
  });
}
c.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'AlertCircleIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
t.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'AlertTriangleIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
d.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'InfoIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
p.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'MinusIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
x.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'CheckIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
a.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'XIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
l.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'ChevronDownIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
y.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'ChevronUpIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
u.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'ChevronLeftIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
m.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'ChevronRightIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
h.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'CopyIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
f.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'SearchIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
j.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'LoaderIcon',
  props: { size: { required: !1, tsType: { name: 'number' }, description: '' } },
};
export {
  t as A,
  x as C,
  d as I,
  j as L,
  p as M,
  f as S,
  a as X,
  c as a,
  m as b,
  h as c,
  y as d,
  l as e,
  u as f,
};
