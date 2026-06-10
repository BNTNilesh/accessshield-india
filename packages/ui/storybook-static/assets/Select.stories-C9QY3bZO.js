import { e as yt } from './a11y-test-BL_u61FI.js';
import { j as t } from './jsx-runtime-Z5uAzocK.js';
import { r as o } from './index-pP6CS22B.js';
import { r as Be } from './index-DLHbBEj9.js';
import { b as $, P as B, c as O, u as X, d as Ee, a as wt, f as bt } from './index-CPotrtYk.js';
import { u as Ct, c as Tt } from './index-vWhAg_4k.js';
import { P as It, D as Nt } from './index-BtmAe-Uy.js';
import { h as Pt, u as jt, R as _t, F as Et } from './Combination-C2XPVJK4.js';
import { u as Ne, a as Rt } from './index-DJqjwM60.js';
import { A as Mt, R as At, c as He, C as Ot, a as Dt } from './index-BleAQBN-.js';
import { P as Lt } from './index-B78SPcxA.js';
import { u as kt } from './index-WyfESzTi.js';
import { V as Bt } from './index-ixmdr1vQ.js';
import { u as Ve } from './useAnnounce-BnCGhg5W.js';
import { c as z, f as me } from './cn-D6O4h8v-.js';
import { e as we, C as Fe, d as Ht, S as Ue } from './icons-nm7YP-nX.js';
import './index-DeN4tkzB.js';
import './axe-RXjNkQw9.js';
import './_commonjsHelpers-Cpj98o6Y.js';
import './index-B3ghne5W.js';
function Re(r, [a, e]) {
  return Math.min(e, Math.max(a, r));
}
var Vt = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  Ft = [' ', 'Enter'],
  re = 'Select',
  [he, xe, Ut] = Tt(re),
  [ne] = wt(re, [Ut, He]),
  ve = He(),
  [qt, Q] = ne(re),
  [Wt, Kt] = ne(re),
  $t = 'SelectProvider';
function qe(r) {
  const {
      __scopeSelect: a,
      children: e,
      open: l,
      defaultOpen: s,
      onOpenChange: m,
      value: i,
      defaultValue: c,
      onValueChange: n,
      dir: p,
      name: S,
      autoComplete: w,
      disabled: b,
      required: y,
      form: C,
      internal_do_not_use_render: d,
    } = r,
    v = ve(a),
    [g, u] = o.useState(null),
    [f, E] = o.useState(null),
    [_, F] = o.useState(!1),
    R = Ct(p),
    [D, M] = Ee({ prop: l, defaultProp: s ?? !1, onChange: m, caller: re }),
    [H, L] = Ee({ prop: i, defaultProp: c, onChange: n, caller: re }),
    h = o.useRef(null),
    P = g ? !!C || !!g.closest('form') : !0,
    [A, V] = o.useState(new Set()),
    q = Ne(),
    G = Array.from(A)
      .map((K) => K.props.value)
      .join(';'),
    Y = o.useCallback((K) => {
      V((ee) => new Set(ee).add(K));
    }, []),
    W = o.useCallback((K) => {
      V((ee) => {
        const ae = new Set(ee);
        return (ae.delete(K), ae);
      });
    }, []),
    se = {
      required: y,
      trigger: g,
      onTriggerChange: u,
      valueNode: f,
      onValueNodeChange: E,
      valueNodeHasChildren: _,
      onValueNodeHasChildrenChange: F,
      contentId: q,
      value: H,
      onValueChange: L,
      open: D,
      onOpenChange: M,
      dir: R,
      triggerPointerDownPosRef: h,
      disabled: b,
      name: S,
      autoComplete: w,
      form: C,
      nativeOptions: A,
      nativeSelectKey: G,
      isFormControl: P,
    };
  return t.jsx(At, {
    ...v,
    children: t.jsx(qt, {
      scope: a,
      ...se,
      children: t.jsx(he.Provider, {
        scope: a,
        children: t.jsx(Wt, {
          scope: a,
          onNativeOptionAdd: Y,
          onNativeOptionRemove: W,
          children: co(d) ? d(se) : e,
        }),
      }),
    }),
  });
}
qe.displayName = $t;
var We = (r) => {
  const { __scopeSelect: a, children: e, ...l } = r;
  return t.jsx(qe, {
    __scopeSelect: a,
    ...l,
    internal_do_not_use_render: ({ isFormControl: s }) =>
      t.jsxs(t.Fragment, { children: [e, s ? t.jsx(xt, { __scopeSelect: a }) : null] }),
  });
};
We.displayName = re;
var Ke = 'SelectTrigger',
  $e = o.forwardRef((r, a) => {
    const { __scopeSelect: e, disabled: l = !1, ...s } = r,
      m = ve(e),
      i = Q(Ke, e),
      c = i.disabled || l,
      n = $(a, i.onTriggerChange),
      p = xe(e),
      S = o.useRef('touch'),
      [w, b, y] = vt((d) => {
        const v = p().filter((f) => !f.disabled),
          g = v.find((f) => f.value === i.value),
          u = gt(v, d, g);
        u !== void 0 && i.onValueChange(u.value);
      }),
      C = (d) => {
        (c || (i.onOpenChange(!0), y()),
          d &&
            (i.triggerPointerDownPosRef.current = {
              x: Math.round(d.pageX),
              y: Math.round(d.pageY),
            }));
      };
    return t.jsx(Mt, {
      asChild: !0,
      ...m,
      children: t.jsx(B.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': i.open ? i.contentId : void 0,
        'aria-expanded': i.open,
        'aria-required': i.required,
        'aria-autocomplete': 'none',
        dir: i.dir,
        'data-state': i.open ? 'open' : 'closed',
        disabled: c,
        'data-disabled': c ? '' : void 0,
        'data-placeholder': je(i.value) ? '' : void 0,
        ...s,
        ref: n,
        onClick: O(s.onClick, (d) => {
          (d.currentTarget.focus(), S.current !== 'mouse' && C(d));
        }),
        onPointerDown: O(s.onPointerDown, (d) => {
          S.current = d.pointerType;
          const v = d.target;
          (v.hasPointerCapture(d.pointerId) && v.releasePointerCapture(d.pointerId),
            d.button === 0 &&
              d.ctrlKey === !1 &&
              d.pointerType === 'mouse' &&
              (C(d), d.preventDefault()));
        }),
        onKeyDown: O(s.onKeyDown, (d) => {
          const v = w.current !== '';
          (!(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && b(d.key),
            !(v && d.key === ' ') && Vt.includes(d.key) && (C(), d.preventDefault()));
        }),
      }),
    });
  });
