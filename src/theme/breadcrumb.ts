export const breadcrumbStyles = {
  container: 'flex items-center gap-2 text-sm',
  item: 'text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer hover:underline',
  currentItem: 'text-neutral-900 font-medium',
  separator: 'text-neutral-400',
  ellipsis: 'text-neutral-400',
}

/**
 * Get breadcrumb item classes
 */
export function getBreadcrumbItemClasses(isCurrent: boolean = false): string {
  return isCurrent ? breadcrumbStyles.currentItem : breadcrumbStyles.item
}
