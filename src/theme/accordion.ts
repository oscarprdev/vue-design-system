export type AccordionVariant = 'default' | 'bordered' | 'filled'

export const accordionStyles = {
  container: 'w-full',

  item: {
    base: 'border-b border-gray-200 last:border-b-0',
    variants: {
      default: '',
      bordered: 'border border-gray-200 rounded-lg mb-2 last:mb-0',
      filled: 'bg-gray-50 border border-gray-200 rounded-lg mb-2 last:mb-0',
    } as Record<AccordionVariant, string>,
  },

  trigger: {
    base: 'w-full flex items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-gray-50 focus:outline-none',
    variants: {
      default: '',
      bordered: 'rounded-lg',
      filled: 'rounded-lg bg-gray-50 hover:bg-gray-100',
    } as Record<AccordionVariant, string>,
  },

  content: {
    base: 'overflow-hidden transition-all duration-300',
    inner: 'px-4 pb-4 pt-2 text-gray-600',
  },

  icon: 'transition-transform duration-300 text-gray-500',
}

/**
 * Get accordion item classes based on variant
 */
export function getAccordionItemClasses(variant: AccordionVariant = 'default'): string {
  return [
    accordionStyles.item.base,
    accordionStyles.item.variants[variant],
  ].join(' ')
}

/**
 * Get accordion trigger classes based on variant
 */
export function getAccordionTriggerClasses(variant: AccordionVariant = 'default'): string {
  return [
    accordionStyles.trigger.base,
    accordionStyles.trigger.variants[variant],
  ].join(' ')
}
