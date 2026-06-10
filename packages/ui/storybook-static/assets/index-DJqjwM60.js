import { r as u, o } from './index-pP6CS22B.js';
import { u as n } from './index-CPotrtYk.js';
function d(e) {
  const t = u.useRef(e);
  return (
    u.useEffect(() => {
      t.current = e;
    }),
    u.useMemo(
      () =>
        (...s) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...s);
        },
      [],
    )
  );
}
var a = o[' useId '.trim().toString()] || (() => {}),
  i = 0;
function m(e) {
  const [t, s] = u.useState(a());
  return (
    n(() => {
      s((r) => r ?? String(i++));
    }, [e]),
    t ? `radix-${t}` : ''
  );
}
export { d as a, m as u };
