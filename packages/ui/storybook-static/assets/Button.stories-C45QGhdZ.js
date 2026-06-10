import { e as B } from './a11y-test-BL_u61FI.js';
import { B as E } from './Button-1pDptO5G.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './jsx-runtime-Z5uAzocK.js';
import './index-pP6CS22B.js';
import './index-Csjf2uca.js';
import './cn-D6O4h8v-.js';
import './icons-nm7YP-nX.js';
const O = { title: 'Components/Button', component: E, tags: ['autodocs'] },
  r = {
    args: { children: 'Save changes', variant: 'primary' },
    play: async ({ canvasElement: x }) => {
      await B(x);
    },
  },
  e = { args: { children: 'Cancel', variant: 'secondary' } },
  a = { args: { children: 'Learn more', variant: 'ghost' } },
  n = { args: { children: 'Delete', variant: 'danger' } },
  s = { args: { children: 'Submitting', isLoading: !0 } },
  o = {
    args: {
      children: 'Unavailable',
      disabled: !0,
      disabledReason: 'Complete required fields first',
    },
  };
var t, i, c;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((t = r.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Save changes',
    variant: 'primary'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((c = (i = r.parameters) == null ? void 0 : i.docs) == null ? void 0 : c.source),
    },
  },
};
var d, m, p;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((d = e.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Cancel',
    variant: 'secondary'
  }
}`,
      ...((p = (m = e.parameters) == null ? void 0 : m.docs) == null ? void 0 : p.source),
    },
  },
};
var l, g, u;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((l = a.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Learn more',
    variant: 'ghost'
  }
}`,
      ...((u = (g = a.parameters) == null ? void 0 : g.docs) == null ? void 0 : u.source),
    },
  },
};
var h, v, y;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((h = n.parameters) == null ? void 0 : h.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Delete',
    variant: 'danger'
  }
}`,
      ...((y = (v = n.parameters) == null ? void 0 : v.docs) == null ? void 0 : y.source),
    },
  },
};
var S, b, f;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((S = s.parameters) == null ? void 0 : S.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Submitting',
    isLoading: true
  }
}`,
      ...((f = (b = s.parameters) == null ? void 0 : b.docs) == null ? void 0 : f.source),
    },
  },
};
var D, L, C;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((D = o.parameters) == null ? void 0 : D.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Unavailable',
    disabled: true,
    disabledReason: 'Complete required fields first'
  }
}`,
      ...((C = (L = o.parameters) == null ? void 0 : L.docs) == null ? void 0 : C.source),
    },
  },
};
const j = ['Primary', 'Secondary', 'Ghost', 'Danger', 'Loading', 'Disabled'];
export {
  n as Danger,
  o as Disabled,
  a as Ghost,
  s as Loading,
  r as Primary,
  e as Secondary,
  j as __namedExportsOrder,
  O as default,
};
