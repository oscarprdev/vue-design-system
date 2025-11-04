export type AlertVariant = 'default' | 'success' | 'warning' | 'error'

export const alertStyles = {
  base: 'rounded-lg p-4 flex gap-3',

  variants: {
    default: 'bg-gray-100 text-gray-900 border border-gray-200',
    success: 'bg-green-50 text-green-900 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-900 border border-yellow-200',
    error: 'bg-red-50 text-red-900 border border-red-200',
  } as Record<AlertVariant, string>,

  icon: {
    base: 'flex-shrink-0 w-5 h-5 mt-0.5',
    variants: {
      default: 'text-gray-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
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
