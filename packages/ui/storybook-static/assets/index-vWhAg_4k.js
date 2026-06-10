import { r as t } from './index-pP6CS22B.js';
import { a as y, b as S, f as M } from './index-CPotrtYk.js';
import { j as d } from './jsx-runtime-Z5uAzocK.js';
function L(l) {
  const i = l + 'CollectionProvider',
    [E, A] = y(i),
    [N, f] = E(i, { collectionRef: { current: null }, itemMap: new Map() }),
    p = (n) => {
      const { scope: e, children: s } = n,
        o = t.useRef(null),
        c = t.useRef(new Map()).current;
      return d.jsx(N, { scope: e, itemMap: c, collectionRef: o, children: s });
    };
  p.displayName = i;
  const u = l + 'CollectionSlot',
    v = M(u),
    C = t.forwardRef((n, e) => {
      const { scope: s, children: o } = n,
        c = f(u, s),
        r = S(e, c.collectionRef);
      return d.jsx(v, { ref: r, children: o });
    });
  C.displayName = u;
  const m = l + 'CollectionItemSlot',
    x = 'data-radix-collection-item',
    T = M(m),
    R = t.forwardRef((n, e) => {
      const { scope: s, children: o, ...c } = n,
        r = t.useRef(null),
        I = S(e, r),
        a = f(m, s);
      return (
        t.useEffect(() => (a.itemMap.set(r, { ref: r, ...c }), () => void a.itemMap.delete(r))),
        d.jsx(T, { [x]: '', ref: I, children: o })
      );
    });
  R.displayName = m;
  function O(n) {
    const e = f(l + 'CollectionConsumer', n);
    return t.useCallback(() => {
      const o = e.collectionRef.current;
      if (!o) return [];
      const c = Array.from(o.querySelectorAll(`[${x}]`));
      return Array.from(e.itemMap.values()).sort(
        (a, _) => c.indexOf(a.ref.current) - c.indexOf(_.ref.current),
      );
    }, [e.collectionRef, e.itemMap]);
  }
  return [{ Provider: p, Slot: C, ItemSlot: R }, O, A];
}
var D = t.createContext(void 0);
function b(l) {
  const i = t.useContext(D);
  return l || i || 'ltr';
}
export { L as c, b as u };
