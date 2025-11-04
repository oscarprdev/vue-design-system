export type AlertVariant = 'default' | 'success' | 'warning' | 'error'

export const alertStyles = {
  base: 'rounded-lg p-4 flex gap-3',

  variants: {
    default: 'bg-stone-100 text-stone-900 border border-stone-200',
    success: 'bg-emerald-50 text-emerald-900 border border-emerald-200',
    warning: 'bg-orange-50 text-orange-900 border border-orange-200',
    error: 'bg-red-50 text-red-900 border border-red-200',
  } as Record<AlertVariant, string>,

  icon: {
    base: 'flex-shrink-0 w-5 h-5 mt-0.5',
    variants: {
      default: 'text-stone-600',
      success: 'text-emerald-600',
      warning: 'text-orange-600',
      error: 'text-red-600',
    } as Record<AlertVariant, string>,
  },

  content: 'flex-1',

  title: 'font-semibold text-sm mb-1',

  description: 'text-sm opacity-90',
}

/**
 * Get alert classes based on variant
 */
export function getAlertClasses(variant: AlertVariant = 'default'): string {
  return [alertStyles.base, alertStyles.variants[variant]].join(' ')
}

/**
 * Get alert icon classes based on variant
 */
export function getAlertIconClasses(variant: AlertVariant = 'default'): string {
  return [alertStyles.icon.base, alertStyles.icon.variants[variant]].join(' ')
}
