export type DropdownSize = 'sm' | 'md' | 'lg'
export type DropdownVariant = 'default' | 'bordered'

export const dropdownStyles = {
  container: 'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden min-w-[200px]',

  list: 'max-h-[300px] overflow-y-auto p-2',

  item: {
    base: 'flex items-center gap-2 px-3 py-2 cursor-pointer transition-all rounded-md text-sm text-gray-900',
    hover: 'hover:bg-gray-100',
    selected: 'bg-primary-50 text-primary-900 font-medium',
    highlighted: 'bg-gray-50',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  },

  trigger: {
    base: 'inline-flex items-center justify-between gap-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 border bg-white disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    } as Record<DropdownSize, string>,
    variants: {
      default: 'border-gray-300 hover:border-gray-400',
      bordered: 'border-gray-400 hover:border-gray-500',
    } as Record<DropdownVariant, string>,
  },

  placeholder: 'text-gray-400',
  icon: 'transition-transform duration-200 text-gray-500',
}

export function getDropdownTriggerClasses(size: DropdownSize = 'md', variant: DropdownVariant = 'default'): string {
  return [
    dropdownStyles.trigger.base,
    dropdownStyles.trigger.sizes[size],
    dropdownStyles.trigger.variants[variant],
  ].join(' ')
}

export function getDropdownItemClasses(isSelected: boolean, isHighlighted: boolean, isDisabled: boolean): string {
  const classes = [dropdownStyles.item.base, dropdownStyles.item.hover]

  if (isSelected) classes.push(dropdownStyles.item.selected)
  if (isHighlighted) classes.push(dropdownStyles.item.highlighted)
  if (isDisabled) classes.push(dropdownStyles.item.disabled)

  return classes.join(' ')
}
