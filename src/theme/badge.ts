export type BadgeVariant = 'success' | 'error' | 'warning' | 'info'

export const badgeStyles = {
  base: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium',

  variants: {
    success: {
      solid: 'bg-emerald-300 text-emerald-800',
      outline: 'border border-emerald-600 text-emerald-800 bg-transparent',
    },
    error: {
      solid: 'bg-red-300 text-red-800',
      outline: 'border border-red-600 text-red-800 bg-transparent',
    },
    warning: {
      solid: 'bg-orange-300 text-orange-800',
      outline: 'border border-orange-600 text-orange-800 bg-transparent',
    },
    info: {
      solid: 'bg-blue-300 text-blue-800',
      outline: 'border border-blue-600 text-blue-800 bg-transparent',
    },
  } as Record<BadgeVariant, { solid: string; outline: string }>,

  icon: 'w-3.5 h-3.5',
}

/**
 * Get badge classes based on variant and outline
 */
export function getBadgeClasses(variant: BadgeVariant = 'info', outline: boolean = false): string {
  const classes = [badgeStyles.base]

  if (outline) {
    classes.push(badgeStyles.variants[variant].outline)
  } else {
    classes.push(badgeStyles.variants[variant].solid)
  }

  return classes.join(' ')
}
