export const cardStyles = {
  container: 'bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden transition-shadow duration-150 hover:shadow-sm',

  header: {
    base: 'px-6 py-4',
    withBorder: 'border-b border-neutral-200',
  },

  content: 'px-6 py-5',

  footer: {
    base: 'px-6 py-4',
    withBorder: 'border-t border-neutral-200',
    withBackground: 'bg-neutral-50',
  },
}

/**
 * Get header classes based on options
 */
export function getCardHeaderClasses(bordered: boolean = true): string {
  return bordered ? `${cardStyles.header.base} ${cardStyles.header.withBorder}` : cardStyles.header.base
}

/**
 * Get footer classes based on options
 */
export function getCardFooterClasses(bordered: boolean = true, background: boolean = false): string {
  const classes = [cardStyles.footer.base]

  if (bordered) classes.push(cardStyles.footer.withBorder)
  if (background) classes.push(cardStyles.footer.withBackground)

  return classes.join(' ')
}
