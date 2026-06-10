import { r as C } from './index-pP6CS22B.js';
import { r as Le } from './index-DLHbBEj9.js';
import { P as Ot, b as te, a as Me, u as xt } from './index-CPotrtYk.js';
import { j as X } from './jsx-runtime-Z5uAzocK.js';
import { a as Te } from './index-DJqjwM60.js';
import { u as $e } from './index-B3ghne5W.js';
const ke = ['top', 'right', 'bottom', 'left'],
  K = Math.min,
  W = Math.max,
  ft = Math.round,
  lt = Math.floor,
  z = (t) => ({ x: t, y: t }),
  Ne = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function At(t, e, n) {
  return W(t, K(e, n));
}
function Y(t, e) {
  return typeof t == 'function' ? t(e) : t;
}
function q(t) {
  return t.split('-')[0];
}
function et(t) {
  return t.split('-')[1];
}
function Pt(t) {
  return t === 'x' ? 'y' : 'x';
}
function St(t) {
  return t === 'y' ? 'height' : 'width';
}
function V(t) {
  const e = t[0];
  return e === 't' || e === 'b' ? 'y' : 'x';
}
function Et(t) {
  return Pt(V(t));
}
function Fe(t, e, n) {
  n === void 0 && (n = !1);
  const o = et(t),
    r = Et(t),
    i = St(r);
  let s =
    r === 'x' ? (o === (n ? 'end' : 'start') ? 'right' : 'left') : o === 'start' ? 'bottom' : 'top';
  return (e.reference[i] > e.floating[i] && (s = ut(s)), [s, ut(s)]);
}
function We(t) {
  const e = ut(t);
  return [Rt(t), e, Rt(e)];
}
function Rt(t) {
  return t.includes('start') ? t.replace('start', 'end') : t.replace('end', 'start');
}
const zt = ['left', 'right'],
  It = ['right', 'left'],
  _e = ['top', 'bottom'],
  He = ['bottom', 'top'];
