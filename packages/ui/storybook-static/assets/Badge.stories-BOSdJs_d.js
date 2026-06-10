import { e as A } from './a11y-test-BL_u61FI.js';
import { B as M } from './Badge-LDd1Oote.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './jsx-runtime-Z5uAzocK.js';
import './index-pP6CS22B.js';
import './index-Csjf2uca.js';
import './cn-D6O4h8v-.js';
import './icons-nm7YP-nX.js';
const O = { title: 'Components/Badge', component: M, tags: ['autodocs'] },
  r = {
    args: { severity: 'critical' },
    play: async ({ canvasElement: x }) => {
      await A(x);
    },
  },
  e = { args: { severity: 'serious' } },
  a = { args: { severity: 'moderate' } },
  s = { args: { severity: 'minor' } },
  o = { args: { variant: 'default', label: 'WCAG 2.2' } };
var t, n, i;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((t = r.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `{
  args: {
    severity: 'critical'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((i = (n = r.parameters) == null ? void 0 : n.docs) == null ? void 0 : i.source),
    },
  },
};
var c, m, p;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((c = e.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    severity: 'serious'
  }
}`,
      ...((p = (m = e.parameters) == null ? void 0 : m.docs) == null ? void 0 : p.source),
    },
  },
};
var d, l, u;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((d = a.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    severity: 'moderate'
  }
}`,
      ...((u = (l = a.parameters) == null ? void 0 : l.docs) == null ? void 0 : u.source),
    },
  },
};
var g, y, v;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    severity: 'minor'
  }
}`,
      ...((v = (y = s.parameters) == null ? void 0 : y.docs) == null ? void 0 : v.source),
    },
  },
};
var f, S, C;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((f = o.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    variant: 'default',
    label: 'WCAG 2.2'
  }
}`,
      ...((C = (S = o.parameters) == null ? void 0 : S.docs) == null ? void 0 : C.source),
    },
  },
};
const h = ['Critical', 'Serious', 'Moderate', 'Minor', 'Default'];
export {
  r as Critical,
  o as Default,
  s as Minor,
  a as Moderate,
  e as Serious,
  h as __namedExportsOrder,
  O as default,
};
