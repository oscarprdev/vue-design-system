export type DropdownSize = 'sm' | 'md' | 'lg'
export type DropdownVariant = 'default' | 'bordered'

export const dropdownStyles = {
  container: 'bg-white rounded-lg border-sm border-gray-200 shadow-sm overflow-hidden w-full',

  list: 'max-h-[300px] overflow-y-auto py-1',

  item: {
    base: 'flex items-center gap-2 py-2 cursor-pointer transition-colors duration-150 text-sm text-neutral-700',
    hover: 'hover:bg-neutral-100',
    selected: 'bg-primary-50 text-primary-700 font-medium',
    highlighted: 'bg-neutral-50',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    sizes: {
      sm: 'px-3',
      md: 'px-3',
      lg: 'px-4',
    } as Record<DropdownSize, string>,
  },

  trigger: {
    base: 'inline-flex items-center justify-between gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none border bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary-500/20',
    sizes: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    } as Record<DropdownSize, string>,
    variants: {
      default: 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50',
      bordered: 'border-neutral-300 hover:border-neutral-400',
    } as Record<DropdownVariant, string>,
  },

  placeholder: 'text-neutral-400',
  icon: 'transition-transform duration-200 text-neutral-500',
}

export function getDropdownTriggerClasses(size: DropdownSize = 'md', variant: DropdownVariant = 'default'): string {
  return [
    dropdownStyles.trigger.base,
    dropdownStyles.trigger.sizes[size],
    dropdownStyles.trigger.variants[variant],
  ].join(' ')
}

export function getDropdownItemClasses(
  isSelected: boolean,
  isHighlighted: boolean,
  isDisabled: boolean,
  size: DropdownSize = 'md'
): string {
  const classes = [dropdownStyles.item.base, dropdownStyles.item.hover, dropdownStyles.item.sizes[size]]

  if (isSelected) classes.push(dropdownStyles.item.selected)
  if (isHighlighted) classes.push(dropdownStyles.item.highlighted)
  if (isDisabled) classes.push(dropdownStyles.item.disabled)

  return classes.join(' ')
}
