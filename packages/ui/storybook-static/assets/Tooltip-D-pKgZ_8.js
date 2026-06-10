import { j as u } from './jsx-runtime-Z5uAzocK.js';
import { r as s } from './index-pP6CS22B.js';
import { d as K, b as M, P as W, c as g, a as J, e as Q } from './index-CPotrtYk.js';
import { P as Z, D as ee } from './index-BtmAe-Uy.js';
import { u as te } from './index-DJqjwM60.js';
import { R as oe, A as re, a as ne, c as H, C as se } from './index-BleAQBN-.js';
import { P as S } from './index-B78SPcxA.js';
import { R as ae } from './index-ixmdr1vQ.js';
import { c as ie } from './cn-D6O4h8v-.js';
var [j] = J('Tooltip', [H]),
  D = H(),
  q = 'TooltipProvider',
  le = 700,
  O = 'tooltip.open',
  [ce, N] = j(q),
  G = (t) => {
    const {
        __scopeTooltip: o,
        delayDuration: e = le,
        skipDelayDuration: r = 300,
        disableHoverableContent: n = !1,
        children: i,
      } = t,
      l = s.useRef(!0),
      v = s.useRef(!1),
      a = s.useRef(0);
    return (
      s.useEffect(() => {
        const p = a.current;
        return () => window.clearTimeout(p);
      }, []),
      u.jsx(ce, {
        scope: o,
        isOpenDelayedRef: l,
        delayDuration: e,
        onOpen: s.useCallback(() => {
          r <= 0 || (window.clearTimeout(a.current), (l.current = !1));
        }, [r]),
        onClose: s.useCallback(() => {
          r <= 0 ||
            (window.clearTimeout(a.current),
            (a.current = window.setTimeout(() => (l.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: v,
        onPointerInTransitChange: s.useCallback((p) => {
          v.current = p;
        }, []),
        disableHoverableContent: n,
        children: i,
      })
    );
  };
G.displayName = q;
var E = 'Tooltip',
  [ue, _] = j(E),
  F = (t) => {
    const {
        __scopeTooltip: o,
        children: e,
        open: r,
        defaultOpen: n,
        onOpenChange: i,
        disableHoverableContent: l,
        delayDuration: v,
      } = t,
      a = N(E, t.__scopeTooltip),
      p = D(o),
      [c, d] = s.useState(null),
      m = te(),
      f = s.useRef(0),
      h = l ?? a.disableHoverableContent,
      T = v ?? a.delayDuration,
      x = s.useRef(!1),
      [C, y] = K({
        prop: r,
        defaultProp: n ?? !1,
        onChange: (I) => {
          (I ? (a.onOpen(), document.dispatchEvent(new CustomEvent(O))) : a.onClose(),
            i == null || i(I));
        },
        caller: E,
      }),
      w = s.useMemo(() => (C ? (x.current ? 'delayed-open' : 'instant-open') : 'closed'), [C]),
      P = s.useCallback(() => {
        (window.clearTimeout(f.current), (f.current = 0), (x.current = !1), y(!0));
      }, [y]),
      R = s.useCallback(() => {
        (window.clearTimeout(f.current), (f.current = 0), y(!1));
      }, [y]),
      L = s.useCallback(() => {
        (window.clearTimeout(f.current),
          (f.current = window.setTimeout(() => {
            ((x.current = !0), y(!0), (f.current = 0));
          }, T)));
      }, [T, y]);
    return (
      s.useEffect(
        () => () => {
          f.current && (window.clearTimeout(f.current), (f.current = 0));
        },
        [],
      ),
      u.jsx(oe, {
        ...p,
        children: u.jsx(ue, {
          scope: o,
          contentId: m,
          open: C,
          stateAttribute: w,
          trigger: c,
          onTriggerChange: d,
          onTriggerEnter: s.useCallback(() => {
            a.isOpenDelayedRef.current ? L() : P();
          }, [a.isOpenDelayedRef, L, P]),
          onTriggerLeave: s.useCallback(() => {
            h ? R() : (window.clearTimeout(f.current), (f.current = 0));
          }, [R, h]),
          onOpen: P,
          onClose: R,
          disableHoverableContent: h,
          children: e,
        }),
      })
    );
  };
F.displayName = E;
var A = 'TooltipTrigger',
  V = s.forwardRef((t, o) => {
    const { __scopeTooltip: e, ...r } = t,
      n = _(A, e),
      i = N(A, e),
      l = D(e),
      v = s.useRef(null),
      a = M(o, v, n.onTriggerChange),
      p = s.useRef(!1),
      c = s.useRef(!1),
      d = s.useCallback(() => (p.current = !1), []);
    return (
      s.useEffect(() => () => document.removeEventListener('pointerup', d), [d]),
      u.jsx(re, {
        asChild: !0,
        ...l,
        children: u.jsx(W.button, {
          'aria-describedby': n.open ? n.contentId : void 0,
          'data-state': n.stateAttribute,
          ...r,
          ref: a,
          onPointerMove: g(t.onPointerMove, (m) => {
            m.pointerType !== 'touch' &&
              !c.current &&
              !i.isPointerInTransitRef.current &&
              (n.onTriggerEnter(), (c.current = !0));
          }),
          onPointerLeave: g(t.onPointerLeave, () => {
            (n.onTriggerLeave(), (c.current = !1));
          }),
          onPointerDown: g(t.onPointerDown, () => {
            (n.open && n.onClose(),
              (p.current = !0),
              document.addEventListener('pointerup', d, { once: !0 }));
          }),
          onFocus: g(t.onFocus, () => {
            p.current || n.onOpen();
          }),
          onBlur: g(t.onBlur, n.onClose),
          onClick: g(t.onClick, n.onClose),
        }),
      })
    );
  });
V.displayName = A;
var k = 'TooltipPortal',
  [pe, de] = j(k, { forceMount: void 0 }),
  B = (t) => {
    const { __scopeTooltip: o, forceMount: e, children: r, container: n } = t,
      i = _(k, o);
    return u.jsx(pe, {
      scope: o,
      forceMount: e,
      children: u.jsx(S, {
        present: e || i.open,
        children: u.jsx(Z, { asChild: !0, container: n, children: r }),
      }),
    });
  };
B.displayName = k;
var b = 'TooltipContent',
  U = s.forwardRef((t, o) => {
    const e = de(b, t.__scopeTooltip),
      { forceMount: r = e.forceMount, side: n = 'top', ...i } = t,
      l = _(b, t.__scopeTooltip);
    return u.jsx(S, {
      present: r || l.open,
      children: l.disableHoverableContent
        ? u.jsx(Y, { side: n, ...i, ref: o })
        : u.jsx(fe, { side: n, ...i, ref: o }),
    });
  }),
  fe = s.forwardRef((t, o) => {
    const e = _(b, t.__scopeTooltip),
      r = N(b, t.__scopeTooltip),
      n = s.useRef(null),
      i = M(o, n),
      [l, v] = s.useState(null),
      { trigger: a, onClose: p } = e,
      c = n.current,
      { onPointerInTransitChange: d } = r,
      m = s.useCallback(() => {
        (v(null), d(!1));
      }, [d]),
      f = s.useCallback(
        (h, T) => {
          const x = h.currentTarget,
            C = { x: h.clientX, y: h.clientY },
            y = xe(C, x.getBoundingClientRect()),
            w = Te(C, y),
            P = ye(T.getBoundingClientRect()),
            R = ge([...w, ...P]);
          (v(R), d(!0));
        },
        [d],
      );
    return (
      s.useEffect(() => () => m(), [m]),
      s.useEffect(() => {
        if (a && c) {
          const h = (x) => f(x, c),
            T = (x) => f(x, a);
          return (
            a.addEventListener('pointerleave', h),
            c.addEventListener('pointerleave', T),
            () => {
              (a.removeEventListener('pointerleave', h), c.removeEventListener('pointerleave', T));
            }
          );
        }
      }, [a, c, f, m]),
      s.useEffect(() => {
        if (l) {
          const h = (T) => {
            const x = T.target,
              C = { x: T.clientX, y: T.clientY },
              y = (a == null ? void 0 : a.contains(x)) || (c == null ? void 0 : c.contains(x)),
              w = !Ce(C, l);
            y ? m() : w && (m(), p());
          };
          return (
            document.addEventListener('pointermove', h),
            () => document.removeEventListener('pointermove', h)
          );
        }
      }, [a, c, l, p, m]),
      u.jsx(Y, { ...t, ref: i })
    );
  }),
  [me, ve] = j(E, { isInside: !1 }),
  he = Q('TooltipContent'),
  Y = s.forwardRef((t, o) => {
    const {
        __scopeTooltip: e,
        children: r,
        'aria-label': n,
        onEscapeKeyDown: i,
        onPointerDownOutside: l,
        ...v
      } = t,
      a = _(b, e),
      p = D(e),
      { onClose: c } = a;
    return (
      s.useEffect(
        () => (document.addEventListener(O, c), () => document.removeEventListener(O, c)),
        [c],
      ),
      s.useEffect(() => {
        if (a.trigger) {
          const d = (m) => {
            m.target instanceof Node && m.target.contains(a.trigger) && c();
          };
          return (
            window.addEventListener('scroll', d, { capture: !0 }),
            () => window.removeEventListener('scroll', d, { capture: !0 })
          );
        }
      }, [a.trigger, c]),
      u.jsx(ee, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: l,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: u.jsxs(se, {
          'data-state': a.stateAttribute,
          ...p,
          ...v,
          ref: o,
          style: {
            ...v.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            u.jsx(he, { children: r }),
            u.jsx(me, {
              scope: e,
              isInside: !0,
              children: u.jsx(ae, { id: a.contentId, role: 'tooltip', children: n || r }),
            }),
          ],
        }),
      })
    );
  });
U.displayName = b;
var $ = 'TooltipArrow',
  z = s.forwardRef((t, o) => {
    const { __scopeTooltip: e, ...r } = t,
      n = D(e);
    return ve($, e).isInside ? null : u.jsx(ne, { ...n, ...r, ref: o });
  });
z.displayName = $;
function xe(t, o) {
  const e = Math.abs(o.top - t.y),
    r = Math.abs(o.bottom - t.y),
    n = Math.abs(o.right - t.x),
    i = Math.abs(o.left - t.x);
  switch (Math.min(e, r, n, i)) {
    case i:
      return 'left';
    case n:
      return 'right';
    case e:
      return 'top';
    case r:
      return 'bottom';
    default:
      throw new Error('unreachable');
  }
}
function Te(t, o, e = 5) {
  const r = [];
  switch (o) {
    case 'top':
      r.push({ x: t.x - e, y: t.y + e }, { x: t.x + e, y: t.y + e });
      break;
    case 'bottom':
      r.push({ x: t.x - e, y: t.y - e }, { x: t.x + e, y: t.y - e });
      break;
    case 'left':
      r.push({ x: t.x + e, y: t.y - e }, { x: t.x + e, y: t.y + e });
      break;
    case 'right':
      r.push({ x: t.x - e, y: t.y - e }, { x: t.x - e, y: t.y + e });
      break;
  }
  return r;
}
function ye(t) {
  const { top: o, right: e, bottom: r, left: n } = t;
  return [
    { x: n, y: o },
    { x: e, y: o },
    { x: e, y: r },
    { x: n, y: r },
  ];
}
function Ce(t, o) {
  const { x: e, y: r } = t;
  let n = !1;
  for (let i = 0, l = o.length - 1; i < o.length; l = i++) {
    const v = o[i],
      a = o[l],
      p = v.x,
      c = v.y,
      d = a.x,
      m = a.y;
    c > r != m > r && e < ((d - p) * (r - c)) / (m - c) + p && (n = !n);
  }
  return n;
}
function ge(t) {
  const o = t.slice();
  return (
    o.sort((e, r) => (e.x < r.x ? -1 : e.x > r.x ? 1 : e.y < r.y ? -1 : e.y > r.y ? 1 : 0)),
    be(o)
  );
}
function be(t) {
  if (t.length <= 1) return t.slice();
  const o = [];
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    for (; o.length >= 2; ) {
      const i = o[o.length - 1],
        l = o[o.length - 2];
      if ((i.x - l.x) * (n.y - l.y) >= (i.y - l.y) * (n.x - l.x)) o.pop();
      else break;
    }
    o.push(n);
  }
  o.pop();
  const e = [];
  for (let r = t.length - 1; r >= 0; r--) {
    const n = t[r];
    for (; e.length >= 2; ) {
      const i = e[e.length - 1],
        l = e[e.length - 2];
      if ((i.x - l.x) * (n.y - l.y) >= (i.y - l.y) * (n.x - l.x)) e.pop();
      else break;
    }
    e.push(n);
  }
  return (
    e.pop(),
    o.length === 1 && e.length === 1 && o[0].x === e[0].x && o[0].y === e[0].y ? o : o.concat(e)
  );
}
var we = G,
  Pe = F,
  Re = V,
  Ee = B,
  _e = U,
  je = z;
function De({ children: t }) {
  return u.jsx(we, { delayDuration: 1500, children: t });
}
function X({ content: t, children: o, side: e = 'top', delayDuration: r = 1500, className: n }) {
  return u.jsxs(Pe, {
    delayDuration: r,
    children: [
      u.jsx(Re, { asChild: !0, children: o }),
      u.jsx(Ee, {
        children: u.jsxs(_e, {
          side: e,
          sideOffset: 4,
          className: ie(
            'z-50 max-w-xs rounded-md bg-primary-dark px-3 py-2 text-sm text-white shadow-lg',
            'animate-in fade-in-0 zoom-in-95',
            n,
          ),
          role: 'tooltip',
          children: [t, u.jsx(je, { className: 'fill-primary-dark' })],
        }),
      }),
    ],
  });
}
X.displayName = 'Tooltip';
De.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'TooltipProvider',
  props: { children: { required: !0, tsType: { name: 'ReactNode' }, description: '' } },
};
X.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Tooltip',
  props: {
    content: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    side: {
      required: !1,
      tsType: {
        name: 'union',
        raw: "'top' | 'right' | 'bottom' | 'left'",
        elements: [
          { name: 'literal', value: "'top'" },
          { name: 'literal', value: "'right'" },
          { name: 'literal', value: "'bottom'" },
          { name: 'literal', value: "'left'" },
        ],
      },
      description: '',
      defaultValue: { value: "'top'", computed: !1 },
    },
    delayDuration: {
      required: !1,
      tsType: { name: 'number' },
      description: '',
      defaultValue: { value: '1500', computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
export { X as T, De as a };
