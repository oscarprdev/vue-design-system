export const cardStyles = {
  container: 'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',

  header: {
    base: 'px-6 py-4',
    withBorder: 'border-b border-gray-200',
  },

  content: 'px-6 py-4',

  footer: {
    base: 'px-6 py-4',
    withBorder: 'border-t border-gray-200',
    withBackground: 'bg-gray-50',
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
