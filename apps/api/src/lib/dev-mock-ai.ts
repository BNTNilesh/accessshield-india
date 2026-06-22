/** Rule-based fix suggestions when Claude is unavailable in local development. */

export function buildDevMockFix(
  ruleId: string,
  elementHtml: string,
  description: string,
  wcagCriterion: string,
): { fixHtml: string; explanation: string } {
  const altRules = ['image-alt', 'input-image-alt', 'area-alt', 'object-alt'];
  if (altRules.some((r) => ruleId.includes(r))) {
    const fixHtml = elementHtml.includes('alt=')
      ? elementHtml.replace(/alt="[^"]*"/i, 'alt="[Describe the image purpose]"')
      : elementHtml.replace(/<img\b/i, '<img alt="[Describe the image purpose]"');
    return {
      fixHtml,
      explanation:
        'Images require a text alternative under WCAG 1.1.1. Replace the placeholder with a concise description of the image content or function.',
    };
  }

  if (
    ruleId.includes('label') ||
    (elementHtml.includes('<input') && !/aria-label|id=/.test(elementHtml))
  ) {
    const fixHtml = elementHtml.replace(/<input\b/i, '<input aria-label="[Visible field label]"');
    return {
      fixHtml,
      explanation:
        'Every form control needs a visible label or an accessible name via aria-label / aria-labelledby (WCAG 1.3.1, 4.1.2).',
    };
  }

  if (ruleId.includes('link') || elementHtml.includes('<a ')) {
    const fixHtml = elementHtml.replace(
      /<a\b([^>]*)>(\s*)<\/a>/i,
      '<a$1>[Describe link purpose]</a>',
    );
    return {
      fixHtml,
      explanation:
        'Links must have discernible text that describes their purpose (WCAG 2.4.4). Avoid empty or vague link text like "click here".',
    };
  }

  return {
    fixHtml: `<!-- Dev preview fix for ${ruleId} (WCAG ${wcagCriterion}) -->\n${elementHtml}`,
    explanation: `${description}\n\nDevelopment preview: set ANTHROPIC_API_KEY in apps/ai-service/.env for full AI-generated fixes. Minimum change: review this element against WCAG ${wcagCriterion} and update markup or ARIA as needed.`,
  };
}

export function buildDevMockAltText(ruleId: string): string {
  if (ruleId.includes('image')) {
    return 'Company logo — AccessShield India';
  }
  return 'Decorative or informational image on the page';
}
