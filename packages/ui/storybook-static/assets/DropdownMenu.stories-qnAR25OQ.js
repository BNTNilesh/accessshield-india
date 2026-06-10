import { j as a } from './jsx-runtime-Z5uAzocK.js';
import { e as Cn } from './a11y-test-BL_u61FI.js';
import { B as Rn } from './Button-1pDptO5G.js';
import { r as s } from './index-pP6CS22B.js';
import {
  a as De,
  b as L,
  c as v,
  i as Se,
  P as N,
  h as bn,
  f as yn,
  d as Ee,
} from './index-CPotrtYk.js';
import { u as Dn, c as Sn } from './index-vWhAg_4k.js';
import { P as En, D as In } from './index-BtmAe-Uy.js';
import { h as Pn, u as Nn, R as Tn, F as jn } from './Combination-C2XPVJK4.js';
import { a as ae, u as H } from './index-DJqjwM60.js';
import { R as Ie, A as An, c as Pe, C as On, a as kn } from './index-BleAQBN-.js';
import { P as z } from './index-B78SPcxA.js';
import { c as Ne, R as Ln, I as Fn } from './index-Lf60WBJ2.js';
import { c as re, f as _e } from './cn-D6O4h8v-.js';
import { b as Gn } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-Csjf2uca.js';
import './index-DLHbBEj9.js';
import './index-B3ghne5W.js';
var oe = ['Enter', ' '],
  Kn = ['ArrowDown', 'PageUp', 'Home'],
  Te = ['ArrowUp', 'PageDown', 'End'],
  Un = [...Kn, ...Te],
  Bn = { ltr: [...oe, 'ArrowRight'], rtl: [...oe, 'ArrowLeft'] },
  $n = { ltr: ['ArrowLeft'], rtl: ['ArrowRight'] },
  F = 'Menu',
  [O, Vn, Xn] = Sn(F),
  [S, je] = De(F, [Xn, Pe, Ne]),
  G = Pe(),
  Ae = Ne(),
  [Oe, y] = S(F),
  [Yn, K] = S(F),
  ke = (e) => {
    const { __scopeMenu: n, open: t = !1, children: r, dir: o, onOpenChange: c, modal: u = !0 } = e,
      d = G(n),
      [f, m] = s.useState(null),
      h = s.useRef(!1),
      i = ae(c),
      p = Dn(o);
    return (
      s.useEffect(() => {
        const g = () => {
            ((h.current = !0),
              document.addEventListener('pointerdown', M, { capture: !0, once: !0 }),
              document.addEventListener('pointermove', M, { capture: !0, once: !0 }));
          },
          M = () => (h.current = !1);
        return (
          document.addEventListener('keydown', g, { capture: !0 }),
          () => {
            (document.removeEventListener('keydown', g, { capture: !0 }),
              document.removeEventListener('pointerdown', M, { capture: !0 }),
              document.removeEventListener('pointermove', M, { capture: !0 }));
          }
        );
      }, []),
      a.jsx(Ie, {
        ...d,
        children: a.jsx(Oe, {
          scope: n,
          open: t,
          onOpenChange: i,
          content: f,
          onContentChange: m,
          children: a.jsx(Yn, {
            scope: n,
            onClose: s.useCallback(() => i(!1), [i]),
            isUsingKeyboardRef: h,
            dir: p,
            modal: u,
            children: r,
          }),
        }),
      })
    );
  };
ke.displayName = F;
var Hn = 'MenuAnchor',
  se = s.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e,
      o = G(t);
    return a.jsx(An, { ...o, ...r, ref: n });
  });
se.displayName = Hn;
var ce = 'MenuPortal',
  [Wn, Le] = S(ce, { forceMount: void 0 }),
  Fe = (e) => {
    const { __scopeMenu: n, forceMount: t, children: r, container: o } = e,
      c = y(ce, n);
    return a.jsx(Wn, {
      scope: n,
      forceMount: t,
      children: a.jsx(z, {
        present: t || c.open,
        children: a.jsx(En, { asChild: !0, container: o, children: r }),
      }),
    });
  };
