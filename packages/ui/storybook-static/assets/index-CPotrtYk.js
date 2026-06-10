import { r as l, o as C } from './index-pP6CS22B.js';
import { j as S } from './jsx-runtime-Z5uAzocK.js';
import { r as R } from './index-DLHbBEj9.js';
function E(t, e) {
  if (typeof t == 'function') return t(e);
  t != null && (t.current = e);
}
function _(...t) {
  return (e) => {
    let o = !1;
    const i = t.map((n) => {
      const s = E(n, e);
      return (!o && typeof s == 'function' && (o = !0), s);
    });
    if (o)
      return () => {
        for (let n = 0; n < i.length; n++) {
          const s = i[n];
          typeof s == 'function' ? s() : E(t[n], null);
        }
      };
  };
}
function g(...t) {
  return l.useCallback(_(...t), t);
}
function Z(t, e) {
  const o = l.createContext(e);
  o.displayName = t + 'Context';
  const i = (s) => {
    const { children: r, ...c } = s,
      u = l.useMemo(() => c, Object.values(c));
    return S.jsx(o.Provider, { value: u, children: r });
  };
  i.displayName = t + 'Provider';
  function n(s) {
    const r = l.useContext(o);
    if (r) return r;
    if (e !== void 0) return e;
    throw new Error(`\`${s}\` must be used within \`${t}\``);
  }
  return [i, n];
}
function q(t, e = []) {
  let o = [];
  function i(s, r) {
    const c = l.createContext(r);
    c.displayName = s + 'Context';
    const u = o.length;
    o = [...o, r];
    const m = (a) => {
      var x;
      const { scope: f, children: y, ...p } = a,
        h = ((x = f == null ? void 0 : f[t]) == null ? void 0 : x[u]) || c,
        $ = l.useMemo(() => p, Object.values(p));
      return S.jsx(h.Provider, { value: $, children: y });
    };
    m.displayName = s + 'Provider';
    function d(a, f) {
      var h;
      const y = ((h = f == null ? void 0 : f[t]) == null ? void 0 : h[u]) || c,
        p = l.useContext(y);
      if (p) return p;
      if (r !== void 0) return r;
      throw new Error(`\`${a}\` must be used within \`${s}\``);
    }
    return [m, d];
  }
  const n = () => {
    const s = o.map((r) => l.createContext(r));
    return function (c) {
      const u = (c == null ? void 0 : c[t]) || s;
      return l.useMemo(() => ({ [`__scope${t}`]: { ...c, [t]: u } }), [c, u]);
    };
  };
  return ((n.scopeName = t), [i, w(n, ...e)]);
}
function w(...t) {
  const e = t[0];
  if (t.length === 1) return e;
  const o = () => {
    const i = t.map((n) => ({ useScope: n(), scopeName: n.scopeName }));
    return function (s) {
      const r = i.reduce((c, { useScope: u, scopeName: m }) => {
        const a = u(s)[`__scope${m}`];
        return { ...c, ...a };
      }, {});
      return l.useMemo(() => ({ [`__scope${e.scopeName}`]: r }), [r]);
    };
  };
  return ((o.scopeName = e.scopeName), o);
}
function G(t, e, { checkForDefaultPrevented: o = !0 } = {}) {
  return function (n) {
    if ((t == null || t(n), o === !1 || !n.defaultPrevented)) return e == null ? void 0 : e(n);
  };
}
var j = globalThis != null && globalThis.document ? l.useLayoutEffect : () => {},
  I = C[' useInsertionEffect '.trim().toString()] || j;
