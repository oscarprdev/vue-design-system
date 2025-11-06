export const breadcrumbStyles = {
  container: 'flex items-center gap-2 text-sm',
  item: 'text-gray-600 hover:text-gray-900 transition-colors cursor-pointer',
  currentItem: 'text-gray-900 font-medium',
  separator: 'text-gray-400',
  ellipsis: 'text-gray-400',
}

/**
 * Get breadcrumb item classes
 */
export function getBreadcrumbItemClasses(isCurrent: boolean = false): string {
  return isCurrent ? breadcrumbStyles.currentItem : breadcrumbStyles.item
}