function Be(t, e, n) {
  switch (t) {
    case 'top':
    case 'bottom':
      return n ? (e ? It : zt) : e ? zt : It;
    case 'left':
    case 'right':
      return e ? _e : He;
    default:
      return [];
  }
}
function je(t, e, n, o) {
  const r = et(t);
  let i = Be(q(t), n === 'start', o);
  return (r && ((i = i.map((s) => s + '-' + r)), e && (i = i.concat(i.map(Rt)))), i);
}
function ut(t) {
  const e = q(t);
  return Ne[e] + t.slice(e.length);
}
function Ve(t) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...t };
}
function ee(t) {
  return typeof t != 'number' ? Ve(t) : { top: t, right: t, bottom: t, left: t };
}
function dt(t) {
  const { x: e, y: n, width: o, height: r } = t;
  return { width: o, height: r, top: n, left: e, right: e + o, bottom: n + r, x: e, y: n };
}
function Xt(t, e, n) {
  let { reference: o, floating: r } = t;
  const i = V(e),
    s = Et(e),
    c = St(s),
    f = q(e),
    d = i === 'y',
    l = o.x + o.width / 2 - r.width / 2,
    a = o.y + o.height / 2 - r.height / 2,
    p = o[c] / 2 - r[c] / 2;
  let u;
  switch (f) {
    case 'top':
      u = { x: l, y: o.y - r.height };
      break;
    case 'bottom':
      u = { x: l, y: o.y + o.height };
      break;
    case 'right':
      u = { x: o.x + o.width, y: a };
      break;
    case 'left':
      u = { x: o.x - r.width, y: a };
      break;
    default:
      u = { x: o.x, y: o.y };
  }
  switch (et(e)) {
    case 'start':
      u[s] -= p * (n && d ? -1 : 1);
      break;
    case 'end':
      u[s] += p * (n && d ? -1 : 1);
      break;
  }
  return u;
}
async function ze(t, e) {
  var n;
  e === void 0 && (e = {});
  const { x: o, y: r, platform: i, rects: s, elements: c, strategy: f } = t,
    {
      boundary: d = 'clippingAncestors',
      rootBoundary: l = 'viewport',
      elementContext: a = 'floating',
      altBoundary: p = !1,
      padding: u = 0,
    } = Y(e, t),
    m = ee(u),
    w = c[p ? (a === 'floating' ? 'reference' : 'floating') : a],
    g = dt(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n
            ? w
            : w.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(c.floating))),
        boundary: d,
        rootBoundary: l,
        strategy: f,
      }),
    ),
    y =
      a === 'floating'
        ? { x: o, y: r, width: s.floating.width, height: s.floating.height }
        : s.reference,
    v = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c.floating)),
    x = (await (i.isElement == null ? void 0 : i.isElement(v)))
      ? (await (i.getScale == null ? void 0 : i.getScale(v))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    R = dt(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: c,
            rect: y,
            offsetParent: v,
            strategy: f,
          })
        : y,
    );
  return {
    top: (g.top - R.top + m.top) / x.y,
    bottom: (R.bottom - g.bottom + m.bottom) / x.y,
    left: (g.left - R.left + m.left) / x.x,
    right: (R.right - g.right + m.right) / x.x,
  };
}
const Ie = 50,
  Xe = async (t, e, n) => {
    const {
        placement: o = 'bottom',
        strategy: r = 'absolute',
        middleware: i = [],
        platform: s,
      } = n,
      c = s.detectOverflow ? s : { ...s, detectOverflow: ze },
      f = await (s.isRTL == null ? void 0 : s.isRTL(e));
    let d = await s.getElementRects({ reference: t, floating: e, strategy: r }),
      { x: l, y: a } = Xt(d, o, f),
      p = o,
      u = 0;
    const m = {};
    for (let h = 0; h < i.length; h++) {
      const w = i[h];
      if (!w) continue;
      const { name: g, fn: y } = w,
        {
          x: v,
          y: x,
          data: R,
          reset: b,
        } = await y({
          x: l,
          y: a,
          initialPlacement: o,
          placement: p,
          strategy: r,
          middlewareData: m,
          rects: d,
          platform: c,
          elements: { reference: t, floating: e },
        });
      ((l = v ?? l),
        (a = x ?? a),
        (m[g] = { ...m[g], ...R }),
        b &&
          u < Ie &&
          (u++,
          typeof b == 'object' &&
            (b.placement && (p = b.placement),
            b.rects &&
              (d =
                b.rects === !0
                  ? await s.getElementRects({ reference: t, floating: e, strategy: r })
                  : b.rects),
            ({ x: l, y: a } = Xt(d, p, f))),
          (h = -1)));
    }
    return { x: l, y: a, placement: p, strategy: r, middlewareData: m };
  },
  Ye = (t) => ({
    name: 'arrow',
    options: t,
    async fn(e) {
      const { x: n, y: o, placement: r, rects: i, platform: s, elements: c, middlewareData: f } = e,
        { element: d, padding: l = 0 } = Y(t, e) || {};
      if (d == null) return {};
      const a = ee(l),
        p = { x: n, y: o },
        u = Et(r),
        m = St(u),
        h = await s.getDimensions(d),
        w = u === 'y',
        g = w ? 'top' : 'left',
        y = w ? 'bottom' : 'right',
        v = w ? 'clientHeight' : 'clientWidth',
        x = i.reference[m] + i.reference[u] - p[u] - i.floating[m],
        R = p[u] - i.reference[u],
        b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
      let O = b ? b[v] : 0;
      (!O || !(await (s.isElement == null ? void 0 : s.isElement(b)))) &&
        (O = c.floating[v] || i.floating[m]);
      const T = x / 2 - R / 2,
        N = O / 2 - h[m] / 2 - 1,
        L = K(a[g], N),
        M = K(a[y], N),
        k = L,
        E = O - h[m] - M,
        P = O / 2 - h[m] / 2 + T,
        F = At(k, P, E),
        S =
          !f.arrow &&
          et(r) != null &&
          P !== F &&
          i.reference[m] / 2 - (P < k ? L : M) - h[m] / 2 < 0,
        D = S ? (P < k ? P - k : P - E) : 0;
      return {
        [u]: p[u] + D,
        data: { [u]: F, centerOffset: P - F - D, ...(S && { alignmentOffset: D }) },
        reset: S,
      };
    },
  }),
  qe = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'flip',
        options: t,
        async fn(e) {
          var n, o;
          const {
              placement: r,
              middlewareData: i,
              rects: s,
              initialPlacement: c,
              platform: f,
              elements: d,
            } = e,
            {
              mainAxis: l = !0,
              crossAxis: a = !0,
              fallbackPlacements: p,
              fallbackStrategy: u = 'bestFit',
              fallbackAxisSideDirection: m = 'none',
              flipAlignment: h = !0,
              ...w
            } = Y(t, e);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          const g = q(r),
            y = V(c),
            v = q(c) === c,
            x = await (f.isRTL == null ? void 0 : f.isRTL(d.floating)),
            R = p || (v || !h ? [ut(c)] : We(c)),
            b = m !== 'none';
          !p && b && R.push(...je(c, h, m, x));
          const O = [c, ...R],
            T = await f.detectOverflow(e, w),
            N = [];
          let L = ((o = i.flip) == null ? void 0 : o.overflows) || [];
          if ((l && N.push(T[g]), a)) {
            const P = Fe(r, s, x);
            N.push(T[P[0]], T[P[1]]);
          }
          if (((L = [...L, { placement: r, overflows: N }]), !N.every((P) => P <= 0))) {
            var M, k;
            const P = (((M = i.flip) == null ? void 0 : M.index) || 0) + 1,
              F = O[P];
            if (
              F &&
              (!(a === 'alignment' ? y !== V(F) : !1) ||
                L.every((A) => (V(A.placement) === y ? A.overflows[0] > 0 : !0)))
            )
              return { data: { index: P, overflows: L }, reset: { placement: F } };
            let S =
              (k = L.filter((D) => D.overflows[0] <= 0).sort(
                (D, A) => D.overflows[1] - A.overflows[1],
              )[0]) == null
                ? void 0
                : k.placement;
            if (!S)
              switch (u) {
                case 'bestFit': {
                  var E;
                  const D =
                    (E = L.filter((A) => {
                      if (b) {
                        const $ = V(A.placement);
                        return $ === y || $ === 'y';
                      }
                      return !0;
                    })
                      .map((A) => [
                        A.placement,
                        A.overflows.filter(($) => $ > 0).reduce(($, H) => $ + H, 0),
                      ])
                      .sort((A, $) => A[1] - $[1])[0]) == null
                      ? void 0
                      : E[0];
                  D && (S = D);
                  break;
                }
                case 'initialPlacement':
                  S = c;
                  break;
              }
            if (r !== S) return { reset: { placement: S } };
          }
          return {};
        },
      }
    );
  };