Fe.displayName = ce;
var _ = 'MenuContent',
  [qn, ie] = S(_),
  Ge = s.forwardRef((e, n) => {
    const t = Le(_, e.__scopeMenu),
      { forceMount: r = t.forceMount, ...o } = e,
      c = y(_, e.__scopeMenu),
      u = K(_, e.__scopeMenu);
    return a.jsx(O.Provider, {
      scope: e.__scopeMenu,
      children: a.jsx(z, {
        present: r || c.open,
        children: a.jsx(O.Slot, {
          scope: e.__scopeMenu,
          children: u.modal ? a.jsx(zn, { ...o, ref: n }) : a.jsx(Zn, { ...o, ref: n }),
        }),
      }),
    });
  }),
  zn = s.forwardRef((e, n) => {
    const t = y(_, e.__scopeMenu),
      r = s.useRef(null),
      o = L(n, r);
    return (
      s.useEffect(() => {
        const c = r.current;
        if (c) return Pn(c);
      }, []),
      a.jsx(ue, {
        ...e,
        ref: o,
        trapFocus: t.open,
        disableOutsidePointerEvents: t.open,
        disableOutsideScroll: !0,
        onFocusOutside: v(e.onFocusOutside, (c) => c.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => t.onOpenChange(!1),
      })
    );
  }),
  Zn = s.forwardRef((e, n) => {
    const t = y(_, e.__scopeMenu);
    return a.jsx(ue, {
      ...e,
      ref: n,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => t.onOpenChange(!1),
    });
  }),
  Jn = yn('MenuContent.ScrollLock'),
  ue = s.forwardRef((e, n) => {
    const {
        __scopeMenu: t,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: c,
        onCloseAutoFocus: u,
        disableOutsidePointerEvents: d,
        onEntryFocus: f,
        onEscapeKeyDown: m,
        onPointerDownOutside: h,
        onFocusOutside: i,
        onInteractOutside: p,
        onDismiss: g,
        disableOutsideScroll: M,
        ...D
      } = e,
      E = y(_, t),
      T = K(_, t),
      U = G(t),
      B = Ae(t),
      he = Vn(t),
      [vn, ve] = s.useState(null),
      $ = s.useRef(null),
      Mn = L(n, $, E.onContentChange),
      V = s.useRef(0),
      X = s.useRef(''),
      gn = s.useRef(0),
      Q = s.useRef(null),
      Me = s.useRef('right'),
      ee = s.useRef(0),
      wn = M ? Tn : s.Fragment,
      xn = M ? { as: Jn, allowPinchZoom: !0 } : void 0,
      _n = (l) => {
        var P, we;
        const x = X.current + l,
          C = he().filter((R) => !R.disabled),
          b = document.activeElement,
          ne = (P = C.find((R) => R.ref.current === b)) == null ? void 0 : P.textValue,
          te = C.map((R) => R.textValue),
          ge = dt(te, x, ne),
          j = (we = C.find((R) => R.textValue === ge)) == null ? void 0 : we.ref.current;
        ((function R(xe) {
          ((X.current = xe),
            window.clearTimeout(V.current),
            xe !== '' && (V.current = window.setTimeout(() => R(''), 1e3)));
        })(x),
          j && setTimeout(() => j.focus()));
      };
    (s.useEffect(() => () => window.clearTimeout(V.current), []), Nn());
    const I = s.useCallback((l) => {
      var C, b;
      return (
        Me.current === ((C = Q.current) == null ? void 0 : C.side) &&
        pt(l, (b = Q.current) == null ? void 0 : b.area)
      );
    }, []);
    return a.jsx(qn, {
      scope: t,
      searchRef: X,
      onItemEnter: s.useCallback(
        (l) => {
          I(l) && l.preventDefault();
        },
        [I],
      ),
      onItemLeave: s.useCallback(
        (l) => {
          var x;
          I(l) || ((x = $.current) == null || x.focus(), ve(null));
        },
        [I],
      ),
      onTriggerLeave: s.useCallback(
        (l) => {
          I(l) && l.preventDefault();
        },
        [I],
      ),
      pointerGraceTimerRef: gn,
      onPointerGraceIntentChange: s.useCallback((l) => {
        Q.current = l;
      }, []),
      children: a.jsx(wn, {
        ...xn,
        children: a.jsx(jn, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: v(c, (l) => {
            var x;
            (l.preventDefault(), (x = $.current) == null || x.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: u,
          children: a.jsx(In, {
            asChild: !0,
            disableOutsidePointerEvents: d,
            onEscapeKeyDown: m,
            onPointerDownOutside: h,
            onFocusOutside: i,
            onInteractOutside: p,
            onDismiss: g,
            children: a.jsx(Ln, {
              asChild: !0,
              ...B,
              dir: T.dir,
              orientation: 'vertical',
              loop: r,
              currentTabStopId: vn,
              onCurrentTabStopIdChange: ve,
              onEntryFocus: v(f, (l) => {
                T.isUsingKeyboardRef.current || l.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: a.jsx(On, {
                role: 'menu',
                'aria-orientation': 'vertical',
                'data-state': tn(E.open),
                'data-radix-menu-content': '',
                dir: T.dir,
                ...U,
                ...D,
                ref: Mn,
                style: { outline: 'none', ...D.style },
                onKeyDown: v(D.onKeyDown, (l) => {
                  const C = l.target.closest('[data-radix-menu-content]') === l.currentTarget,
                    b = l.ctrlKey || l.altKey || l.metaKey,
                    ne = l.key.length === 1;
                  C && (l.key === 'Tab' && l.preventDefault(), !b && ne && _n(l.key));
                  const te = $.current;
                  if (l.target !== te || !Un.includes(l.key)) return;
                  l.preventDefault();
                  const j = he()
                    .filter((P) => !P.disabled)
                    .map((P) => P.ref.current);
                  (Te.includes(l.key) && j.reverse(), it(j));
                }),
                onBlur: v(e.onBlur, (l) => {
                  l.currentTarget.contains(l.target) ||
                    (window.clearTimeout(V.current), (X.current = ''));
                }),
                onPointerMove: v(
                  e.onPointerMove,
                  k((l) => {
                    const x = l.target,
                      C = ee.current !== l.clientX;
                    if (l.currentTarget.contains(x) && C) {
                      const b = l.clientX > ee.current ? 'right' : 'left';
                      ((Me.current = b), (ee.current = l.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
Ge.displayName = _;
var Qn = 'MenuGroup',
  de = s.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return a.jsx(N.div, { role: 'group', ...r, ref: n });
  });
de.displayName = Qn;
var et = 'MenuLabel',
  Ke = s.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return a.jsx(N.div, { ...r, ref: n });
  });
Ke.displayName = et;
var W = 'MenuItem',
  Ce = 'menu.itemSelect',
  Z = s.forwardRef((e, n) => {
    const { disabled: t = !1, onSelect: r, ...o } = e,
      c = s.useRef(null),
      u = K(W, e.__scopeMenu),
      d = ie(W, e.__scopeMenu),
      f = L(n, c),
      m = s.useRef(!1),
      h = () => {
        const i = c.current;
        if (!t && i) {
          const p = new CustomEvent(Ce, { bubbles: !0, cancelable: !0 });
          (i.addEventListener(Ce, (g) => (r == null ? void 0 : r(g)), { once: !0 }),
            bn(i, p),
            p.defaultPrevented ? (m.current = !1) : u.onClose());
        }
      };
    return a.jsx(Ue, {
      ...o,
      ref: f,
      disabled: t,
      onClick: v(e.onClick, h),
      onPointerDown: (i) => {
        var p;
        ((p = e.onPointerDown) == null || p.call(e, i), (m.current = !0));
      },
      onPointerUp: v(e.onPointerUp, (i) => {
        var p;
        m.current || (p = i.currentTarget) == null || p.click();
      }),
      onKeyDown: v(e.onKeyDown, (i) => {
        const p = d.searchRef.current !== '';
        t ||
          (p && i.key === ' ') ||
          (oe.includes(i.key) && (i.currentTarget.click(), i.preventDefault()));
      }),
    });
  });
Z.displayName = W;
var Ue = s.forwardRef((e, n) => {
    const { __scopeMenu: t, disabled: r = !1, textValue: o, ...c } = e,
      u = ie(W, t),
      d = Ae(t),
      f = s.useRef(null),
      m = L(n, f),
      [h, i] = s.useState(!1),
      [p, g] = s.useState('');
    return (
      s.useEffect(() => {
        const M = f.current;
        M && g((M.textContent ?? '').trim());
      }, [c.children]),
      a.jsx(O.ItemSlot, {
        scope: t,
        disabled: r,
        textValue: o ?? p,
        children: a.jsx(Fn, {
          asChild: !0,
          ...d,
          focusable: !r,
          children: a.jsx(N.div, {
            role: 'menuitem',
            'data-highlighted': h ? '' : void 0,
            'aria-disabled': r || void 0,
            'data-disabled': r ? '' : void 0,
            ...c,
            ref: m,
            onPointerMove: v(
              e.onPointerMove,
              k((M) => {
                r
                  ? u.onItemLeave(M)
                  : (u.onItemEnter(M),
                    M.defaultPrevented || M.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: v(
              e.onPointerLeave,
              k((M) => u.onItemLeave(M)),
            ),
            onFocus: v(e.onFocus, () => i(!0)),
            onBlur: v(e.onBlur, () => i(!1)),
          }),
        }),
      })
    );
  }),
  nt = 'MenuCheckboxItem',
  Be = s.forwardRef((e, n) => {
    const { checked: t = !1, onCheckedChange: r, ...o } = e;
    return a.jsx(He, {
      scope: e.__scopeMenu,
      checked: t,
      children: a.jsx(Z, {
        role: 'menuitemcheckbox',
        'aria-checked': q(t) ? 'mixed' : t,
        ...o,
        ref: n,
        'data-state': fe(t),
        onSelect: v(o.onSelect, () => (r == null ? void 0 : r(q(t) ? !0 : !t)), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
Be.displayName = nt;
var $e = 'MenuRadioGroup',
  [tt, rt] = S($e, { value: void 0, onValueChange: () => {} }),
  Ve = s.forwardRef((e, n) => {
    const { value: t, onValueChange: r, ...o } = e,
      c = ae(r);
    return a.jsx(tt, {
      scope: e.__scopeMenu,
      value: t,
      onValueChange: c,
      children: a.jsx(de, { ...o, ref: n }),
    });
  });
Ve.displayName = $e;
var Xe = 'MenuRadioItem',
  Ye = s.forwardRef((e, n) => {
    const { value: t, ...r } = e,
      o = rt(Xe, e.__scopeMenu),
      c = t === o.value;
    return a.jsx(He, {
      scope: e.__scopeMenu,
      checked: c,
      children: a.jsx(Z, {
        role: 'menuitemradio',
        'aria-checked': c,
        ...r,
        ref: n,
        'data-state': fe(c),
        onSelect: v(
          r.onSelect,
          () => {
            var u;
            return (u = o.onValueChange) == null ? void 0 : u.call(o, t);
          },
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
Ye.displayName = Xe;
var le = 'MenuItemIndicator',
  [He, ot] = S(le, { checked: !1 }),
  We = s.forwardRef((e, n) => {
    const { __scopeMenu: t, forceMount: r, ...o } = e,
      c = ot(le, t);
    return a.jsx(z, {
      present: r || q(c.checked) || c.checked === !0,
      children: a.jsx(N.span, { ...o, ref: n, 'data-state': fe(c.checked) }),
    });
  });
We.displayName = le;
var at = 'MenuSeparator',
  qe = s.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return a.jsx(N.div, { role: 'separator', 'aria-orientation': 'horizontal', ...r, ref: n });
  });
qe.displayName = at;
var st = 'MenuArrow',
  ze = s.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e,
      o = G(t);
    return a.jsx(kn, { ...o, ...r, ref: n });
  });
ze.displayName = st;
var pe = 'MenuSub',
  [ct, Ze] = S(pe),
  Je = (e) => {
    const { __scopeMenu: n, children: t, open: r = !1, onOpenChange: o } = e,
      c = y(pe, n),
      u = G(n),
      [d, f] = s.useState(null),
      [m, h] = s.useState(null),
      i = ae(o);
    return (
      s.useEffect(() => (c.open === !1 && i(!1), () => i(!1)), [c.open, i]),
      a.jsx(Ie, {
        ...u,
        children: a.jsx(Oe, {
          scope: n,
          open: r,
          onOpenChange: i,
          content: m,
          onContentChange: h,
          children: a.jsx(ct, {
            scope: n,
            contentId: H(),
            triggerId: H(),
            trigger: d,
            onTriggerChange: f,
            children: t,
          }),
        }),
      })
    );
  };
Je.displayName = pe;
var A = 'MenuSubTrigger',
  Qe = s.forwardRef((e, n) => {
    const t = y(A, e.__scopeMenu),
      r = K(A, e.__scopeMenu),
      o = Ze(A, e.__scopeMenu),
      c = ie(A, e.__scopeMenu),
      u = s.useRef(null),
      { pointerGraceTimerRef: d, onPointerGraceIntentChange: f } = c,
      m = { __scopeMenu: e.__scopeMenu },
      h = s.useCallback(() => {
        (u.current && window.clearTimeout(u.current), (u.current = null));
      }, []);
    return (
      s.useEffect(() => h, [h]),
      s.useEffect(() => {
        const i = d.current;
        return () => {
          (window.clearTimeout(i), f(null));
        };
      }, [d, f]),
      a.jsx(se, {
        asChild: !0,
        ...m,
        children: a.jsx(Ue, {
          id: o.triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': t.open,
          'aria-controls': t.open ? o.contentId : void 0,
          'data-state': tn(t.open),
          ...e,
          ref: Se(n, o.onTriggerChange),
          onClick: (i) => {
            var p;
            ((p = e.onClick) == null || p.call(e, i),
              !(e.disabled || i.defaultPrevented) &&
                (i.currentTarget.focus(), t.open || t.onOpenChange(!0)));
          },
          onPointerMove: v(
            e.onPointerMove,
            k((i) => {
              (c.onItemEnter(i),
                !i.defaultPrevented &&
                  !e.disabled &&
                  !t.open &&
                  !u.current &&
                  (c.onPointerGraceIntentChange(null),
                  (u.current = window.setTimeout(() => {
                    (t.onOpenChange(!0), h());
                  }, 100))));
            }),
          ),
          onPointerLeave: v(
            e.onPointerLeave,
            k((i) => {
              var g, M;
              h();
              const p = (g = t.content) == null ? void 0 : g.getBoundingClientRect();
              if (p) {
                const D = (M = t.content) == null ? void 0 : M.dataset.side,
                  E = D === 'right',
                  T = E ? -5 : 5,
                  U = p[E ? 'left' : 'right'],
                  B = p[E ? 'right' : 'left'];
                (c.onPointerGraceIntentChange({
                  area: [
                    { x: i.clientX + T, y: i.clientY },
                    { x: U, y: p.top },
                    { x: B, y: p.top },
                    { x: B, y: p.bottom },
                    { x: U, y: p.bottom },
                  ],
                  side: D,
                }),
                  window.clearTimeout(d.current),
                  (d.current = window.setTimeout(() => c.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((c.onTriggerLeave(i), i.defaultPrevented)) return;
                c.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: v(e.onKeyDown, (i) => {
            var g;
            const p = c.searchRef.current !== '';
            e.disabled ||
              (p && i.key === ' ') ||
              (Bn[r.dir].includes(i.key) &&
                (t.onOpenChange(!0), (g = t.content) == null || g.focus(), i.preventDefault()));
          }),
        }),
      })
    );
  });
Qe.displayName = A;
var en = 'MenuSubContent',
  nn = s.forwardRef((e, n) => {
    const t = Le(_, e.__scopeMenu),
      { forceMount: r = t.forceMount, align: o = 'start', ...c } = e,
      u = y(_, e.__scopeMenu),
      d = K(_, e.__scopeMenu),
      f = Ze(en, e.__scopeMenu),
      m = s.useRef(null),
      h = L(n, m);
    return a.jsx(O.Provider, {
      scope: e.__scopeMenu,
      children: a.jsx(z, {
        present: r || u.open,
        children: a.jsx(O.Slot, {
          scope: e.__scopeMenu,
          children: a.jsx(ue, {
            id: f.contentId,
            'aria-labelledby': f.triggerId,
            ...c,
            ref: h,
            align: o,
            side: d.dir === 'rtl' ? 'left' : 'right',
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (i) => {
              var p;
              (d.isUsingKeyboardRef.current && ((p = m.current) == null || p.focus()),
                i.preventDefault());
            },
            onCloseAutoFocus: (i) => i.preventDefault(),
            onFocusOutside: v(e.onFocusOutside, (i) => {
              i.target !== f.trigger && u.onOpenChange(!1);
            }),
            onEscapeKeyDown: v(e.onEscapeKeyDown, (i) => {
              (d.onClose(), i.preventDefault());
            }),
            onKeyDown: v(e.onKeyDown, (i) => {
              var M;
              const p = i.currentTarget.contains(i.target),
                g = $n[d.dir].includes(i.key);
              p &&
                g &&
                (u.onOpenChange(!1), (M = f.trigger) == null || M.focus(), i.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
nn.displayName = en;
function tn(e) {
  return e ? 'open' : 'closed';
}
function q(e) {
  return e === 'indeterminate';
}
function fe(e) {
  return q(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
}
function it(e) {
  const n = document.activeElement;
  for (const t of e) if (t === n || (t.focus(), document.activeElement !== n)) return;
}
function ut(e, n) {
  return e.map((t, r) => e[(n + r) % e.length]);
}
function dt(e, n, t) {
  const o = n.length > 1 && Array.from(n).every((m) => m === n[0]) ? n[0] : n,
    c = t ? e.indexOf(t) : -1;
  let u = ut(e, Math.max(c, 0));
  o.length === 1 && (u = u.filter((m) => m !== t));
  const f = u.find((m) => m.toLowerCase().startsWith(o.toLowerCase()));
  return f !== t ? f : void 0;
}
function lt(e, n) {
  const { x: t, y: r } = e;
  let o = !1;
  for (let c = 0, u = n.length - 1; c < n.length; u = c++) {
    const d = n[c],
      f = n[u],
      m = d.x,
      h = d.y,
      i = f.x,
      p = f.y;
    h > r != p > r && t < ((i - m) * (r - h)) / (p - h) + m && (o = !o);
  }
  return o;
}
function pt(e, n) {
  if (!n) return !1;
  const t = { x: e.clientX, y: e.clientY };
  return lt(t, n);
}
function k(e) {
  return (n) => (n.pointerType === 'mouse' ? e(n) : void 0);
}
var ft = ke,
  mt = se,
  ht = Fe,
  vt = Ge,
  Mt = de,
  gt = Ke,
  wt = Z,
  xt = Be,
  _t = Ve,
  Ct = Ye,
  Rt = We,
  bt = qe,
  yt = ze,
  Dt = Je,
  St = Qe,
  Et = nn,
  J = 'DropdownMenu',
  [It] = De(J, [je]),
  w = je(),
  [Pt, rn] = It(J),
  on = (e) => {
    const {
        __scopeDropdownMenu: n,
        children: t,
        dir: r,
        open: o,
        defaultOpen: c,
        onOpenChange: u,
        modal: d = !0,
      } = e,
      f = w(n),
      m = s.useRef(null),
      [h, i] = Ee({ prop: o, defaultProp: c ?? !1, onChange: u, caller: J });
    return a.jsx(Pt, {
      scope: n,
      triggerId: H(),
      triggerRef: m,
      contentId: H(),
      open: h,
      onOpenChange: i,
      onOpenToggle: s.useCallback(() => i((p) => !p), [i]),
      modal: d,
      children: a.jsx(ft, { ...f, open: h, onOpenChange: i, dir: r, modal: d, children: t }),
    });
  };
on.displayName = J;
var an = 'DropdownMenuTrigger',
  sn = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, disabled: r = !1, ...o } = e,
      c = rn(an, t),
      u = w(t);
    return a.jsx(mt, {
      asChild: !0,
      ...u,
      children: a.jsx(N.button, {
        type: 'button',
        id: c.triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': c.open,
        'aria-controls': c.open ? c.contentId : void 0,
        'data-state': c.open ? 'open' : 'closed',
        'data-disabled': r ? '' : void 0,
        disabled: r,
        ...o,
        ref: Se(n, c.triggerRef),
        onPointerDown: v(e.onPointerDown, (d) => {
          !r &&
            d.button === 0 &&
            d.ctrlKey === !1 &&
            (c.onOpenToggle(), c.open || d.preventDefault());
        }),
        onKeyDown: v(e.onKeyDown, (d) => {
          r ||
            (['Enter', ' '].includes(d.key) && c.onOpenToggle(),
            d.key === 'ArrowDown' && c.onOpenChange(!0),
            ['Enter', ' ', 'ArrowDown'].includes(d.key) && d.preventDefault());
        }),
      }),
    });
  });
sn.displayName = an;
var Nt = 'DropdownMenuPortal',
  cn = (e) => {
    const { __scopeDropdownMenu: n, ...t } = e,
      r = w(n);
    return a.jsx(ht, { ...r, ...t });
  };
cn.displayName = Nt;
var un = 'DropdownMenuContent',
  dn = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = rn(un, t),
      c = w(t),
      u = s.useRef(!1);
    return a.jsx(vt, {
      id: o.contentId,
      'aria-labelledby': o.triggerId,
      ...c,
      ...r,
      ref: n,
      onCloseAutoFocus: v(e.onCloseAutoFocus, (d) => {
        var f;
        (u.current || (f = o.triggerRef.current) == null || f.focus(),
          (u.current = !1),
          d.preventDefault());
      }),
      onInteractOutside: v(e.onInteractOutside, (d) => {
        const f = d.detail.originalEvent,
          m = f.button === 0 && f.ctrlKey === !0,
          h = f.button === 2 || m;
        (!o.modal || h) && (u.current = !0);
      }),
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
dn.displayName = un;
var Tt = 'DropdownMenuGroup',
  jt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(Mt, { ...o, ...r, ref: n });
  });
jt.displayName = Tt;
var At = 'DropdownMenuLabel',
  Ot = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(gt, { ...o, ...r, ref: n });
  });
Ot.displayName = At;
var kt = 'DropdownMenuItem',
  ln = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(wt, { ...o, ...r, ref: n });
  });
ln.displayName = kt;
var Lt = 'DropdownMenuCheckboxItem',
  Ft = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(xt, { ...o, ...r, ref: n });
  });
Ft.displayName = Lt;
var Gt = 'DropdownMenuRadioGroup',
  Kt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(_t, { ...o, ...r, ref: n });
  });
Kt.displayName = Gt;
var Ut = 'DropdownMenuRadioItem',
  Bt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(Ct, { ...o, ...r, ref: n });
  });
Bt.displayName = Ut;
var $t = 'DropdownMenuItemIndicator',
  Vt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(Rt, { ...o, ...r, ref: n });
  });
Vt.displayName = $t;
var Xt = 'DropdownMenuSeparator',
  Yt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(bt, { ...o, ...r, ref: n });
  });
Yt.displayName = Xt;
var Ht = 'DropdownMenuArrow',
  Wt = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(yt, { ...o, ...r, ref: n });
  });
Wt.displayName = Ht;
var qt = (e) => {
    const { __scopeDropdownMenu: n, children: t, open: r, onOpenChange: o, defaultOpen: c } = e,
      u = w(n),
      [d, f] = Ee({ prop: r, defaultProp: c ?? !1, onChange: o, caller: 'DropdownMenuSub' });
    return a.jsx(Dt, { ...u, open: d, onOpenChange: f, children: t });
  },
  zt = 'DropdownMenuSubTrigger',
  pn = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(St, { ...o, ...r, ref: n });
  });
pn.displayName = zt;
var Zt = 'DropdownMenuSubContent',
  fn = s.forwardRef((e, n) => {
    const { __scopeDropdownMenu: t, ...r } = e,
      o = w(t);
    return a.jsx(Et, {
      ...o,
      ...r,
      ref: n,
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
fn.displayName = Zt;
var Jt = on,
  Qt = sn,
  mn = cn,
  er = dn,
  nr = ln,
  tr = qt,
  rr = pn,
  or = fn;
function hn({ items: e }) {
  return a.jsx(a.Fragment, {
    children: e.map((n) =>
      n.items
        ? a.jsxs(
            tr,
            {
              children: [
                a.jsxs(rr, {
                  className: re(
                    'flex min-h-11 cursor-pointer select-none items-center justify-between rounded-sm px-3 py-2 text-sm outline-none',
                    'data-[highlighted]:bg-primary-light data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    _e,
                  ),
                  disabled: n.disabled,
                  children: [n.label, a.jsx(Gn, { size: 14, 'aria-hidden': 'true' })],
                }),
                a.jsx(mn, {
                  children: a.jsx(or, {
                    className:
                      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-white p-1 shadow-lg',
                    sideOffset: 2,
                    children: a.jsx(hn, { items: n.items }),
                  }),
                }),
              ],
            },
            n.id,
          )
        : a.jsxs(
            nr,
            {
              disabled: n.disabled,
              onSelect: n.onSelect,
              className: re(
                'relative flex min-h-11 cursor-pointer select-none items-center justify-between rounded-sm px-3 py-2 text-sm outline-none',
                'data-[highlighted]:bg-primary-light data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                n.destructive && 'text-error-700',
                _e,
              ),
              children: [
                n.label,
                n.shortcut &&
                  a.jsx('span', {
                    className: 'ml-auto text-xs text-text-tertiary',
                    'aria-hidden': 'true',
                    children: n.shortcut,
                  }),
              ],
            },
            n.id,
          ),
    ),
  });
}
function me({ trigger: e, items: n, ariaLabel: t = 'Menu', align: r = 'start', className: o }) {
  return a.jsxs(Jt, {
    children: [
      a.jsx(Qt, { asChild: !0, children: e }),
      a.jsx(mn, {
        children: a.jsx(er, {
          align: r,
          sideOffset: 4,
          'aria-label': t,
          className: re(
            'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-white p-1 shadow-lg',
            o,
          ),
          children: a.jsx(hn, { items: n }),
        }),
      }),
    ],
  });
}
me.displayName = 'DropdownMenu';
me.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'DropdownMenu',
  props: {
    trigger: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
    items: {
      required: !0,
      tsType: {
        name: 'Array',
        elements: [{ name: 'DropdownMenuItem' }],
        raw: 'DropdownMenuItem[]',
      },
      description: '',
    },
    ariaLabel: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Menu'", computed: !1 },
    },
    align: {
      required: !1,
      tsType: {
        name: 'union',
        raw: "'start' | 'center' | 'end'",
        elements: [
          { name: 'literal', value: "'start'" },
          { name: 'literal', value: "'center'" },
          { name: 'literal', value: "'end'" },
        ],
      },
      description: '',
      defaultValue: { value: "'start'", computed: !1 },
    },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const yr = { title: 'Components/DropdownMenu', component: me, tags: ['autodocs'] },
  Y = {
    args: {
      trigger: a.jsx(Rn, { variant: 'secondary', children: 'Actions' }),
      items: [
        { id: 'export', label: 'Export report', shortcut: '⌘E' },
        { id: 'share', label: 'Share link' },
        { id: 'delete', label: 'Delete scan', destructive: !0 },
      ],
    },
    play: async ({ canvasElement: e }) => {
      await Cn(e);
    },
  };
var Re, be, ye;
Y.parameters = {
  ...Y.parameters,
  docs: {
    ...((Re = Y.parameters) == null ? void 0 : Re.docs),
    source: {
      originalSource: `{
  args: {
    trigger: <Button variant="secondary">Actions</Button>,
    items: [{
      id: 'export',
      label: 'Export report',
      shortcut: '⌘E'
    }, {
      id: 'share',
      label: 'Share link'
    }, {
      id: 'delete',
      label: 'Delete scan',
      destructive: true
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((ye = (be = Y.parameters) == null ? void 0 : be.docs) == null ? void 0 : ye.source),
    },
  },
};
const Dr = ['Default'];
export { Y as Default, Dr as __namedExportsOrder, yr as default };
