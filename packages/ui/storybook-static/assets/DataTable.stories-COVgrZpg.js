import { j as r } from './jsx-runtime-Z5uAzocK.js';
import { r as u } from './index-pP6CS22B.js';
import { e as $ } from './a11y-test-BL_u61FI.js';
import { B as F } from './Badge-LDd1Oote.js';
import { c, f as j } from './cn-D6O4h8v-.js';
import { d as G, e as H, f as J, b as K } from './icons-nm7YP-nX.js';
import { B as k } from './Button-1pDptO5G.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './index-Csjf2uca.js';
function x({
  columns: a,
  data: o,
  getRowId: s,
  selectable: w = !1,
  selectedIds: l = [],
  onSelectionChange: m,
  pageSize: h = 10,
  emptyMessage: _ = 'No data available',
  caption: N,
  className: T,
}) {
  const [i, D] = u.useState(null),
    [n, C] = u.useState('none'),
    [p, S] = u.useState(0),
    L = u.useCallback(
      (e) => {
        i === e
          ? (C((t) =>
              t === 'ascending' ? 'descending' : t === 'descending' ? 'none' : 'ascending',
            ),
            n === 'descending' && D(null))
          : (D(e), C('ascending'));
      },
      [i, n],
    ),
    v = u.useMemo(() => {
      if (!i || n === 'none') return o;
      const e = a.find((d) => d.id === i);
      return e != null && e.sortValue
        ? [...o].sort((d, b) => {
            const q = e.sortValue(d),
              A = e.sortValue(b);
            return q < A ? (n === 'ascending' ? -1 : 1) : q > A ? (n === 'ascending' ? 1 : -1) : 0;
          })
        : o;
    }, [o, i, n, a]),
    R = Math.max(1, Math.ceil(v.length / h)),
    g = v.slice(p * h, (p + 1) * h),
    V = g.length > 0 && g.every((e) => l.includes(s(e))),
    O = () => {
      if (!m) return;
      const e = g.map(s);
      m(V ? l.filter((t) => !e.includes(t)) : [...new Set([...l, ...e])]);
    },
    U = (e) => {
      m && m(l.includes(e) ? l.filter((t) => t !== e) : [...l, e]);
    };
  return o.length === 0
    ? r.jsx('div', {
        role: 'status',
        className: c('rounded-lg border border-border bg-white p-12 text-center', T),
        children: r.jsx('p', { className: 'text-text-secondary', children: _ }),
      })
    : r.jsxs('div', {
        className: c('overflow-hidden rounded-lg border border-border', T),
        children: [
          r.jsx('div', {
            className: 'overflow-x-auto',
            children: r.jsxs('table', {
              className: 'w-full min-w-full border-collapse text-left text-sm',
              children: [
                N && r.jsx('caption', { className: 'sr-only', children: N }),
                r.jsx('thead', {
                  className: 'sticky top-0 z-10 bg-primary-light',
                  children: r.jsxs('tr', {
                    children: [
                      w &&
                        r.jsx('th', {
                          scope: 'col',
                          className: 'w-12 px-4 py-3',
                          children: r.jsx('input', {
                            type: 'checkbox',
                            'aria-label': 'Select all rows on this page',
                            checked: V,
                            onChange: O,
                            className: c('h-4 w-4 rounded border-border', j),
                          }),
                        }),
                      a.map((e) =>
                        r.jsx(
                          'th',
                          {
                            scope: 'col',
                            'aria-sort':
                              i === e.id && n !== 'none' ? n : e.sortable ? 'none' : void 0,
                            className: 'px-4 py-3 font-semibold text-text-primary',
                            children: e.sortable
                              ? r.jsxs('button', {
                                  type: 'button',
                                  onClick: () => L(e.id),
                                  className: c(
                                    'inline-flex min-h-11 items-center gap-1 font-semibold',
                                    j,
                                  ),
                                  children: [
                                    e.header,
                                    i === e.id &&
                                      n === 'ascending' &&
                                      r.jsx(G, { size: 14, 'aria-hidden': 'true' }),
                                    i === e.id &&
                                      n === 'descending' &&
                                      r.jsx(H, { size: 14, 'aria-hidden': 'true' }),
                                  ],
                                })
                              : e.header,
                          },
                          e.id,
                        ),
                      ),
                    ],
                  }),
                }),
                r.jsx('tbody', {
                  children: g.map((e) => {
                    const t = s(e),
                      d = l.includes(t);
                    return r.jsxs(
                      'tr',
                      {
                        className: c('border-t border-border', d && 'bg-primary-light/50'),
                        children: [
                          w &&
                            r.jsx('td', {
                              className: 'px-4 py-3',
                              children: r.jsx('input', {
                                type: 'checkbox',
                                'aria-label': `Select row ${t}`,
                                checked: d,
                                onChange: () => U(t),
                                className: c('h-4 w-4 rounded border-border', j),
                              }),
                            }),
                          a.map((b) =>
                            r.jsx(
                              'td',
                              {
                                className: 'px-4 py-3 text-text-secondary',
                                children: b.accessor(e),
                              },
                              b.id,
                            ),
                          ),
                        ],
                      },
                      t,
                    );
                  }),
                }),
              ],
            }),
          }),
          r.jsxs('nav', {
            'aria-label': 'Table pagination',
            className:
              'flex items-center justify-between border-t border-border bg-white px-4 py-3',
            children: [
              r.jsxs('p', {
                className: 'text-sm text-text-tertiary',
                'aria-live': 'polite',
                children: ['Page ', p + 1, ' of ', R, ' (', v.length, ' rows)'],
              }),
              r.jsxs('div', {
                className: 'flex gap-2',
                children: [
                  r.jsxs(k, {
                    variant: 'secondary',
                    size: 'sm',
                    'aria-label': 'Previous page',
                    disabled: p === 0,
                    disabledReason: 'Already on first page',
                    onClick: () => S((e) => e - 1),
                    children: [r.jsx(J, { size: 16, 'aria-hidden': 'true' }), 'Previous'],
                  }),
                  r.jsxs(k, {
                    variant: 'secondary',
                    size: 'sm',
                    'aria-label': 'Next page',
                    disabled: p >= R - 1,
                    disabledReason: 'Already on last page',
                    onClick: () => S((e) => e + 1),
                    children: ['Next', r.jsx(K, { size: 16, 'aria-hidden': 'true' })],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
}
x.displayName = 'DataTable';
x.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'DataTable',
  props: {
    columns: {
      required: !0,
      tsType: {
        name: 'Array',
        elements: [
          { name: 'DataTableColumn', elements: [{ name: 'T' }], raw: 'DataTableColumn<T>' },
        ],
        raw: 'DataTableColumn<T>[]',
      },
      description: '',
    },
    data: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'T' }], raw: 'T[]' },
      description: '',
    },
    getRowId: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(row: T) => string',
        signature: {
          arguments: [{ type: { name: 'T' }, name: 'row' }],
          return: { name: 'string' },
        },
      },
      description: '',
    },
    selectable: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    selectedIds: {
      required: !1,
      tsType: { name: 'Array', elements: [{ name: 'string' }], raw: 'string[]' },
      description: '',
      defaultValue: { value: '[]', computed: !1 },
    },
    onSelectionChange: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(ids: string[]) => void',
        signature: {
          arguments: [
            {
              type: { name: 'Array', elements: [{ name: 'string' }], raw: 'string[]' },
              name: 'ids',
            },
          ],
          return: { name: 'void' },
        },
      },
      description: '',
    },
    pageSize: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '10', computed: !1 },
    },
    emptyMessage: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'No data available'", computed: !1 },
    },
    caption: { required: !1, tsType: { name: 'string' }, description: '' },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const Q = [
    { id: '1', rule: 'image-alt', severity: 'critical' },
    { id: '2', rule: 'color-contrast', severity: 'serious' },
    { id: '3', rule: 'label', severity: 'moderate' },
  ],
  le = { title: 'Components/DataTable', component: x, tags: ['autodocs'] };
function W() {
  const [a, o] = u.useState([]);
  return r.jsx(x, {
    caption: 'Accessibility issues',
    data: Q,
    getRowId: (s) => s.id,
    selectable: !0,
    selectedIds: a,
    onSelectionChange: o,
    columns: [
      {
        id: 'rule',
        header: 'Rule',
        accessor: (s) => s.rule,
        sortable: !0,
        sortValue: (s) => s.rule,
      },
      {
        id: 'severity',
        header: 'Severity',
        accessor: (s) => r.jsx(F, { severity: s.severity }),
        sortable: !0,
        sortValue: (s) => s.severity,
      },
    ],
  });
}
const f = {
    render: () => r.jsx(W, {}),
    play: async ({ canvasElement: a }) => {
      await $(a);
    },
  },
  y = {
    args: {
      data: [],
      getRowId: (a) => a.id,
      columns: [{ id: 'rule', header: 'Rule', accessor: (a) => a.rule }],
      emptyMessage: 'No issues found — great job!',
    },
  };
var E, z, I;
f.parameters = {
  ...f.parameters,
  docs: {
    ...((E = f.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  render: () => <TableDemo />,
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((I = (z = f.parameters) == null ? void 0 : z.docs) == null ? void 0 : I.source),
    },
  },
};
var M, P, B;
y.parameters = {
  ...y.parameters,
  docs: {
    ...((M = y.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  args: {
    data: [],
    getRowId: (r: Issue) => r.id,
    columns: [{
      id: 'rule',
      header: 'Rule',
      accessor: (r: Issue) => r.rule
    }],
    emptyMessage: 'No issues found — great job!'
  }
}`,
      ...((B = (P = y.parameters) == null ? void 0 : P.docs) == null ? void 0 : B.source),
    },
  },
};
const de = ['Default', 'Empty'];
export { f as Default, y as Empty, de as __namedExportsOrder, le as default };
