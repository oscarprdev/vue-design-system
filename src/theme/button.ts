export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonStyles = {
  base: 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100 focus:ring-gray-500',
    outline: 'border-2 border-black text-black hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-black hover:bg-gray-100 focus:ring-gray-500',
  } as Record<ButtonVariant, string>,

  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  } as Record<ButtonSize, string>,
}

/**
 * Get button classes based on variant and size
 */
export function getButtonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return [buttonStyles.base, buttonStyles.variants[variant], buttonStyles.sizes[size]].join(' ')
}
