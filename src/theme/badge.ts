export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary'

export const badgeStyles = {
  base: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium',

  variants: {
    default: {
      solid: 'bg-gray-100 text-gray-800',
      outline: 'border border-gray-300 text-gray-700 bg-transparent',
    },
    primary: {
      solid: 'bg-primary-100 text-primary-800',
      outline: 'border border-primary-600 text-primary-700 bg-transparent',
    },
    success: {
      solid: 'bg-success-100 text-success-800',
      outline: 'border border-success-600 text-success-700 bg-transparent',
    },
    error: {
      solid: 'bg-error-100 text-error-800',
      outline: 'border border-error-600 text-error-700 bg-transparent',
    },
    warning: {
      solid: 'bg-warning-100 text-warning-800',
      outline: 'border border-warning-600 text-warning-700 bg-transparent',
    },
    info: {
      solid: 'bg-info-100 text-info-800',
      outline: 'border border-info-600 text-info-700 bg-transparent',
    },
  } as Record<BadgeVariant, { solid: string; outline: string }>,

  icon: 'w-3.5 h-3.5',
}

/**
 * Get badge classes based on variant and outline
 */
export function getBadgeClasses(variant: BadgeVariant = 'default', outline: boolean = false): string {
  const classes = [badgeStyles.base]

  if (outline) {
    classes.push(badgeStyles.variants[variant].outline)
  } else {
    classes.push(badgeStyles.variants[variant].solid)
  }

  return classes.join(' ')
}