function J({ prop: t, defaultProp: e, onChange: o = () => {}, caller: i }) {
  const [n, s, r] = O({ defaultProp: e, onChange: o }),
    c = t !== void 0,
    u = c ? t : n;
  {
    const d = l.useRef(t !== void 0);
    l.useEffect(() => {
      const a = d.current;
      (a !== c &&
        console.warn(
          `${i} is changing from ${a ? 'controlled' : 'uncontrolled'} to ${c ? 'controlled' : 'uncontrolled'}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (d.current = c));
    }, [c, i]);
  }
  const m = l.useCallback(
    (d) => {
      var a;
      if (c) {
        const f = D(d) ? d(t) : d;
        f !== t && ((a = r.current) == null || a.call(r, f));
      } else s(d);
    },
    [c, t, s, r],
  );
  return [u, m];
}
function O({ defaultProp: t, onChange: e }) {
  const [o, i] = l.useState(t),
    n = l.useRef(o),
    s = l.useRef(e);
  return (
    I(() => {
      s.current = e;
    }, [e]),
    l.useEffect(() => {
      var r;
      n.current !== o && ((r = s.current) == null || r.call(s, o), (n.current = o));
    }, [o, n]),
    [o, i, s]
  );
}
function D(t) {
  return typeof t == 'function';
}
function L(t) {
  const e = l.forwardRef((o, i) => {
    let { children: n, ...s } = o,
      r = null,
      c = !1;
    const u = [];
    (b(n) && typeof v == 'function' && (n = v(n._payload)),
      l.Children.forEach(n, (f) => {
        var y;
        if (W(f)) {
          c = !0;
          const p = f;
          let h = 'child' in p.props ? p.props.child : p.props.children;
          (b(h) && typeof v == 'function' && (h = v(h._payload)),
            (r = N(p, h)),
            u.push((y = r == null ? void 0 : r.props) == null ? void 0 : y.children));
        } else u.push(f);
      }),
      r
        ? (r = l.cloneElement(r, void 0, u))
        : !c && l.Children.count(n) === 1 && l.isValidElement(n) && (r = n));
    const m = r ? V(r) : void 0,
      d = g(i, m);
    if (!r) {
      if (n || n === 0) throw new Error(c ? M(t) : F(t));
      return n;
    }
    const a = T(s, r.props ?? {});
    return (r.type !== l.Fragment && (a.ref = i ? d : m), l.cloneElement(r, a));
  });
  return ((e.displayName = `${t}.Slot`), e);
}
var P = Symbol.for('radix.slottable');
function K(t) {
  const e = (o) => ('child' in o ? o.children(o.child) : o.children);
  return ((e.displayName = `${t}.Slottable`), (e.__radixId = P), e);
}
var N = (t, e) => {
  if ('child' in t.props) {
    const o = t.props.child;
    return l.isValidElement(o)
      ? l.cloneElement(o, void 0, t.props.children(o.props.children))
      : null;
  }
  return l.isValidElement(e) ? e : null;
};
function T(t, e) {
  const o = { ...e };
  for (const i in e) {
    const n = t[i],
      s = e[i];
    /^on[A-Z]/.test(i)
      ? n && s
        ? (o[i] = (...c) => {
            const u = s(...c);
            return (n(...c), u);
          })
        : n && (o[i] = n)
      : i === 'style'
        ? (o[i] = { ...n, ...s })
        : i === 'className' && (o[i] = [n, s].filter(Boolean).join(' '));
  }
  return { ...t, ...o };
}
function V(t) {
  var i, n;
  let e = (i = Object.getOwnPropertyDescriptor(t.props, 'ref')) == null ? void 0 : i.get,
    o = e && 'isReactWarning' in e && e.isReactWarning;
  return o
    ? t.ref
    : ((e = (n = Object.getOwnPropertyDescriptor(t, 'ref')) == null ? void 0 : n.get),
      (o = e && 'isReactWarning' in e && e.isReactWarning),
      o ? t.props.ref : t.props.ref || t.ref);
}
function W(t) {
  return (
    l.isValidElement(t) &&
    typeof t.type == 'function' &&
    '__radixId' in t.type &&
    t.type.__radixId === P
  );
}
var k = Symbol.for('react.lazy');
function b(t) {
  return (
    t != null &&
    typeof t == 'object' &&
    '$$typeof' in t &&
    t.$$typeof === k &&
    '_payload' in t &&
    A(t._payload)
  );
}
function A(t) {
  return typeof t == 'object' && t !== null && 'then' in t;
}
var F = (t) =>
    `${t} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
  M = (t) =>
    `${t} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
  v = C[' use '.trim().toString()],
  B = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  Q = B.reduce((t, e) => {
    const o = L(`Primitive.${e}`),
      i = l.forwardRef((n, s) => {
        const { asChild: r, ...c } = n,
          u = r ? o : e;
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          S.jsx(u, { ...c, ref: s })
        );
      });
    return ((i.displayName = `Primitive.${e}`), { ...t, [e]: i });
  }, {});
function X(t, e) {
  t && R.flushSync(() => t.dispatchEvent(e));
}
export { Q as P, q as a, g as b, G as c, J as d, K as e, L as f, Z as g, X as h, _ as i, j as u };
