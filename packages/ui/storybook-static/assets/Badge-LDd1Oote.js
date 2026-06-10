import { j as a } from './jsx-runtime-Z5uAzocK.js';
import { c as p } from './index-Csjf2uca.js';
import { c } from './cn-D6O4h8v-.js';
import { M as g, I as f, A as x, a as y } from './icons-nm7YP-nX.js';
const e = {
    critical: { label: 'Critical', icon: y, className: 'bg-red-100 text-red-800 border-red-200' },
    serious: {
      label: 'Serious',
      icon: x,
      className: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    moderate: {
      label: 'Moderate',
      icon: f,
      className: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    minor: { label: 'Minor', icon: g, className: 'bg-gray-100 text-gray-700 border-gray-200' },
  },
  l = p('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium', {
    variants: {
      severity: {
        critical: e.critical.className,
        serious: e.serious.className,
        moderate: e.moderate.className,
        minor: e.minor.className,
      },
      variant: {
        default: 'bg-primary-light text-primary-dark border-primary/20',
        accent: 'bg-accent-light text-accent-700 border-accent/20',
        success: 'bg-success-100 text-success-700 border-success-700/20',
        outline: 'bg-white text-text-secondary border-border',
      },
    },
    defaultVariants: { variant: 'default' },
  });
function m({ severity: r, variant: d, label: s, children: t, className: i, ...o }) {
  if (r) {
    const n = e[r],
      u = n.icon,
      b = s ?? n.label;
    return a.jsxs('span', {
      className: c(l({ severity: r }), i),
      ...o,
      children: [a.jsx(u, { size: 12, 'aria-hidden': 'true' }), a.jsx('span', { children: b }), t],
    });
  }
  return a.jsx('span', { className: c(l({ variant: d }), i), ...o, children: s ?? t });
}
m.displayName = 'Badge';
m.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Badge',
  props: {
    severity: {
      required: !1,
      tsType: {
        name: 'union',
        raw: 'keyof typeof severityConfig',
        elements: [
          { name: 'literal', value: 'critical' },
          { name: 'literal', value: 'serious' },
          { name: 'literal', value: 'moderate' },
          { name: 'literal', value: 'minor' },
        ],
      },
      description: 'Severity uses icon + text + colour — never colour alone (WCAG 1.4.1)',
    },
    label: { required: !1, tsType: { name: 'string' }, description: '' },
  },
  composes: ['HTMLAttributes', 'VariantProps'],
};
export { m as B };
