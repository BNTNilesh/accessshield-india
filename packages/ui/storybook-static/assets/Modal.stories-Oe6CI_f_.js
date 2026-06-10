import { j as t } from './jsx-runtime-Z5uAzocK.js';
import { r as i } from './index-pP6CS22B.js';
import { e as K } from './a11y-test-BL_u61FI.js';
import { B as C } from './Button-1pDptO5G.js';
import { d as U, P as g, c as m, b as N, a as Y, f as Z, g as J } from './index-CPotrtYk.js';
import { u as R } from './index-DJqjwM60.js';
import { P as Q, D as ee } from './index-BtmAe-Uy.js';
import { R as te, h as oe, u as ne, F as re } from './Combination-C2XPVJK4.js';
import { P as b } from './index-B78SPcxA.js';
import { c as O, f as ae } from './cn-D6O4h8v-.js';
import { X as se } from './icons-nm7YP-nX.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './index-Csjf2uca.js';
import './index-DLHbBEj9.js';
var h = 'Dialog',
  [T] = Y(h),
  [ie, u] = T(h),
  w = (e) => {
    const {
        __scopeDialog: o,
        children: s,
        open: a,
        defaultOpen: r,
        onOpenChange: n,
        modal: l = !0,
      } = e,
      c = i.useRef(null),
      d = i.useRef(null),
      [f, y] = U({ prop: a, defaultProp: r ?? !1, onChange: n, caller: h });
    return t.jsx(ie, {
      scope: o,
      triggerRef: c,
      contentRef: d,
      contentId: R(),
      titleId: R(),
      descriptionId: R(),
      open: f,
      onOpenChange: y,
      onOpenToggle: i.useCallback(() => y((X) => !X), [y]),
      modal: l,
      children: s,
    });
  };
w.displayName = h;
var M = 'DialogTrigger',
  le = i.forwardRef((e, o) => {
    const { __scopeDialog: s, ...a } = e,
      r = u(M, s),
      n = N(o, r.triggerRef);
    return t.jsx(g.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': r.open,
      'aria-controls': r.open ? r.contentId : void 0,
      'data-state': E(r.open),
      ...a,
      ref: n,
      onClick: m(e.onClick, r.onOpenToggle),
    });
  });
le.displayName = M;
var j = 'DialogPortal',
  [ce, F] = T(j, { forceMount: void 0 }),
  S = (e) => {
    const { __scopeDialog: o, forceMount: s, children: a, container: r } = e,
      n = u(j, o);
    return t.jsx(ce, {
      scope: o,
      forceMount: s,
      children: i.Children.map(a, (l) =>
        t.jsx(b, {
          present: s || n.open,
          children: t.jsx(Q, { asChild: !0, container: r, children: l }),
        }),
      ),
    });
  };
S.displayName = j;
var v = 'DialogOverlay',
  W = i.forwardRef((e, o) => {
    const s = F(v, e.__scopeDialog),
      { forceMount: a = s.forceMount, ...r } = e,
      n = u(v, e.__scopeDialog);
    return n.modal
      ? t.jsx(b, { present: a || n.open, children: t.jsx(ue, { ...r, ref: o }) })
      : null;
  });
W.displayName = v;
var de = Z('DialogOverlay.RemoveScroll'),
  ue = i.forwardRef((e, o) => {
    const { __scopeDialog: s, ...a } = e,
      r = u(v, s);
    return t.jsx(te, {
      as: de,
      allowPinchZoom: !0,
      shards: [r.contentRef],
      children: t.jsx(g.div, {
        'data-state': E(r.open),
        ...a,
        ref: o,
        style: { pointerEvents: 'auto', ...a.style },
      }),
    });
  }),
  p = 'DialogContent',
  k = i.forwardRef((e, o) => {
    const s = F(p, e.__scopeDialog),
      { forceMount: a = s.forceMount, ...r } = e,
      n = u(p, e.__scopeDialog);
    return t.jsx(b, {
      present: a || n.open,
      children: n.modal ? t.jsx(fe, { ...r, ref: o }) : t.jsx(pe, { ...r, ref: o }),
    });
  });
