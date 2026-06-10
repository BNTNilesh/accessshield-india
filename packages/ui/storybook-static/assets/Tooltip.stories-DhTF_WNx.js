import { j as t } from './jsx-runtime-Z5uAzocK.js';
import { e as p } from './a11y-test-BL_u61FI.js';
import { B as m } from './Button-1pDptO5G.js';
import { T as a } from './Tooltip-D-pKgZ_8.js';
import './index-pP6CS22B.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './index-Csjf2uca.js';
import './cn-D6O4h8v-.js';
import './icons-nm7YP-nX.js';
import './index-CPotrtYk.js';
import './index-DLHbBEj9.js';
import './index-BtmAe-Uy.js';
import './index-DJqjwM60.js';
import './index-BleAQBN-.js';
import './index-B3ghne5W.js';
import './index-B78SPcxA.js';
import './index-ixmdr1vQ.js';
const G = { title: 'Components/Tooltip', component: a, tags: ['autodocs'] },
  o = {
    render: () =>
      t.jsx(a, {
        content: 'WCAG 2.2 AA compliance score',
        children: t.jsx(m, { variant: 'ghost', children: 'Hover for info' }),
      }),
    play: async ({ canvasElement: i }) => {
      await p(i);
    },
  };
var r, e, n;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((r = o.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `{
  render: () => <Tooltip content="WCAG 2.2 AA compliance score">
      <Button variant="ghost">Hover for info</Button>
    </Tooltip>,
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((n = (e = o.parameters) == null ? void 0 : e.docs) == null ? void 0 : n.source),
    },
  },
};
const H = ['Default'];
export { o as Default, H as __namedExportsOrder, G as default };
