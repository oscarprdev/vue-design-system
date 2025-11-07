export const popoverStyles = {
  base: 'absolute z-50 bg-white rounded-lg border border-gray-200 shadow-lg',
  content: 'p-4',
}

export function getPopoverClasses(): string {
  return popoverStyles.base
}
