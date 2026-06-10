import { e as y } from './a11y-test-BL_u61FI.js';
import { I as f } from './Input-Bdd7q4c4.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './jsx-runtime-Z5uAzocK.js';
import './index-pP6CS22B.js';
import './cn-D6O4h8v-.js';
const W = { title: 'Components/Input', component: f, tags: ['autodocs'] },
  e = {
    args: { label: 'Email address', hint: 'We will never share your email', type: 'email' },
    play: async ({ canvasElement: b }) => {
      await y(b);
    },
  },
  r = { args: { label: 'Full name', required: !0 } },
  a = { args: { label: 'PAN number', error: 'Invalid PAN format', required: !0 } },
  t = { args: { label: 'Description', showCharCount: !0, maxLength: 200, defaultValue: 'Hello' } };
var o, s, n;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((o = e.parameters) == null ? void 0 : o.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Email address',
    hint: 'We will never share your email',
    type: 'email'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((n = (s = e.parameters) == null ? void 0 : s.docs) == null ? void 0 : n.source),
    },
  },
};
var l, i, m;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((l = r.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Full name',
    required: true
  }
}`,
      ...((m = (i = r.parameters) == null ? void 0 : i.docs) == null ? void 0 : m.source),
    },
  },
};
var u, c, p;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((u = a.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    label: 'PAN number',
    error: 'Invalid PAN format',
    required: true
  }
}`,
      ...((p = (c = a.parameters) == null ? void 0 : c.docs) == null ? void 0 : p.source),
    },
  },
};
var d, h, g;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((d = t.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Description',
    showCharCount: true,
    maxLength: 200,
    defaultValue: 'Hello'
  }
}`,
      ...((g = (h = t.parameters) == null ? void 0 : h.docs) == null ? void 0 : g.source),
    },
  },
};
const I = ['Default', 'Required', 'WithError', 'WithCharCount'];
export {
  e as Default,
  r as Required,
  t as WithCharCount,
  a as WithError,
  I as __namedExportsOrder,
  W as default,
};
