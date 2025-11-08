export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-sm active:bg-primary-800 active:scale-[0.98]',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:shadow-xs active:bg-neutral-300',
    success: 'bg-success-600 text-white hover:bg-success-700 hover:shadow-sm active:bg-success-800 active:scale-[0.98]',
    error: 'bg-error-600 text-white hover:bg-error-700 hover:shadow-sm active:bg-error-800 active:scale-[0.98]',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 hover:shadow-sm active:bg-warning-800 active:scale-[0.98]',
    outline: 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:bg-neutral-100',
    ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200',
  } as Record<ButtonVariant, string>,

  sizes: {
    sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
    md: 'h-10 px-4 text-sm gap-2 rounded-lg',
    lg: 'h-11 px-5 text-base gap-2 rounded-lg',
  } as Record<ButtonSize, string>,
}

/**
 * Get button classes based on variant and size
 */
export function getButtonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return [buttonStyles.base, buttonStyles.variants[variant], buttonStyles.sizes[size]].join(' ')
}
