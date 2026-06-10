import { j as n } from './jsx-runtime-Z5uAzocK.js';
import { r as e } from './index-pP6CS22B.js';
const i = e.createContext(null);
function v({ children: r }) {
  const a = e.useRef(null),
    u = e.useRef(null),
    [c, s] = e.useState(''),
    [l, t] = e.useState(''),
    d = e.useCallback((o, m = 'polite') => {
      m === 'assertive'
        ? (t(''), requestAnimationFrame(() => t(o)))
        : (s(''), requestAnimationFrame(() => s(o)));
    }, []);
  return (
    e.useEffect(
      () => () => {
        (s(''), t(''));
      },
      [],
    ),
    n.jsxs(i.Provider, {
      value: { announce: d },
      children: [
        r,
        n.jsx('div', {
          ref: a,
          role: 'status',
          'aria-live': 'polite',
          'aria-atomic': 'true',
          className: 'sr-only',
          children: c,
        }),
        n.jsx('div', {
          ref: u,
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
          className: 'sr-only',
          children: l,
        }),
      ],
    })
  );
}
function x() {
  const r = e.useContext(i);
  if (!r) throw new Error('useAnnounce must be used within AnnouncerProvider');
  return r;
}
v.__docgenInfo = {
  description: 'Provides aria-live regions for imperative screen reader announcements',
  methods: [],
  displayName: 'AnnouncerProvider',
  props: { children: { required: !0, tsType: { name: 'ReactNode' }, description: '' } },
};
export { v as A, x as u };
