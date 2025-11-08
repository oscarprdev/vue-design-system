export type AccordionVariant = 'default' | 'bordered' | 'filled'

export const accordionStyles = {
  container: 'w-full',

  item: {
    base: 'border-b border-neutral-200 last:border-b-0',
    variants: {
      default: '',
      bordered: 'border border-neutral-200 rounded-lg mb-2 last:mb-0',
      filled: 'bg-neutral-50 border border-neutral-200 rounded-lg mb-2 last:mb-0',
    } as Record<AccordionVariant, string>,
  },

  trigger: {
    base: 'w-full flex items-center justify-between px-4 py-3.5 text-left text-neutral-900 font-medium transition-colors hover:bg-neutral-50 focus:outline-none rounded-lg',
    variants: {
      default: '',
      bordered: '',
      filled: 'bg-neutral-50 hover:bg-neutral-100',
    } as Record<AccordionVariant, string>,
  },

  content: {
    base: 'overflow-hidden transition-all duration-300',
    inner: 'px-4 pb-4 pt-1 text-neutral-600 text-sm leading-relaxed',
  },

  icon: 'transition-transform duration-300 text-neutral-500',
}

/**
 * Get accordion item classes based on variant
 */
export function getAccordionItemClasses(variant: AccordionVariant = 'default'): string {
  return [accordionStyles.item.base, accordionStyles.item.variants[variant]].join(' ')
}

/**
 * Get accordion trigger classes based on variant
 */
export function getAccordionTriggerClasses(variant: AccordionVariant = 'default'): string {
  return [accordionStyles.trigger.base, accordionStyles.trigger.variants[variant]].join(' ')
}