$e.displayName = Ke;
var ze = 'SelectValue',
  Ge = o.forwardRef((r, a) => {
    const { __scopeSelect: e, className: l, style: s, children: m, placeholder: i = '', ...c } = r,
      n = Q(ze, e),
      { onValueNodeHasChildrenChange: p } = n,
      S = m !== void 0,
      w = $(a, n.onValueNodeChange);
    X(() => {
      p(S);
    }, [p, S]);
    const b = je(n.value);
    return t.jsx(B.span, {
      ...c,
      asChild: b ? !1 : c.asChild,
      ref: w,
      style: { pointerEvents: 'none' },
      children: t.jsx(o.Fragment, { children: b ? i : m }, b ? 'placeholder' : 'value'),
    });
  });
Ge.displayName = ze;
var zt = 'SelectIcon',
  Ye = o.forwardRef((r, a) => {
    const { __scopeSelect: e, children: l, ...s } = r;
    return t.jsx(B.span, { 'aria-hidden': !0, ...s, ref: a, children: l || '▼' });
  });
Ye.displayName = zt;
var Xe = 'SelectPortal',
  [Gt, Yt] = ne(Xe, { forceMount: void 0 }),
  Ze = (r) => {
    const { __scopeSelect: a, forceMount: e, ...l } = r;
    return t.jsx(Gt, {
      scope: r.__scopeSelect,
      forceMount: e,
      children: t.jsx(It, { asChild: !0, ...l }),
    });
  };
Ze.displayName = Xe;
var Z = 'SelectContent',
  Qe = o.forwardRef((r, a) => {
    const e = Yt(Z, r.__scopeSelect),
      { forceMount: l = e.forceMount, ...s } = r,
      m = Q(Z, r.__scopeSelect),
      [i, c] = o.useState();
    return (
      X(() => {
        c(new DocumentFragment());
      }, []),
      t.jsx(Lt, {
        present: l || m.open,
        children: ({ present: n }) =>
          n ? t.jsx(tt, { ...s, ref: a }) : t.jsx(Je, { ...s, fragment: i }),
      })
    );
  });
