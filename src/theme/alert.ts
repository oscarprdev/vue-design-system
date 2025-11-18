export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export const alertStyles = {
  base: 'rounded-lg p-4 flex gap-3 border shadow-sm',

  variants: {
    default: 'bg-neutral-50 text-neutral-900 border-neutral-200',
    success: 'bg-success-50 text-success-900 border-success-200',
    warning: 'bg-warning-50 text-warning-900 border-warning-200',
    error: 'bg-error-50 text-error-900 border-error-200',
    info: 'bg-info-50 text-info-900 border-info-200',
  } as Record<AlertVariant, string>,

  icon: {
    base: 'flex-shrink-0 w-5 h-5 mt-0.5',
    variants: {
      default: 'text-neutral-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
      info: 'text-info-600',
    } as Record<AlertVariant, string>,
  },

  content: 'flex-1',

  title: 'font-semibold text-sm mb-1',

  description: 'text-sm opacity-90 leading-relaxed',
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
