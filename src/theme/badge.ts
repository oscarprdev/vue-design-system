export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary'

export const badgeStyles = {
  base: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors duration-150',

  variants: {
    default: {
      solid: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
      outline: 'border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-50',
    },
    primary: {
      solid: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
      outline: 'border border-primary-200 text-primary-700 bg-white hover:bg-primary-50',
    },
    success: {
      solid: 'bg-success-50 text-success-700 hover:bg-success-100',
      outline: 'border border-success-200 text-success-700 bg-white hover:bg-success-50',
    },
    error: {
      solid: 'bg-error-50 text-error-700 hover:bg-error-100',
      outline: 'border border-error-200 text-error-700 bg-white hover:bg-error-50',
    },
    warning: {
      solid: 'bg-warning-50 text-warning-700 hover:bg-warning-100',
      outline: 'border border-warning-200 text-warning-700 bg-white hover:bg-warning-50',
    },
    info: {
      solid: 'bg-info-50 text-info-700 hover:bg-info-100',
      outline: 'border border-info-200 text-info-700 bg-white hover:bg-info-50',
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