function Yt(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width,
  };
}
function qt(t) {
  return ke.some((e) => t[e] >= 0);
}
const Ue = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'hide',
        options: t,
        async fn(e) {
          const { rects: n, platform: o } = e,
            { strategy: r = 'referenceHidden', ...i } = Y(t, e);
          switch (r) {
            case 'referenceHidden': {
              const s = await o.detectOverflow(e, { ...i, elementContext: 'reference' }),
                c = Yt(s, n.reference);
              return { data: { referenceHiddenOffsets: c, referenceHidden: qt(c) } };
            }
            case 'escaped': {
              const s = await o.detectOverflow(e, { ...i, altBoundary: !0 }),
                c = Yt(s, n.floating);
              return { data: { escapedOffsets: c, escaped: qt(c) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  ne = new Set(['left', 'top']);
async function Ke(t, e) {
  const { placement: n, platform: o, elements: r } = t,
    i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)),
    s = q(n),
    c = et(n),
    f = V(n) === 'y',
    d = ne.has(s) ? -1 : 1,
    l = i && f ? -1 : 1,
    a = Y(e, t);
  let {
    mainAxis: p,
    crossAxis: u,
    alignmentAxis: m,
  } = typeof a == 'number'
    ? { mainAxis: a, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: a.mainAxis || 0, crossAxis: a.crossAxis || 0, alignmentAxis: a.alignmentAxis };
  return (
    c && typeof m == 'number' && (u = c === 'end' ? m * -1 : m),
    f ? { x: u * l, y: p * d } : { x: p * d, y: u * l }
  );
}
const Ze = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: 'offset',
        options: t,
        async fn(e) {
          var n, o;
          const { x: r, y: i, placement: s, middlewareData: c } = e,
            f = await Ke(e, t);
          return s === ((n = c.offset) == null ? void 0 : n.placement) &&
            (o = c.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: r + f.x, y: i + f.y, data: { ...f, placement: s } };
        },
      }
    );
  },
  Ge = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn(e) {
          const { x: n, y: o, placement: r, platform: i } = e,
            {
              mainAxis: s = !0,
              crossAxis: c = !1,
              limiter: f = {
                fn: (g) => {
                  let { x: y, y: v } = g;
                  return { x: y, y: v };
                },
              },
              ...d
            } = Y(t, e),
            l = { x: n, y: o },
            a = await i.detectOverflow(e, d),
            p = V(q(r)),
            u = Pt(p);
          let m = l[u],
            h = l[p];
          if (s) {
            const g = u === 'y' ? 'top' : 'left',
              y = u === 'y' ? 'bottom' : 'right',
              v = m + a[g],
              x = m - a[y];
            m = At(v, m, x);
          }
          if (c) {
            const g = p === 'y' ? 'top' : 'left',
              y = p === 'y' ? 'bottom' : 'right',
              v = h + a[g],
              x = h - a[y];
            h = At(v, h, x);
          }
          const w = f.fn({ ...e, [u]: m, [p]: h });
          return { ...w, data: { x: w.x - n, y: w.y - o, enabled: { [u]: s, [p]: c } } };
        },
      }
    );
  },
  Je = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        options: t,
        fn(e) {
          const { x: n, y: o, placement: r, rects: i, middlewareData: s } = e,
            { offset: c = 0, mainAxis: f = !0, crossAxis: d = !0 } = Y(t, e),
            l = { x: n, y: o },
            a = V(r),
            p = Pt(a);
          let u = l[p],
            m = l[a];
          const h = Y(c, e),
            w =
              typeof h == 'number'
                ? { mainAxis: h, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...h };
          if (f) {
            const v = p === 'y' ? 'height' : 'width',
              x = i.reference[p] - i.floating[v] + w.mainAxis,
              R = i.reference[p] + i.reference[v] - w.mainAxis;
            u < x ? (u = x) : u > R && (u = R);
          }
          if (d) {
            var g, y;
            const v = p === 'y' ? 'width' : 'height',
              x = ne.has(q(r)),
              R =
                i.reference[a] -
                i.floating[v] +
                ((x && ((g = s.offset) == null ? void 0 : g[a])) || 0) +
                (x ? 0 : w.crossAxis),
              b =
                i.reference[a] +
                i.reference[v] +
                (x ? 0 : ((y = s.offset) == null ? void 0 : y[a]) || 0) -
                (x ? w.crossAxis : 0);
            m < R ? (m = R) : m > b && (m = b);
          }
          return { [p]: u, [a]: m };
        },
      }
    );
  },
  Qe = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'size',
        options: t,
        async fn(e) {
          var n, o;
          const { placement: r, rects: i, platform: s, elements: c } = e,
            { apply: f = () => {}, ...d } = Y(t, e),
            l = await s.detectOverflow(e, d),
            a = q(r),
            p = et(r),
            u = V(r) === 'y',
            { width: m, height: h } = i.floating;
          let w, g;
          a === 'top' || a === 'bottom'
            ? ((w = a),
              (g =
                p === ((await (s.isRTL == null ? void 0 : s.isRTL(c.floating))) ? 'start' : 'end')
                  ? 'left'
                  : 'right'))
            : ((g = a), (w = p === 'end' ? 'top' : 'bottom'));
          const y = h - l.top - l.bottom,
            v = m - l.left - l.right,
            x = K(h - l[w], y),
            R = K(m - l[g], v),
            b = !e.middlewareData.shift;
          let O = x,
            T = R;
          if (
            ((n = e.middlewareData.shift) != null && n.enabled.x && (T = v),
            (o = e.middlewareData.shift) != null && o.enabled.y && (O = y),
            b && !p)
          ) {
            const L = W(l.left, 0),
              M = W(l.right, 0),
              k = W(l.top, 0),
              E = W(l.bottom, 0);
            u
              ? (T = m - 2 * (L !== 0 || M !== 0 ? L + M : W(l.left, l.right)))
              : (O = h - 2 * (k !== 0 || E !== 0 ? k + E : W(l.top, l.bottom)));
          }
          await f({ ...e, availableWidth: T, availableHeight: O });
          const N = await s.getDimensions(c.floating);
          return m !== N.width || h !== N.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function pt() {
  return typeof window < 'u';
}
function nt(t) {
  return oe(t) ? (t.nodeName || '').toLowerCase() : '#document';
}
function _(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function I(t) {
  var e;
  return (e = (oe(t) ? t.ownerDocument : t.document) || window.document) == null
    ? void 0
    : e.documentElement;
}
function oe(t) {
  return pt() ? t instanceof Node || t instanceof _(t).Node : !1;
}
function B(t) {
  return pt() ? t instanceof Element || t instanceof _(t).Element : !1;
}
function U(t) {
  return pt() ? t instanceof HTMLElement || t instanceof _(t).HTMLElement : !1;
}
function Ut(t) {
  return !pt() || typeof ShadowRoot > 'u'
    ? !1
    : t instanceof ShadowRoot || t instanceof _(t).ShadowRoot;
}
function it(t) {
  const { overflow: e, overflowX: n, overflowY: o, display: r } = j(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && r !== 'inline' && r !== 'contents';
}
function tn(t) {
  return /^(table|td|th)$/.test(nt(t));
}
function ht(t) {
  try {
    if (t.matches(':popover-open')) return !0;
  } catch {}
  try {
    return t.matches(':modal');
  } catch {
    return !1;
  }
}
const en = /transform|translate|scale|rotate|perspective|filter/,
  nn = /paint|layout|strict|content/,
  G = (t) => !!t && t !== 'none';
let yt;
function Dt(t) {
  const e = B(t) ? j(t) : t;
  return (
    G(e.transform) ||
    G(e.translate) ||
    G(e.scale) ||
    G(e.rotate) ||
    G(e.perspective) ||
    (!Lt() && (G(e.backdropFilter) || G(e.filter))) ||
    en.test(e.willChange || '') ||
    nn.test(e.contain || '')
  );
}
function on(t) {
  let e = Z(t);
  for (; U(e) && !tt(e); ) {
    if (Dt(e)) return e;
    if (ht(e)) return null;
    e = Z(e);
  }
  return null;
}
function Lt() {
  return (
    yt == null &&
      (yt = typeof CSS < 'u' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none')),
    yt
  );
}
function tt(t) {
  return /^(html|body|#document)$/.test(nt(t));
}
function j(t) {
  return _(t).getComputedStyle(t);
}
function gt(t) {
  return B(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.scrollX, scrollTop: t.scrollY };
}
function Z(t) {
  if (nt(t) === 'html') return t;
  const e = t.assignedSlot || t.parentNode || (Ut(t) && t.host) || I(t);
  return Ut(e) ? e.host : e;
}
function re(t) {
  const e = Z(t);
  return tt(e) ? (t.ownerDocument ? t.ownerDocument.body : t.body) : U(e) && it(e) ? e : re(e);
}
function rt(t, e, n) {
  var o;
  (e === void 0 && (e = []), n === void 0 && (n = !0));
  const r = re(t),
    i = r === ((o = t.ownerDocument) == null ? void 0 : o.body),
    s = _(r);
  if (i) {
    const c = Ct(s);
    return e.concat(s, s.visualViewport || [], it(r) ? r : [], c && n ? rt(c) : []);
  } else return e.concat(r, rt(r, [], n));
}
function Ct(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function ie(t) {
  const e = j(t);
  let n = parseFloat(e.width) || 0,
    o = parseFloat(e.height) || 0;
  const r = U(t),
    i = r ? t.offsetWidth : n,
    s = r ? t.offsetHeight : o,
    c = ft(n) !== i || ft(o) !== s;
  return (c && ((n = i), (o = s)), { width: n, height: o, $: c });
}
function Mt(t) {
  return B(t) ? t : t.contextElement;
}
function Q(t) {
  const e = Mt(t);
  if (!U(e)) return z(1);
  const n = e.getBoundingClientRect(),
    { width: o, height: r, $: i } = ie(e);
  let s = (i ? ft(n.width) : n.width) / o,
    c = (i ? ft(n.height) : n.height) / r;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!c || !Number.isFinite(c)) && (c = 1),
    { x: s, y: c }
  );
}
const rn = z(0);
function se(t) {
  const e = _(t);
  return !Lt() || !e.visualViewport
    ? rn
    : { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop };
}
function sn(t, e, n) {
  return (e === void 0 && (e = !1), !n || (e && n !== _(t)) ? !1 : e);
}
function J(t, e, n, o) {
  (e === void 0 && (e = !1), n === void 0 && (n = !1));
  const r = t.getBoundingClientRect(),
    i = Mt(t);
  let s = z(1);
  e && (o ? B(o) && (s = Q(o)) : (s = Q(t)));
  const c = sn(i, n, o) ? se(i) : z(0);
  let f = (r.left + c.x) / s.x,
    d = (r.top + c.y) / s.y,
    l = r.width / s.x,
    a = r.height / s.y;
  if (i) {
    const p = _(i),
      u = o && B(o) ? _(o) : o;
    let m = p,
      h = Ct(m);
    for (; h && o && u !== m; ) {
      const w = Q(h),
        g = h.getBoundingClientRect(),
        y = j(h),
        v = g.left + (h.clientLeft + parseFloat(y.paddingLeft)) * w.x,
        x = g.top + (h.clientTop + parseFloat(y.paddingTop)) * w.y;
      ((f *= w.x), (d *= w.y), (l *= w.x), (a *= w.y), (f += v), (d += x), (m = _(h)), (h = Ct(m)));
    }
  }
  return dt({ width: l, height: a, x: f, y: d });
}
function wt(t, e) {
  const n = gt(t).scrollLeft;
  return e ? e.left + n : J(I(t)).left + n;
}
function ce(t, e) {
  const n = t.getBoundingClientRect(),
    o = n.left + e.scrollLeft - wt(t, n),
    r = n.top + e.scrollTop;
  return { x: o, y: r };
}
function cn(t) {
  let { elements: e, rect: n, offsetParent: o, strategy: r } = t;
  const i = r === 'fixed',
    s = I(o),
    c = e ? ht(e.floating) : !1;
  if (o === s || (c && i)) return n;
  let f = { scrollLeft: 0, scrollTop: 0 },
    d = z(1);
  const l = z(0),
    a = U(o);
  if ((a || (!a && !i)) && ((nt(o) !== 'body' || it(s)) && (f = gt(o)), a)) {
    const u = J(o);
    ((d = Q(o)), (l.x = u.x + o.clientLeft), (l.y = u.y + o.clientTop));
  }
  const p = s && !a && !i ? ce(s, f) : z(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - f.scrollLeft * d.x + l.x + p.x,
    y: n.y * d.y - f.scrollTop * d.y + l.y + p.y,
  };
}
function ln(t) {
  return Array.from(t.getClientRects());
}
function an(t) {
  const e = I(t),
    n = gt(t),
    o = t.ownerDocument.body,
    r = W(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth),
    i = W(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + wt(t);
  const c = -n.scrollTop;
  return (
    j(o).direction === 'rtl' && (s += W(e.clientWidth, o.clientWidth) - r),
    { width: r, height: i, x: s, y: c }
  );
}
const Kt = 25;
function fn(t, e) {
  const n = _(t),
    o = I(t),
    r = n.visualViewport;
  let i = o.clientWidth,
    s = o.clientHeight,
    c = 0,
    f = 0;
  if (r) {
    ((i = r.width), (s = r.height));
    const l = Lt();
    (!l || (l && e === 'fixed')) && ((c = r.offsetLeft), (f = r.offsetTop));
  }
  const d = wt(o);
  if (d <= 0) {
    const l = o.ownerDocument,
      a = l.body,
      p = getComputedStyle(a),
      u =
        (l.compatMode === 'CSS1Compat' && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) ||
        0,
      m = Math.abs(o.clientWidth - a.clientWidth - u);
    m <= Kt && (i -= m);
  } else d <= Kt && (i += d);
  return { width: i, height: s, x: c, y: f };
}
function un(t, e) {
  const n = J(t, !0, e === 'fixed'),
    o = n.top + t.clientTop,
    r = n.left + t.clientLeft,
    i = U(t) ? Q(t) : z(1),
    s = t.clientWidth * i.x,
    c = t.clientHeight * i.y,
    f = r * i.x,
    d = o * i.y;
  return { width: s, height: c, x: f, y: d };
}
function Zt(t, e, n) {
  let o;
  if (e === 'viewport') o = fn(t, n);
  else if (e === 'document') o = an(I(t));
  else if (B(e)) o = un(e, n);
  else {
    const r = se(t);
    o = { x: e.x - r.x, y: e.y - r.y, width: e.width, height: e.height };
  }
  return dt(o);
}
function le(t, e) {
  const n = Z(t);
  return n === e || !B(n) || tt(n) ? !1 : j(n).position === 'fixed' || le(n, e);
}
function dn(t, e) {
  const n = e.get(t);
  if (n) return n;
  let o = rt(t, [], !1).filter((c) => B(c) && nt(c) !== 'body'),
    r = null;
  const i = j(t).position === 'fixed';
  let s = i ? Z(t) : t;
  for (; B(s) && !tt(s); ) {
    const c = j(s),
      f = Dt(s);
    (!f && c.position === 'fixed' && (r = null),
      (
        i
          ? !f && !r
          : (!f &&
              c.position === 'static' &&
              !!r &&
              (r.position === 'absolute' || r.position === 'fixed')) ||
            (it(s) && !f && le(t, s))
      )
        ? (o = o.filter((l) => l !== s))
        : (r = c),
      (s = Z(s)));
  }
  return (e.set(t, o), o);
}
function mn(t) {
  let { element: e, boundary: n, rootBoundary: o, strategy: r } = t;
  const s = [...(n === 'clippingAncestors' ? (ht(e) ? [] : dn(e, this._c)) : [].concat(n)), o],
    c = Zt(e, s[0], r);
  let f = c.top,
    d = c.right,
    l = c.bottom,
    a = c.left;
  for (let p = 1; p < s.length; p++) {
    const u = Zt(e, s[p], r);
    ((f = W(u.top, f)), (d = K(u.right, d)), (l = K(u.bottom, l)), (a = W(u.left, a)));
  }
  return { width: d - a, height: l - f, x: a, y: f };
}
function pn(t) {
  const { width: e, height: n } = ie(t);
  return { width: e, height: n };
}
function hn(t, e, n) {
  const o = U(e),
    r = I(e),
    i = n === 'fixed',
    s = J(t, !0, i, e);
  let c = { scrollLeft: 0, scrollTop: 0 };
  const f = z(0);
  function d() {
    f.x = wt(r);
  }
  if (o || (!o && !i))
    if (((nt(e) !== 'body' || it(r)) && (c = gt(e)), o)) {
      const u = J(e, !0, i, e);
      ((f.x = u.x + e.clientLeft), (f.y = u.y + e.clientTop));
    } else r && d();
  i && !o && r && d();
  const l = r && !o && !i ? ce(r, c) : z(0),
    a = s.left + c.scrollLeft - f.x - l.x,
    p = s.top + c.scrollTop - f.y - l.y;
  return { x: a, y: p, width: s.width, height: s.height };
}
function vt(t) {
  return j(t).position === 'static';
}
function Gt(t, e) {
  if (!U(t) || j(t).position === 'fixed') return null;
  if (e) return e(t);
  let n = t.offsetParent;
  return (I(t) === n && (n = n.ownerDocument.body), n);
}
function ae(t, e) {
  const n = _(t);
  if (ht(t)) return n;
  if (!U(t)) {
    let r = Z(t);
    for (; r && !tt(r); ) {
      if (B(r) && !vt(r)) return r;
      r = Z(r);
    }
    return n;
  }
  let o = Gt(t, e);
  for (; o && tn(o) && vt(o); ) o = Gt(o, e);
  return o && tt(o) && vt(o) && !Dt(o) ? n : o || on(t) || n;
}
const gn = async function (t) {
  const e = this.getOffsetParent || ae,
    n = this.getDimensions,
    o = await n(t.floating);
  return {
    reference: hn(t.reference, await e(t.floating), t.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function wn(t) {
  return j(t).direction === 'rtl';
}
const xn = {
  convertOffsetParentRelativeRectToViewportRelativeRect: cn,
  getDocumentElement: I,
  getClippingRect: mn,
  getOffsetParent: ae,
  getElementRects: gn,
  getClientRects: ln,
  getDimensions: pn,
  getScale: Q,
  isElement: B,
  isRTL: wn,
};
function fe(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function yn(t, e) {
  let n = null,
    o;
  const r = I(t);
  function i() {
    var c;
    (clearTimeout(o), (c = n) == null || c.disconnect(), (n = null));
  }
  function s(c, f) {
    (c === void 0 && (c = !1), f === void 0 && (f = 1), i());
    const d = t.getBoundingClientRect(),
      { left: l, top: a, width: p, height: u } = d;
    if ((c || e(), !p || !u)) return;
    const m = lt(a),
      h = lt(r.clientWidth - (l + p)),
      w = lt(r.clientHeight - (a + u)),
      g = lt(l),
      v = {
        rootMargin: -m + 'px ' + -h + 'px ' + -w + 'px ' + -g + 'px',
        threshold: W(0, K(1, f)) || 1,
      };
    let x = !0;
    function R(b) {
      const O = b[0].intersectionRatio;
      if (O !== f) {
        if (!x) return s();
        O
          ? s(!1, O)
          : (o = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      (O === 1 && !fe(d, t.getBoundingClientRect()) && s(), (x = !1));
    }
    try {
      n = new IntersectionObserver(R, { ...v, root: r.ownerDocument });
    } catch {
      n = new IntersectionObserver(R, v);
    }
    n.observe(t);
  }
  return (s(!0), i);
}
function vn(t, e, n, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: r = !0,
      ancestorResize: i = !0,
      elementResize: s = typeof ResizeObserver == 'function',
      layoutShift: c = typeof IntersectionObserver == 'function',
      animationFrame: f = !1,
    } = o,
    d = Mt(t),
    l = r || i ? [...(d ? rt(d) : []), ...(e ? rt(e) : [])] : [];
  l.forEach((g) => {
    (r && g.addEventListener('scroll', n, { passive: !0 }), i && g.addEventListener('resize', n));
  });
  const a = d && c ? yn(d, n) : null;
  let p = -1,
    u = null;
  s &&
    ((u = new ResizeObserver((g) => {
      let [y] = g;
      (y &&
        y.target === d &&
        u &&
        e &&
        (u.unobserve(e),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var v;
          (v = u) == null || v.observe(e);
        }))),
        n());
    })),
    d && !f && u.observe(d),
    e && u.observe(e));
  let m,
    h = f ? J(t) : null;
  f && w();
  function w() {
    const g = J(t);
    (h && !fe(h, g) && n(), (h = g), (m = requestAnimationFrame(w)));
  }
  return (
    n(),
    () => {
      var g;
      (l.forEach((y) => {
        (r && y.removeEventListener('scroll', n), i && y.removeEventListener('resize', n));
      }),
        a == null || a(),
        (g = u) == null || g.disconnect(),
        (u = null),
        f && cancelAnimationFrame(m));
    }
  );
}
const bn = Ze,
  An = Ge,
  Rn = qe,
  Cn = Qe,
  On = Ue,
  Jt = Ye,
  Pn = Je,
  Sn = (t, e, n) => {
    const o = new Map(),
      r = { platform: xn, ...n },
      i = { ...r.platform, _c: o };
    return Xe(t, e, { ...r, platform: i });
  };
var En = typeof document < 'u',
  Dn = function () {},
  at = En ? C.useLayoutEffect : Dn;
function mt(t, e) {
  if (t === e) return !0;
  if (typeof t != typeof e) return !1;
  if (typeof t == 'function' && t.toString() === e.toString()) return !0;
  let n, o, r;
  if (t && e && typeof t == 'object') {
    if (Array.isArray(t)) {
      if (((n = t.length), n !== e.length)) return !1;
      for (o = n; o-- !== 0; ) if (!mt(t[o], e[o])) return !1;
      return !0;
    }
    if (((r = Object.keys(t)), (n = r.length), n !== Object.keys(e).length)) return !1;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(e, r[o])) return !1;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (!(i === '_owner' && t.$$typeof) && !mt(t[i], e[i])) return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function ue(t) {
  return typeof window > 'u' ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Qt(t, e) {
  const n = ue(t);
  return Math.round(e * n) / n;
}
function bt(t) {
  const e = C.useRef(t);
  return (
    at(() => {
      e.current = t;
    }),
    e
  );
}
function Ln(t) {
  t === void 0 && (t = {});
  const {
      placement: e = 'bottom',
      strategy: n = 'absolute',
      middleware: o = [],
      platform: r,
      elements: { reference: i, floating: s } = {},
      transform: c = !0,
      whileElementsMounted: f,
      open: d,
    } = t,
    [l, a] = C.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: e,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, u] = C.useState(o);
  mt(p, o) || u(o);
  const [m, h] = C.useState(null),
    [w, g] = C.useState(null),
    y = C.useCallback((A) => {
      A !== b.current && ((b.current = A), h(A));
    }, []),
    v = C.useCallback((A) => {
      A !== O.current && ((O.current = A), g(A));
    }, []),
    x = i || m,
    R = s || w,
    b = C.useRef(null),
    O = C.useRef(null),
    T = C.useRef(l),
    N = f != null,
    L = bt(f),
    M = bt(r),
    k = bt(d),
    E = C.useCallback(() => {
      if (!b.current || !O.current) return;
      const A = { placement: e, strategy: n, middleware: p };
      (M.current && (A.platform = M.current),
        Sn(b.current, O.current, A).then(($) => {
          const H = { ...$, isPositioned: k.current !== !1 };
          P.current &&
            !mt(T.current, H) &&
            ((T.current = H),
            Le.flushSync(() => {
              a(H);
            }));
        }));
    }, [p, e, n, M, k]);
  at(() => {
    d === !1 &&
      T.current.isPositioned &&
      ((T.current.isPositioned = !1), a((A) => ({ ...A, isPositioned: !1 })));
  }, [d]);
  const P = C.useRef(!1);
  (at(
    () => (
      (P.current = !0),
      () => {
        P.current = !1;
      }
    ),
    [],
  ),
    at(() => {
      if ((x && (b.current = x), R && (O.current = R), x && R)) {
        if (L.current) return L.current(x, R, E);
        E();
      }
    }, [x, R, E, L, N]));
  const F = C.useMemo(
      () => ({ reference: b, floating: O, setReference: y, setFloating: v }),
      [y, v],
    ),
    S = C.useMemo(() => ({ reference: x, floating: R }), [x, R]),
    D = C.useMemo(() => {
      const A = { position: n, left: 0, top: 0 };
      if (!S.floating) return A;
      const $ = Qt(S.floating, l.x),
        H = Qt(S.floating, l.y);
      return c
        ? {
            ...A,
            transform: 'translate(' + $ + 'px, ' + H + 'px)',
            ...(ue(S.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: n, left: $, top: H };
    }, [n, c, S.floating, l.x, l.y]);
  return C.useMemo(
    () => ({ ...l, update: E, refs: F, elements: S, floatingStyles: D }),
    [l, E, F, S, D],
  );
}
const Mn = (t) => {
    function e(n) {
      return {}.hasOwnProperty.call(n, 'current');
    }
    return {
      name: 'arrow',
      options: t,
      fn(n) {
        const { element: o, padding: r } = typeof t == 'function' ? t(n) : t;
        return o && e(o)
          ? o.current != null
            ? Jt({ element: o.current, padding: r }).fn(n)
            : {}
          : o
            ? Jt({ element: o, padding: r }).fn(n)
            : {};
      },
    };
  },
  Tn = (t, e) => {
    const n = bn(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  },
  $n = (t, e) => {
    const n = An(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  },
  kn = (t, e) => ({ fn: Pn(t).fn, options: [t, e] }),
  Nn = (t, e) => {
    const n = Rn(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  },
  Fn = (t, e) => {
    const n = Cn(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  },
  Wn = (t, e) => {
    const n = On(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  },
  _n = (t, e) => {
    const n = Mn(t);
    return { name: n.name, fn: n.fn, options: [t, e] };
  };
var Hn = 'Arrow',
  de = C.forwardRef((t, e) => {
    const { children: n, width: o = 10, height: r = 5, ...i } = t;
    return X.jsx(Ot.svg, {
      ...i,
      ref: e,
      width: o,
      height: r,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: t.asChild ? n : X.jsx('polygon', { points: '0,0 30,0 15,10' }),
    });
  });
de.displayName = Hn;
var Bn = de,
  Tt = 'Popper',
  [me, Qn] = Me(Tt),
  [jn, pe] = me(Tt),
  he = (t) => {
    const { __scopePopper: e, children: n } = t,
      [o, r] = C.useState(null),
      [i, s] = C.useState(void 0);
    return X.jsx(jn, {
      scope: e,
      anchor: o,
      onAnchorChange: r,
      placementState: i,
      setPlacementState: s,
      children: n,
    });
  };
he.displayName = Tt;
var ge = 'PopperAnchor',
  we = C.forwardRef((t, e) => {
    const { __scopePopper: n, virtualRef: o, ...r } = t,
      i = pe(ge, n),
      s = C.useRef(null),
      c = i.onAnchorChange,
      f = C.useCallback(
        (m) => {
          ((s.current = m), m && c(m));
        },
        [c],
      ),
      d = te(e, f),
      l = C.useRef(null);
    C.useEffect(() => {
      if (!o) return;
      const m = l.current;
      ((l.current = o.current), m !== l.current && c(l.current));
    });
    const a = i.placementState && kt(i.placementState),
      p = a == null ? void 0 : a[0],
      u = a == null ? void 0 : a[1];
    return o
      ? null
      : X.jsx(Ot.div, { 'data-radix-popper-side': p, 'data-radix-popper-align': u, ...r, ref: d });
  });
we.displayName = ge;
var $t = 'PopperContent',
  [Vn, zn] = me($t),
  xe = C.forwardRef((t, e) => {
    var Ft, Wt, _t, Ht, Bt, jt;
    const {
        __scopePopper: n,
        side: o = 'bottom',
        sideOffset: r = 0,
        align: i = 'center',
        alignOffset: s = 0,
        arrowPadding: c = 0,
        avoidCollisions: f = !0,
        collisionBoundary: d,
        collisionPadding: l = 0,
        sticky: a = 'partial',
        hideWhenDetached: p = !1,
        updatePositionStrategy: u = 'optimized',
        onPlaced: m,
        ...h
      } = t,
      w = pe($t, n),
      [g, y] = C.useState(null),
      v = te(e, (ot) => y(ot)),
      [x, R] = C.useState(null),
      b = $e(x),
      O = (b == null ? void 0 : b.width) ?? 0,
      T = (b == null ? void 0 : b.height) ?? 0,
      N = o + (i !== 'center' ? '-' + i : ''),
      L = typeof l == 'number' ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l },
      M = d ? (Array.isArray(d) ? d : [d]) : void 0,
      k = M !== void 0 && M.length > 0,
      E = { padding: L, boundary: M == null ? void 0 : M.filter(Xn), altBoundary: k },
      {
        refs: P,
        floatingStyles: F,
        placement: S,
        isPositioned: D,
        middlewareData: A,
      } = Ln({
        strategy: 'fixed',
        placement: N,
        whileElementsMounted: (...ot) => vn(...ot, { animationFrame: u === 'always' }),
        elements: { reference: w.anchor },
        middleware: [
          Tn({ mainAxis: r + T, alignmentAxis: s }),
          f && $n({ mainAxis: !0, crossAxis: !1, limiter: a === 'partial' ? kn() : void 0, ...E }),
          f && Nn({ ...E }),
          Fn({
            ...E,
            apply: ({ elements: ot, rects: Vt, availableWidth: Pe, availableHeight: Se }) => {
              const { width: Ee, height: De } = Vt.reference,
                ct = ot.floating.style;
              (ct.setProperty('--radix-popper-available-width', `${Pe}px`),
                ct.setProperty('--radix-popper-available-height', `${Se}px`),
                ct.setProperty('--radix-popper-anchor-width', `${Ee}px`),
                ct.setProperty('--radix-popper-anchor-height', `${De}px`));
            },
          }),
          x && _n({ element: x, padding: c }),
          Yn({ arrowWidth: O, arrowHeight: T }),
          p && Wn({ strategy: 'referenceHidden', ...E }),
        ],
      }),
      $ = w.setPlacementState;
    xt(
      () => (
        $(S),
        () => {
          $(void 0);
        }
      ),
      [S, $],
    );
    const [H, Nt] = kt(S),
      st = Te(m);
    xt(() => {
      D && (st == null || st());
    }, [D, st]);
    const be = (Ft = A.arrow) == null ? void 0 : Ft.x,
      Ae = (Wt = A.arrow) == null ? void 0 : Wt.y,
      Re = ((_t = A.arrow) == null ? void 0 : _t.centerOffset) !== 0,
      [Ce, Oe] = C.useState();
    return (
      xt(() => {
        g && Oe(window.getComputedStyle(g).zIndex);
      }, [g]),
      X.jsx('div', {
        ref: P.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...F,
          transform: D ? F.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: Ce,
          '--radix-popper-transform-origin': [
            (Ht = A.transformOrigin) == null ? void 0 : Ht.x,
            (Bt = A.transformOrigin) == null ? void 0 : Bt.y,
          ].join(' '),
          ...(((jt = A.hide) == null ? void 0 : jt.referenceHidden) && {
            visibility: 'hidden',
            pointerEvents: 'none',
          }),
        },
        dir: t.dir,
        children: X.jsx(Vn, {
          scope: n,
          placedSide: H,
          placedAlign: Nt,
          onArrowChange: R,
          arrowX: be,
          arrowY: Ae,
          shouldHideArrow: Re,
          children: X.jsx(Ot.div, {
            'data-side': H,
            'data-align': Nt,
            ...h,
            ref: v,
            style: { ...h.style, animation: D ? void 0 : 'none' },
          }),
        }),
      })
    );
  });
xe.displayName = $t;
var ye = 'PopperArrow',
  In = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  ve = C.forwardRef(function (e, n) {
    const { __scopePopper: o, ...r } = e,
      i = zn(ye, o),
      s = In[i.placedSide];
    return X.jsx('span', {
      ref: i.onArrowChange,
      style: {
        position: 'absolute',
        left: i.arrowX,
        top: i.arrowY,
        [s]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
          i.placedSide
        ],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[i.placedSide],
        visibility: i.shouldHideArrow ? 'hidden' : void 0,
      },
      children: X.jsx(Bn, { ...r, ref: n, style: { ...r.style, display: 'block' } }),
    });
  });
ve.displayName = ye;
function Xn(t) {
  return t !== null;
}
var Yn = (t) => ({
  name: 'transformOrigin',
  options: t,
  fn(e) {
    var w, g, y;
    const { placement: n, rects: o, middlewareData: r } = e,
      s = ((w = r.arrow) == null ? void 0 : w.centerOffset) !== 0,
      c = s ? 0 : t.arrowWidth,
      f = s ? 0 : t.arrowHeight,
      [d, l] = kt(n),
      a = { start: '0%', center: '50%', end: '100%' }[l],
      p = (((g = r.arrow) == null ? void 0 : g.x) ?? 0) + c / 2,
      u = (((y = r.arrow) == null ? void 0 : y.y) ?? 0) + f / 2;
    let m = '',
      h = '';
    return (
      d === 'bottom'
        ? ((m = s ? a : `${p}px`), (h = `${-f}px`))
        : d === 'top'
          ? ((m = s ? a : `${p}px`), (h = `${o.floating.height + f}px`))
          : d === 'right'
            ? ((m = `${-f}px`), (h = s ? a : `${u}px`))
            : d === 'left' && ((m = `${o.floating.width + f}px`), (h = s ? a : `${u}px`)),
      { data: { x: m, y: h } }
    );
  },
});
function kt(t) {
  const [e, n = 'center'] = t.split('-');
  return [e, n];
}
var to = he,
  eo = we,
  no = xe,
  oo = ve;
export { eo as A, no as C, to as R, oo as a, Qn as c };
