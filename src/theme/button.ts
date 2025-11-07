export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 shadow-sm',
    success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm',
    error: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 active:bg-warning-800 shadow-sm',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  } as Record<ButtonVariant, string>,

  sizes: {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2',
  } as Record<ButtonSize, string>,
}

/**
 * Get button classes based on variant and size
 */
export function getButtonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return [buttonStyles.base, buttonStyles.variants[variant], buttonStyles.sizes[size]].join(' ')
}
