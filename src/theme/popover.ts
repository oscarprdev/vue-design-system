export const popoverStyles = {
  base: 'absolute z-50 bg-white rounded-lg border border-neutral-200 shadow-md',
  content: 'p-4 text-sm text-neutral-700',
}

export function getPopoverClasses(): string {
  return popoverStyles.base
}