Qe.displayName = Z;
var Je = o.forwardRef((r, a) => {
  const { __scopeSelect: e, children: l, fragment: s } = r;
  return s
    ? Be.createPortal(
        t.jsx(et, {
          scope: e,
          children: t.jsx(he.Slot, { scope: e, children: t.jsx('div', { ref: a, children: l }) }),
        }),
        s,
      )
    : null;
});
Je.displayName = 'SelectContentFragment';
var U = 10,
  [et, J] = ne(Z),
  Xt = 'SelectContentImpl',
  Zt = bt('SelectContent.RemoveScroll'),
  tt = o.forwardRef((r, a) => {
    const { __scopeSelect: e } = r,
      {
        position: l = 'item-aligned',
        onCloseAutoFocus: s,
        onEscapeKeyDown: m,
        onPointerDownOutside: i,
        side: c,
        sideOffset: n,
        align: p,
        alignOffset: S,
        arrowPadding: w,
        collisionBoundary: b,
        collisionPadding: y,
        sticky: C,
        hideWhenDetached: d,
        avoidCollisions: v,
        ...g
      } = r,
      u = Q(Z, e),
      [f, E] = o.useState(null),
      [_, F] = o.useState(null),
      R = $(a, (x) => E(x)),
      [D, M] = o.useState(null),
      [H, L] = o.useState(null),
      h = xe(e),
      [P, A] = o.useState(!1),
      V = o.useRef(!1);
    (o.useEffect(() => {
      if (f) return Pt(f);
    }, [f]),
      jt());
    const q = o.useCallback(
        (x) => {
          const [j, ...k] = h().map((I) => I.ref.current),
            [N] = k.slice(-1),
            T = document.activeElement;
          for (const I of x)
            if (
              I === T ||
              (I == null || I.scrollIntoView({ block: 'nearest' }),
              I === j && _ && (_.scrollTop = 0),
              I === N && _ && (_.scrollTop = _.scrollHeight),
              I == null || I.focus(),
              document.activeElement !== T)
            )
              return;
        },
        [h, _],
      ),
      G = o.useCallback(() => q([D, f]), [q, D, f]);
    o.useEffect(() => {
      P && G();
    }, [P, G]);
    const { onOpenChange: Y, triggerPointerDownPosRef: W } = u;
    (o.useEffect(() => {
      if (f) {
        let x = { x: 0, y: 0 };
        const j = (N) => {
            var T, I;
            x = {
              x: Math.abs(Math.round(N.pageX) - (((T = W.current) == null ? void 0 : T.x) ?? 0)),
              y: Math.abs(Math.round(N.pageY) - (((I = W.current) == null ? void 0 : I.y) ?? 0)),
            };
          },
          k = (N) => {
            (x.x <= 10 && x.y <= 10 ? N.preventDefault() : N.composedPath().includes(f) || Y(!1),
              document.removeEventListener('pointermove', j),
              (W.current = null));
          };
        return (
          W.current !== null &&
            (document.addEventListener('pointermove', j),
            document.addEventListener('pointerup', k, { capture: !0, once: !0 })),
          () => {
            (document.removeEventListener('pointermove', j),
              document.removeEventListener('pointerup', k, { capture: !0 }));
          }
        );
      }
    }, [f, Y, W]),
      o.useEffect(() => {
        const x = () => Y(!1);
        return (
          window.addEventListener('blur', x),
          window.addEventListener('resize', x),
          () => {
            (window.removeEventListener('blur', x), window.removeEventListener('resize', x));
          }
        );
      }, [Y]));
    const [se, K] = vt((x) => {
        const j = h().filter((T) => !T.disabled),
          k = j.find((T) => T.ref.current === document.activeElement),
          N = gt(j, x, k);
        N && setTimeout(() => N.ref.current.focus());
      }),
      ee = o.useCallback(
        (x, j, k) => {
          const N = !V.current && !k;
          ((u.value !== void 0 && u.value === j) || N) && (M(x), N && (V.current = !0));
        },
        [u.value],
      ),
      ae = o.useCallback(() => (f == null ? void 0 : f.focus()), [f]),
      le = o.useCallback(
        (x, j, k) => {
          const N = !V.current && !k;
          ((u.value !== void 0 && u.value === j) || N) && L(x);
        },
        [u.value],
      ),
      de = l === 'popper' ? be : ot,
      ie =
        de === be
          ? {
              side: c,
              sideOffset: n,
              align: p,
              alignOffset: S,
              arrowPadding: w,
              collisionBoundary: b,
              collisionPadding: y,
              sticky: C,
              hideWhenDetached: d,
              avoidCollisions: v,
            }
          : {};
    return t.jsx(et, {
      scope: e,
      content: f,
      viewport: _,
      onViewportChange: F,
      itemRefCallback: ee,
      selectedItem: D,
      onItemLeave: ae,
      itemTextRefCallback: le,
      focusSelectedItem: G,
      selectedItemText: H,
      position: l,
      isPositioned: P,
      searchRef: se,
      children: t.jsx(_t, {
        as: Zt,
        allowPinchZoom: !0,
        children: t.jsx(Et, {
          asChild: !0,
          trapped: u.open,
          onMountAutoFocus: (x) => {
            x.preventDefault();
          },
          onUnmountAutoFocus: O(s, (x) => {
            var j;
            ((j = u.trigger) == null || j.focus({ preventScroll: !0 }), x.preventDefault());
          }),
          children: t.jsx(Nt, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: m,
            onPointerDownOutside: i,
            onFocusOutside: (x) => x.preventDefault(),
            onDismiss: () => u.onOpenChange(!1),
            children: t.jsx(de, {
              role: 'listbox',
              id: u.contentId,
              'data-state': u.open ? 'open' : 'closed',
              dir: u.dir,
              onContextMenu: (x) => x.preventDefault(),
              ...g,
              ...ie,
              onPlaced: () => A(!0),
              ref: R,
              style: { display: 'flex', flexDirection: 'column', outline: 'none', ...g.style },
              onKeyDown: O(g.onKeyDown, (x) => {
                const j = x.ctrlKey || x.altKey || x.metaKey;
                if (
                  (x.key === 'Tab' && x.preventDefault(),
                  !j && x.key.length === 1 && K(x.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(x.key))
                ) {
                  let N = h()
                    .filter((T) => !T.disabled)
                    .map((T) => T.ref.current);
                  if (
                    (['ArrowUp', 'End'].includes(x.key) && (N = N.slice().reverse()),
                    ['ArrowUp', 'ArrowDown'].includes(x.key))
                  ) {
                    const T = x.target,
                      I = N.indexOf(T);
                    N = N.slice(I + 1);
                  }
                  (setTimeout(() => q(N)), x.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
tt.displayName = Xt;
var Qt = 'SelectItemAlignedPosition',
  ot = o.forwardRef((r, a) => {
    const { __scopeSelect: e, onPlaced: l, ...s } = r,
      m = Q(Z, e),
      i = J(Z, e),
      [c, n] = o.useState(null),
      [p, S] = o.useState(null),
      w = $(a, (R) => S(R)),
      b = xe(e),
      y = o.useRef(!1),
      C = o.useRef(!0),
      { viewport: d, selectedItem: v, selectedItemText: g, focusSelectedItem: u } = i,
      f = o.useCallback(() => {
        if (m.trigger && m.valueNode && c && p && d && v && g) {
          const R = m.trigger.getBoundingClientRect(),
            D = p.getBoundingClientRect(),
            M = m.valueNode.getBoundingClientRect(),
            H = g.getBoundingClientRect();
          if (m.dir !== 'rtl') {
            const T = H.left - D.left,
              I = M.left - T,
              te = R.left - I,
              oe = R.width + te,
              ge = Math.max(oe, D.width),
              Se = window.innerWidth - U,
              ye = Re(I, [U, Math.max(U, Se - ge)]);
            ((c.style.minWidth = oe + 'px'), (c.style.left = ye + 'px'));
          } else {
            const T = D.right - H.right,
              I = window.innerWidth - M.right - T,
              te = window.innerWidth - R.right - I,
              oe = R.width + te,
              ge = Math.max(oe, D.width),
              Se = window.innerWidth - U,
              ye = Re(I, [U, Math.max(U, Se - ge)]);
            ((c.style.minWidth = oe + 'px'), (c.style.right = ye + 'px'));
          }
          const L = b(),
            h = window.innerHeight - U * 2,
            P = d.scrollHeight,
            A = window.getComputedStyle(p),
            V = parseInt(A.borderTopWidth, 10),
            q = parseInt(A.paddingTop, 10),
            G = parseInt(A.borderBottomWidth, 10),
            Y = parseInt(A.paddingBottom, 10),
            W = V + q + P + Y + G,
            se = Math.min(v.offsetHeight * 5, W),
            K = window.getComputedStyle(d),
            ee = parseInt(K.paddingTop, 10),
            ae = parseInt(K.paddingBottom, 10),
            le = R.top + R.height / 2 - U,
            de = h - le,
            ie = v.offsetHeight / 2,
            x = v.offsetTop + ie,
            j = V + q + x,
            k = W - j;
          if (j <= le) {
            const T = L.length > 0 && v === L[L.length - 1].ref.current;
            c.style.bottom = '0px';
            const I = p.clientHeight - d.offsetTop - d.offsetHeight,
              te = Math.max(de, ie + (T ? ae : 0) + I + G),
              oe = j + te;
            c.style.height = oe + 'px';
          } else {
            const T = L.length > 0 && v === L[0].ref.current;
            c.style.top = '0px';
            const te = Math.max(le, V + d.offsetTop + (T ? ee : 0) + ie) + k;
            ((c.style.height = te + 'px'), (d.scrollTop = j - le + d.offsetTop));
          }
          ((c.style.margin = `${U}px 0`),
            (c.style.minHeight = se + 'px'),
            (c.style.maxHeight = h + 'px'),
            l == null || l(),
            requestAnimationFrame(() => (y.current = !0)));
        }
      }, [b, m.trigger, m.valueNode, c, p, d, v, g, m.dir, l]);
    X(() => f(), [f]);
    const [E, _] = o.useState();
    X(() => {
      p && _(window.getComputedStyle(p).zIndex);
    }, [p]);
    const F = o.useCallback(
      (R) => {
        R && C.current === !0 && (f(), u == null || u(), (C.current = !1));
      },
      [f, u],
    );
    return t.jsx(eo, {
      scope: e,
      contentWrapper: c,
      shouldExpandOnScrollRef: y,
      onScrollButtonChange: F,
      children: t.jsx('div', {
        ref: n,
        style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: E },
        children: t.jsx(B.div, {
          ...s,
          ref: w,
          style: { boxSizing: 'border-box', maxHeight: '100%', ...s.style },
        }),
      }),
    });
  });
ot.displayName = Qt;
var Jt = 'SelectPopperPosition',
  be = o.forwardRef((r, a) => {
    const { __scopeSelect: e, align: l = 'start', collisionPadding: s = U, ...m } = r,
      i = ve(e);
    return t.jsx(Ot, {
      ...i,
      ...m,
      ref: a,
      align: l,
      collisionPadding: s,
      style: {
        boxSizing: 'border-box',
        ...m.style,
        '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
be.displayName = Jt;
var [eo, Pe] = ne(Z, {}),
  Ce = 'SelectViewport',
  rt = o.forwardRef((r, a) => {
    const { __scopeSelect: e, nonce: l, ...s } = r,
      m = J(Ce, e),
      i = Pe(Ce, e),
      c = $(a, m.onViewportChange),
      n = o.useRef(0);
    return t.jsxs(t.Fragment, {
      children: [
        t.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: l,
        }),
        t.jsx(he.Slot, {
          scope: e,
          children: t.jsx(B.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...s,
            ref: c,
            style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...s.style },
            onScroll: O(s.onScroll, (p) => {
              const S = p.currentTarget,
                { contentWrapper: w, shouldExpandOnScrollRef: b } = i;
              if (b != null && b.current && w) {
                const y = Math.abs(n.current - S.scrollTop);
                if (y > 0) {
                  const C = window.innerHeight - U * 2,
                    d = parseFloat(w.style.minHeight),
                    v = parseFloat(w.style.height),
                    g = Math.max(d, v);
                  if (g < C) {
                    const u = g + y,
                      f = Math.min(C, u),
                      E = u - f;
                    ((w.style.height = f + 'px'),
                      w.style.bottom === '0px' &&
                        ((S.scrollTop = E > 0 ? E : 0), (w.style.justifyContent = 'flex-end')));
                  }
                }
              }
              n.current = S.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
rt.displayName = Ce;
var nt = 'SelectGroup',
  [to, oo] = ne(nt),
  ro = o.forwardRef((r, a) => {
    const { __scopeSelect: e, ...l } = r,
      s = Ne();
    return t.jsx(to, {
      scope: e,
      id: s,
      children: t.jsx(B.div, { role: 'group', 'aria-labelledby': s, ...l, ref: a }),
    });
  });
ro.displayName = nt;
var st = 'SelectLabel',
  no = o.forwardRef((r, a) => {
    const { __scopeSelect: e, ...l } = r,
      s = oo(st, e);
    return t.jsx(B.div, { id: s.id, ...l, ref: a });
  });
no.displayName = st;
var fe = 'SelectItem',
  [so, at] = ne(fe),
  lt = o.forwardRef((r, a) => {
    const { __scopeSelect: e, value: l, disabled: s = !1, textValue: m, ...i } = r,
      c = Q(fe, e),
      n = J(fe, e),
      p = c.value === l,
      [S, w] = o.useState(m ?? ''),
      [b, y] = o.useState(!1),
      C = $(a, (u) => {
        var f;
        return (f = n.itemRefCallback) == null ? void 0 : f.call(n, u, l, s);
      }),
      d = Ne(),
      v = o.useRef('touch'),
      g = () => {
        s || (c.onValueChange(l), c.onOpenChange(!1));
      };
    if (l === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.',
      );
    return t.jsx(so, {
      scope: e,
      value: l,
      disabled: s,
      textId: d,
      isSelected: p,
      onItemTextChange: o.useCallback((u) => {
        w((f) => f || ((u == null ? void 0 : u.textContent) ?? '').trim());
      }, []),
      children: t.jsx(he.ItemSlot, {
        scope: e,
        value: l,
        disabled: s,
        textValue: S,
        children: t.jsx(B.div, {
          role: 'option',
          'aria-labelledby': d,
          'data-highlighted': b ? '' : void 0,
          'aria-selected': p && b,
          'data-state': p ? 'checked' : 'unchecked',
          'aria-disabled': s || void 0,
          'data-disabled': s ? '' : void 0,
          tabIndex: s ? void 0 : -1,
          ...i,
          ref: C,
          onFocus: O(i.onFocus, () => y(!0)),
          onBlur: O(i.onBlur, () => y(!1)),
          onClick: O(i.onClick, () => {
            v.current !== 'mouse' && g();
          }),
          onPointerUp: O(i.onPointerUp, () => {
            v.current === 'mouse' && g();
          }),
          onPointerDown: O(i.onPointerDown, (u) => {
            v.current = u.pointerType;
          }),
          onPointerMove: O(i.onPointerMove, (u) => {
            var f;
            ((v.current = u.pointerType),
              s
                ? (f = n.onItemLeave) == null || f.call(n)
                : v.current === 'mouse' && u.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: O(i.onPointerLeave, (u) => {
            var f;
            u.currentTarget === document.activeElement &&
              ((f = n.onItemLeave) == null || f.call(n));
          }),
          onKeyDown: O(i.onKeyDown, (u) => {
            var E;
            (((E = n.searchRef) == null ? void 0 : E.current) !== '' && u.key === ' ') ||
              (Ft.includes(u.key) && g(), u.key === ' ' && u.preventDefault());
          }),
        }),
      }),
    });
  });
lt.displayName = fe;
var ce = 'SelectItemText',
  it = o.forwardRef((r, a) => {
    const { __scopeSelect: e, className: l, style: s, ...m } = r,
      i = Q(ce, e),
      c = J(ce, e),
      n = at(ce, e),
      p = Kt(ce, e),
      [S, w] = o.useState(null),
      b = $(
        a,
        (g) => w(g),
        n.onItemTextChange,
        (g) => {
          var u;
          return (u = c.itemTextRefCallback) == null ? void 0 : u.call(c, g, n.value, n.disabled);
        },
      ),
      y = S == null ? void 0 : S.textContent,
      C = o.useMemo(
        () => t.jsx('option', { value: n.value, disabled: n.disabled, children: y }, n.value),
        [n.disabled, n.value, y],
      ),
      { onNativeOptionAdd: d, onNativeOptionRemove: v } = p;
    return (
      X(() => (d(C), () => v(C)), [d, v, C]),
      t.jsxs(t.Fragment, {
        children: [
          t.jsx(B.span, { id: n.textId, ...m, ref: b }),
          n.isSelected && i.valueNode && !i.valueNodeHasChildren
            ? Be.createPortal(m.children, i.valueNode)
            : null,
        ],
      })
    );
  });
it.displayName = ce;
var ct = 'SelectItemIndicator',
  dt = o.forwardRef((r, a) => {
    const { __scopeSelect: e, ...l } = r;
    return at(ct, e).isSelected ? t.jsx(B.span, { 'aria-hidden': !0, ...l, ref: a }) : null;
  });
dt.displayName = ct;
var Te = 'SelectScrollUpButton',
  ut = o.forwardRef((r, a) => {
    const e = J(Te, r.__scopeSelect),
      l = Pe(Te, r.__scopeSelect),
      [s, m] = o.useState(!1),
      i = $(a, l.onScrollButtonChange);
    return (
      X(() => {
        if (e.viewport && e.isPositioned) {
          let c = function () {
            const p = n.scrollTop > 0;
            m(p);
          };
          const n = e.viewport;
          return (c(), n.addEventListener('scroll', c), () => n.removeEventListener('scroll', c));
        }
      }, [e.viewport, e.isPositioned]),
      s
        ? t.jsx(mt, {
            ...r,
            ref: i,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: n } = e;
              c && n && (c.scrollTop = c.scrollTop - n.offsetHeight);
            },
          })
        : null
    );
  });
ut.displayName = Te;
var Ie = 'SelectScrollDownButton',
  pt = o.forwardRef((r, a) => {
    const e = J(Ie, r.__scopeSelect),
      l = Pe(Ie, r.__scopeSelect),
      [s, m] = o.useState(!1),
      i = $(a, l.onScrollButtonChange);
    return (
      X(() => {
        if (e.viewport && e.isPositioned) {
          let c = function () {
            const p = n.scrollHeight - n.clientHeight,
              S = Math.ceil(n.scrollTop) < p;
            m(S);
          };
          const n = e.viewport;
          return (c(), n.addEventListener('scroll', c), () => n.removeEventListener('scroll', c));
        }
      }, [e.viewport, e.isPositioned]),
      s
        ? t.jsx(mt, {
            ...r,
            ref: i,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: n } = e;
              c && n && (c.scrollTop = c.scrollTop + n.offsetHeight);
            },
          })
        : null
    );
  });
pt.displayName = Ie;
var mt = o.forwardRef((r, a) => {
    const { __scopeSelect: e, onAutoScroll: l, ...s } = r,
      m = J('SelectScrollButton', e),
      i = o.useRef(null),
      c = xe(e),
      n = o.useCallback(() => {
        i.current !== null && (window.clearInterval(i.current), (i.current = null));
      }, []);
    return (
      o.useEffect(() => () => n(), [n]),
      X(() => {
        var S;
        const p = c().find((w) => w.ref.current === document.activeElement);
        (S = p == null ? void 0 : p.ref.current) == null || S.scrollIntoView({ block: 'nearest' });
      }, [c]),
      t.jsx(B.div, {
        'aria-hidden': !0,
        ...s,
        ref: a,
        style: { flexShrink: 0, ...s.style },
        onPointerDown: O(s.onPointerDown, () => {
          i.current === null && (i.current = window.setInterval(l, 50));
        }),
        onPointerMove: O(s.onPointerMove, () => {
          var p;
          ((p = m.onItemLeave) == null || p.call(m),
            i.current === null && (i.current = window.setInterval(l, 50)));
        }),
        onPointerLeave: O(s.onPointerLeave, () => {
          n();
        }),
      })
    );
  }),
  ao = 'SelectSeparator',
  lo = o.forwardRef((r, a) => {
    const { __scopeSelect: e, ...l } = r;
    return t.jsx(B.div, { 'aria-hidden': !0, ...l, ref: a });
  });
lo.displayName = ao;
var ft = 'SelectArrow',
  io = o.forwardRef((r, a) => {
    const { __scopeSelect: e, ...l } = r,
      s = ve(e);
    return J(ft, e).position === 'popper' ? t.jsx(Dt, { ...s, ...l, ref: a }) : null;
  });
io.displayName = ft;
var ht = 'SelectBubbleInput',
  xt = o.forwardRef(({ __scopeSelect: r, ...a }, e) => {
    const l = Q(ht, r),
      {
        value: s,
        onValueChange: m,
        required: i,
        disabled: c,
        name: n,
        autoComplete: p,
        form: S,
      } = l,
      { nativeOptions: w, nativeSelectKey: b } = l,
      y = o.useRef(null),
      C = $(e, y),
      d = s ?? '',
      v = kt(d);
    return (
      o.useEffect(() => {
        const g = y.current;
        if (!g) return;
        const u = window.HTMLSelectElement.prototype,
          E = Object.getOwnPropertyDescriptor(u, 'value').set;
        if (v !== d && E) {
          const _ = new Event('change', { bubbles: !0 });
          (E.call(g, d), g.dispatchEvent(_));
        }
      }, [v, d]),
      t.jsxs(
        B.select,
        {
          'aria-hidden': !0,
          required: i,
          tabIndex: -1,
          name: n,
          autoComplete: p,
          disabled: c,
          form: S,
          onChange: (g) => m(g.target.value),
          ...a,
          style: { ...Bt, ...a.style },
          ref: C,
          defaultValue: d,
          children: [je(s) ? t.jsx('option', { value: '' }) : null, Array.from(w)],
        },
        b,
      )
    );
  });
xt.displayName = ht;
function co(r) {
  return typeof r == 'function';
}
function je(r) {
  return r === '' || r === void 0;
}
function vt(r) {
  const a = Rt(r),
    e = o.useRef(''),
    l = o.useRef(0),
    s = o.useCallback(
      (i) => {
        const c = e.current + i;
        (a(c),
          (function n(p) {
            ((e.current = p),
              window.clearTimeout(l.current),
              p !== '' && (l.current = window.setTimeout(() => n(''), 1e3)));
          })(c));
      },
      [a],
    ),
    m = o.useCallback(() => {
      ((e.current = ''), window.clearTimeout(l.current));
    }, []);
  return (o.useEffect(() => () => window.clearTimeout(l.current), []), [e, s, m]);
}
function gt(r, a, e) {
  const s = a.length > 1 && Array.from(a).every((p) => p === a[0]) ? a[0] : a,
    m = e ? r.indexOf(e) : -1;
  let i = uo(r, Math.max(m, 0));
  s.length === 1 && (i = i.filter((p) => p !== e));
  const n = i.find((p) => p.textValue.toLowerCase().startsWith(s.toLowerCase()));
  return n !== e ? n : void 0;
}
function uo(r, a) {
  return r.map((e, l) => r[(a + l) % r.length]);
}
function po({
  label: r,
  options: a,
  values: e = [],
  onValuesChange: l,
  placeholder: s = 'Select options',
  hint: m,
  error: i,
  required: c,
  disabled: n,
  searchable: p = !1,
  id: S,
  className: w,
}) {
  const b = o.useId(),
    y = S ?? b,
    C = `${y}-listbox`,
    { announce: d } = Ve(),
    [v, g] = o.useState(!1),
    [u, f] = o.useState(''),
    [E, _] = o.useState(0),
    F = m ? `${y}-hint` : void 0,
    R = i ? `${y}-error` : void 0,
    D = [F, R].filter(Boolean).join(' ') || void 0,
    M = o.useMemo(() => {
      if (!u) return a;
      const h = u.toLowerCase();
      return a.filter((P) => P.label.toLowerCase().includes(h));
    }, [a, u]),
    H = o.useCallback(
      (h, P) => {
        const A = e.includes(h) ? e.filter((q) => q !== h) : [...e, h];
        l == null || l(A);
        const V = e.includes(h) ? 'deselected' : 'selected';
        d(`${P} ${V}. ${A.length} selected.`);
      },
      [e, l, d],
    ),
    L =
      e.length === 0
        ? s
        : a
            .filter((h) => e.includes(h.value))
            .map((h) => h.label)
            .join(', ');
  return t.jsxs('div', {
    className: z('space-y-1.5', w),
    children: [
      t.jsxs('label', {
        id: `${y}-label`,
        htmlFor: `${y}-trigger`,
        className: 'text-sm font-medium text-text-secondary',
        children: [
          r,
          c &&
            t.jsx('span', {
              'aria-label': 'required',
              className: 'ml-0.5 text-error-700',
              children: '*',
            }),
        ],
      }),
      t.jsxs('div', {
        className: 'relative',
        children: [
          t.jsxs('button', {
            id: `${y}-trigger`,
            type: 'button',
            role: 'combobox',
            'aria-expanded': v,
            'aria-haspopup': 'listbox',
            'aria-controls': C,
            'aria-labelledby': `${y}-label`,
            'aria-describedby': D,
            'aria-required': c || void 0,
            'aria-invalid': i ? !0 : void 0,
            disabled: n,
            onClick: () => g((h) => !h),
            className: z(
              'flex w-full min-h-11 items-center justify-between rounded-md border bg-white px-3 py-2 text-base',
              me,
              i ? 'border-error-700' : 'border-border',
              n && 'cursor-not-allowed opacity-60',
            ),
            children: [
              t.jsx('span', {
                className: e.length === 0 ? 'text-text-tertiary' : 'text-text-primary',
                children: L,
              }),
              t.jsx(we, { size: 16, 'aria-hidden': 'true' }),
            ],
          }),
          v &&
            t.jsxs('div', {
              className:
                'absolute z-50 mt-1 w-full rounded-md border border-border bg-white shadow-lg',
              onKeyDown: (h) => {
                if (h.key === 'Escape') {
                  g(!1);
                  return;
                }
                if (
                  (h.key === 'ArrowDown' &&
                    (h.preventDefault(), _((P) => Math.min(P + 1, M.length - 1))),
                  h.key === 'ArrowUp' && (h.preventDefault(), _((P) => Math.max(P - 1, 0))),
                  h.key === 'Enter' || h.key === ' ')
                ) {
                  h.preventDefault();
                  const P = M[E];
                  P && !P.disabled && H(P.value, P.label);
                }
              },
              children: [
                p &&
                  t.jsx('div', {
                    className: 'border-b border-border p-2',
                    children: t.jsxs('div', {
                      className: 'relative',
                      children: [
                        t.jsx(Ue, {
                          size: 16,
                          className: 'absolute left-2 top-1/2 -translate-y-1/2 text-text-tertiary',
                        }),
                        t.jsx('input', {
                          type: 'search',
                          'aria-label': `Search ${r}`,
                          value: u,
                          onChange: (h) => {
                            (f(h.target.value), _(0));
                          },
                          className: z(
                            'w-full min-h-11 rounded-md border border-border py-2 pl-8 pr-3 text-sm',
                            me,
                          ),
                        }),
                      ],
                    }),
                  }),
                t.jsxs('ul', {
                  id: C,
                  role: 'listbox',
                  'aria-multiselectable': 'true',
                  'aria-labelledby': `${y}-label`,
                  className: 'max-h-60 overflow-auto p-1',
                  children: [
                    M.map((h, P) => {
                      const A = e.includes(h.value);
                      return t.jsxs(
                        'li',
                        {
                          role: 'option',
                          'aria-selected': A,
                          'aria-disabled': h.disabled || void 0,
                          className: z(
                            'flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm',
                            P === E && 'bg-primary-light',
                            h.disabled && 'cursor-not-allowed opacity-50',
                            A && 'font-medium text-primary',
                          ),
                          onClick: () => !h.disabled && H(h.value, h.label),
                          children: [
                            t.jsx('span', {
                              className: z(
                                'flex h-4 w-4 items-center justify-center rounded border',
                                A ? 'border-primary bg-primary text-white' : 'border-border',
                              ),
                              'aria-hidden': 'true',
                              children: A && t.jsx(Fe, { size: 12 }),
                            }),
                            h.label,
                          ],
                        },
                        h.value,
                      );
                    }),
                    M.length === 0 &&
                      t.jsx('li', {
                        className: 'px-3 py-2 text-sm text-text-tertiary',
                        role: 'presentation',
                        children: 'No options found',
                      }),
                  ],
                }),
              ],
            }),
        ],
      }),
      m && !i && t.jsx('p', { id: F, className: 'text-sm text-text-tertiary', children: m }),
      i && t.jsx('p', { id: R, role: 'alert', className: 'text-sm text-error-700', children: i }),
    ],
  });
}
const _e = o.forwardRef(function (
  {
    label: a,
    options: e,
    value: l,
    defaultValue: s,
    onValueChange: m,
    placeholder: i = 'Select an option',
    hint: c,
    error: n,
    required: p,
    disabled: S,
    searchable: w = !1,
    multiple: b = !1,
    values: y,
    onValuesChange: C,
    id: d,
    className: v,
  },
  g,
) {
  const u = o.useId(),
    f = d ?? u,
    { announce: E } = Ve();
  if (b)
    return t.jsx(po, {
      label: a,
      options: e,
      values: y,
      onValuesChange: C,
      placeholder: i,
      hint: c,
      error: n,
      required: p,
      disabled: S,
      searchable: w,
      id: f,
      className: v,
    });
  const _ = c ? `${f}-hint` : void 0,
    F = n ? `${f}-error` : void 0,
    R = [_, F].filter(Boolean).join(' ') || void 0,
    D = (M) => {
      m == null || m(M);
      const H = e.find((L) => L.value === M);
      H && E(`${H.label} selected`);
    };
  return t.jsxs('div', {
    className: z('space-y-1.5', v),
    children: [
      t.jsxs('label', {
        htmlFor: f,
        className: 'text-sm font-medium text-text-secondary',
        children: [
          a,
          p &&
            t.jsx('span', {
              'aria-label': 'required',
              className: 'ml-0.5 text-error-700',
              children: '*',
            }),
        ],
      }),
      t.jsxs(We, {
        value: l,
        defaultValue: s,
        onValueChange: D,
        disabled: S,
        required: p,
        children: [
          t.jsxs($e, {
            id: f,
            'aria-describedby': R,
            'aria-invalid': n ? !0 : void 0,
            className: z(
              'flex w-full min-h-11 items-center justify-between rounded-md border bg-white px-3 py-2 text-base',
              me,
              n ? 'border-error-700' : 'border-border',
              'disabled:cursor-not-allowed disabled:opacity-60',
            ),
            children: [
              t.jsx(Ge, { placeholder: i }),
              t.jsx(Ye, { children: t.jsx(we, { size: 16, 'aria-hidden': 'true' }) }),
            ],
          }),
          t.jsx(Ze, {
            children: t.jsxs(Qe, {
              className: 'z-50 overflow-hidden rounded-md border border-border bg-white shadow-lg',
              position: 'popper',
              sideOffset: 4,
              children: [
                w &&
                  t.jsx('div', {
                    className: 'border-b border-border p-2',
                    children: t.jsx(mo, { options: e, label: a }),
                  }),
                t.jsx(rt, {
                  className: 'max-h-60 overflow-auto p-1',
                  children: e.map((M) =>
                    t.jsxs(
                      lt,
                      {
                        value: M.value,
                        disabled: M.disabled,
                        className: z(
                          'relative flex min-h-11 cursor-pointer select-none items-center rounded-sm px-8 py-2 text-sm outline-none',
                          'data-[highlighted]:bg-primary-light data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                        ),
                        children: [
                          t.jsx('span', {
                            className: 'absolute left-2 flex h-4 w-4 items-center justify-center',
                            children: t.jsx(dt, { children: t.jsx(Fe, { size: 14 }) }),
                          }),
                          t.jsx(it, { children: M.label }),
                        ],
                      },
                      M.value,
                    ),
                  ),
                }),
                t.jsx(ut, {
                  className: 'flex items-center justify-center py-1',
                  children: t.jsx(Ht, { size: 16 }),
                }),
                t.jsx(pt, {
                  className: 'flex items-center justify-center py-1',
                  children: t.jsx(we, { size: 16 }),
                }),
              ],
            }),
          }),
        ],
      }),
      c && !n && t.jsx('p', { id: _, className: 'text-sm text-text-tertiary', children: c }),
      n && t.jsx('p', { id: F, role: 'alert', className: 'text-sm text-error-700', children: n }),
    ],
  });
});
function mo({ options: r, label: a }) {
  const [e, l] = o.useState('');
  return t.jsxs('div', {
    className: 'relative',
    children: [
      t.jsx(Ue, {
        size: 16,
        className: 'absolute left-2 top-1/2 -translate-y-1/2 text-text-tertiary',
      }),
      t.jsx('input', {
        type: 'search',
        'aria-label': `Search ${a}`,
        value: e,
        onChange: (s) => l(s.target.value),
        onKeyDown: (s) => s.stopPropagation(),
        className: z('w-full min-h-11 rounded-md border border-border py-2 pl-8 pr-3 text-sm', me),
      }),
      t.jsx('span', {
        className: 'sr-only',
        'aria-live': 'polite',
        children: e
          ? `${r.filter((s) => s.label.toLowerCase().includes(e.toLowerCase())).length} results`
          : '',
      }),
    ],
  });
}
_e.displayName = 'Select';
_e.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Select',
  props: {
    label: { required: !0, tsType: { name: 'string' }, description: '' },
    options: {
      required: !0,
      tsType: { name: 'Array', elements: [{ name: 'SelectOption' }], raw: 'SelectOption[]' },
      description: '',
    },
    value: { required: !1, tsType: { name: 'string' }, description: '' },
    defaultValue: { required: !1, tsType: { name: 'string' }, description: '' },
    onValueChange: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(value: string) => void',
        signature: {
          arguments: [{ type: { name: 'string' }, name: 'value' }],
          return: { name: 'void' },
        },
      },
      description: '',
    },
    placeholder: {
      required: !1,
      tsType: { name: 'string' },
      description: '',
      defaultValue: { value: "'Select an option'", computed: !1 },
    },
    hint: { required: !1, tsType: { name: 'string' }, description: '' },
    error: { required: !1, tsType: { name: 'string' }, description: '' },
    required: { required: !1, tsType: { name: 'boolean' }, description: '' },
    disabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
    searchable: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    multiple: {
      required: !1,
      tsType: { name: 'boolean' },
      description: '',
      defaultValue: { value: 'false', computed: !1 },
    },
    values: {
      required: !1,
      tsType: { name: 'Array', elements: [{ name: 'string' }], raw: 'string[]' },
      description: '',
    },
    onValuesChange: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '(values: string[]) => void',
        signature: {
          arguments: [
            {
              type: { name: 'Array', elements: [{ name: 'string' }], raw: 'string[]' },
              name: 'values',
            },
          ],
          return: { name: 'void' },
        },
      },
      description: '',
    },
    id: { required: !1, tsType: { name: 'string' }, description: '' },
    className: { required: !1, tsType: { name: 'string' }, description: '' },
  },
};
const St = [
    { value: 'hi', label: 'Hindi' },
    { value: 'en', label: 'English' },
    { value: 'ta', label: 'Tamil' },
    { value: 'te', label: 'Telugu' },
  ],
  Oo = { title: 'Components/Select', component: _e, tags: ['autodocs'] },
  ue = {
    args: { label: 'Language', options: St, placeholder: 'Choose language' },
    play: async ({ canvasElement: r }) => {
      await yt(r);
    },
  },
  pe = { args: { label: 'Languages', options: St, multiple: !0, searchable: !0, values: ['en'] } };
var Me, Ae, Oe;
ue.parameters = {
  ...ue.parameters,
  docs: {
    ...((Me = ue.parameters) == null ? void 0 : Me.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Language',
    options,
    placeholder: 'Choose language'
  },
  play: async ({
    canvasElement
  }) => {
    await expectNoA11yViolations(canvasElement);
  }
}`,
      ...((Oe = (Ae = ue.parameters) == null ? void 0 : Ae.docs) == null ? void 0 : Oe.source),
    },
  },
};
var De, Le, ke;
pe.parameters = {
  ...pe.parameters,
  docs: {
    ...((De = pe.parameters) == null ? void 0 : De.docs),
    source: {
      originalSource: `{
  args: {
    label: 'Languages',
    options,
    multiple: true,
    searchable: true,
    values: ['en']
  }
}`,
      ...((ke = (Le = pe.parameters) == null ? void 0 : Le.docs) == null ? void 0 : ke.source),
    },
  },
};
const Do = ['Single', 'MultiSelect'];
export { pe as MultiSelect, ue as Single, Do as __namedExportsOrder, Oo as default };