k.displayName = p;
var fe = i.forwardRef((e, o) => {
    const s = u(p, e.__scopeDialog),
      a = i.useRef(null),
      r = N(o, s.contentRef, a);
    return (
      i.useEffect(() => {
        const n = a.current;
        if (n) return oe(n);
      }, []),
      t.jsx(G, {
        ...e,
        ref: r,
        trapFocus: s.open,
        disableOutsidePointerEvents: s.open,
        onCloseAutoFocus: m(e.onCloseAutoFocus, (n) => {
          var l;
          (n.preventDefault(), (l = s.triggerRef.current) == null || l.focus());
        }),
        onPointerDownOutside: m(e.onPointerDownOutside, (n) => {
          const l = n.detail.originalEvent,
            c = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || c) && n.preventDefault();
        }),
        onFocusOutside: m(e.onFocusOutside, (n) => n.preventDefault()),
      })
    );
  }),
  pe = i.forwardRef((e, o) => {
    const s = u(p, e.__scopeDialog),
      a = i.useRef(!1),
      r = i.useRef(!1);
    return t.jsx(G, {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (n) => {
        var l, c;
        ((l = e.onCloseAutoFocus) == null || l.call(e, n),
          n.defaultPrevented ||
            (a.current || (c = s.triggerRef.current) == null || c.focus(), n.preventDefault()),
          (a.current = !1),
          (r.current = !1));
      },
      onInteractOutside: (n) => {
        var d, f;
        ((d = e.onInteractOutside) == null || d.call(e, n),
          n.defaultPrevented ||
            ((a.current = !0), n.detail.originalEvent.type === 'pointerdown' && (r.current = !0)));
        const l = n.target;
        (((f = s.triggerRef.current) == null ? void 0 : f.contains(l)) && n.preventDefault(),
          n.detail.originalEvent.type === 'focusin' && r.current && n.preventDefault());
      },
    });
  }),
  G = i.forwardRef((e, o) => {
    const { __scopeDialog: s, trapFocus: a, onOpenAutoFocus: r, onCloseAutoFocus: n, ...l } = e,
      c = u(p, s),
      d = i.useRef(null),
      f = N(o, d);
    return (
      ne(),
      t.jsxs(t.Fragment, {
        children: [
          t.jsx(re, {
            asChild: !0,
            loop: !0,
            trapped: a,
            onMountAutoFocus: r,
            onUnmountAutoFocus: n,
            children: t.jsx(ee, {
              role: 'dialog',
              id: c.contentId,
              'aria-describedby': c.descriptionId,
              'aria-labelledby': c.titleId,
              'data-state': E(c.open),
              ...l,
              ref: f,
              onDismiss: () => c.onOpenChange(!1),
            }),
          }),
          t.jsxs(t.Fragment, {
            children: [
              t.jsx(me, { titleId: c.titleId }),
              t.jsx(xe, { contentRef: d, descriptionId: c.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  _ = 'DialogTitle',
  q = i.forwardRef((e, o) => {
    const { __scopeDialog: s, ...a } = e,
      r = u(_, s);
    return t.jsx(g.h2, { id: r.titleId, ...a, ref: o });
  });
q.displayName = _;
var L = 'DialogDescription',
  $ = i.forwardRef((e, o) => {
    const { __scopeDialog: s, ...a } = e,
      r = u(L, s);
    return t.jsx(g.p, { id: r.descriptionId, ...a, ref: o });
  });
$.displayName = L;
var B = 'DialogClose',
  V = i.forwardRef((e, o) => {
    const { __scopeDialog: s, ...a } = e,
      r = u(B, s);
    return t.jsx(g.button, {
      type: 'button',
      ...a,
      ref: o,
      onClick: m(e.onClick, () => r.onOpenChange(!1)),
    });
  });
V.displayName = B;
function E(e) {
  return e ? 'open' : 'closed';
}
var z = 'DialogTitleWarning',
  [Le, H] = J(z, { contentName: p, titleName: _, docsSlug: 'dialog' }),
  me = ({ titleId: e }) => {
    const o = H(z),
      s = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;
    return (
      i.useEffect(() => {
        e && (document.getElementById(e) || console.error(s));
      }, [s, e]),
      null
    );
  },
  ge = 'DialogDescriptionWarning',
  xe = ({ contentRef: e, descriptionId: o }) => {
    const a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${H(ge).contentName}}.`;
    return (
      i.useEffect(() => {
        var n;
        const r = (n = e.current) == null ? void 0 : n.getAttribute('aria-describedby');
        o && r && (document.getElementById(o) || console.warn(a));
      }, [a, e, o]),
      null
    );
  },
  ve = w,
  he = S,
  De = W,
  ye = k,
  Ce = q,
  Re = $,
  Ne = V;
function D({
  open: e,
  onOpenChange: o,
  title: s,
  description: a,
  children: r,
  hideClose: n = !1,
  className: l,
}) {
  const c = 'modal-title',
    d = 'modal-description';
  return t.jsx(ve, {
    open: e,
    onOpenChange: o,
    children: t.jsxs(he, {
      children: [
        t.jsx(De, {
          className:
            'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out',
        }),
        t.jsxs(ye, {
          className: O(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
            'rounded-lg border border-border bg-white p-6 shadow-xl',
            'max-h-[85vh] overflow-y-auto',
            l,
          ),
          'aria-labelledby': c,
          'aria-describedby': a ? d : void 0,
          onCloseAutoFocus: (f) => f.preventDefault(),
          children: [
            t.jsx(Ce, { id: c, className: 'text-xl font-semibold text-text-primary', children: s }),
            a && t.jsx(Re, { id: d, className: 'mt-2 text-sm text-text-secondary', children: a }),
            t.jsx('div', { className: 'mt-4', children: r }),
            !n &&
              t.jsx(Ne, {
                asChild: !0,
                children: t.jsx('button', {
                  type: 'button',
                  'aria-label': 'Close dialog',
                  className: O(
                    'absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md',
                    'text-text-tertiary hover:text-text-primary',
                    ae,
                  ),
                  children: t.jsx(se, { size: 20, 'aria-hidden': 'true' }),
                }),
              }),
          ],
        }),
      ],
    }),
  });
}
D.displayName = 'Modal';
D.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Modal',
  props: {
    open: { required: !0, tsType: { name: 'boolean' }, description: '' },
    onOpenChange: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(open: boolean) => void',
        signature: {
          arguments: [{ type: { name: 'boolean' }, name: 'open' }],
          return: { name: 'void' },
        },
      },
      description: '',
    },
    title: { required: !0, tsType: { name: 'string' }, description: '' },
    description: { required: !1, tsType: { name: 'string' }, description: '' },
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    hideClose: {
      required: !1,
      tsType: { name: 'boolean' },
      description: 'Hide the default close button',
      defaultValue: { value: 'false', computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const $e = { title: 'Components/Modal', component: D, tags: ['autodocs'] };
function be() {
  const [e, o] = i.useState(!0);
  return t.jsxs(t.Fragment, {
    children: [
      t.jsx(C, { onClick: () => o(!0), children: 'Open modal' }),
      t.jsxs(D, {
        open: e,
        onOpenChange: o,
        title: 'Confirm scan',
        description: 'This will start a full WCAG 2.2 AA scan of your website.',
        children: [
          t.jsx('p', {
            className: 'text-sm text-text-secondary',
            children: 'Estimated duration: 5 minutes',
          }),
          t.jsxs('div', {
            className: 'mt-4 flex gap-2',
            children: [
              t.jsx(C, { onClick: () => o(!1), children: 'Start scan' }),
              t.jsx(C, { variant: 'secondary', onClick: () => o(!1), children: 'Cancel' }),
            ],
          }),
        ],
      }),
    ],
  });
}
const x = {
  render: () => t.jsx(be, {}),
  play: async ({ canvasElement: e }) => {
    await K(e);
  },
};
var I, P, A;
x.parameters = {
  ...x.parameters,
  docs: {
    ...((I = x.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  render: () => <ModalDemo />,
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((A = (P = x.parameters) == null ? void 0 : P.docs) == null ? void 0 : A.source),
    },
  },
};
const Be = ['Default'];
export { x as Default, Be as __namedExportsOrder, $e as default };
