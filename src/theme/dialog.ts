export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export const dialogStyles = {
  backdrop: 'fixed inset-0 z-[1500] bg-black/50',
  container: 'fixed inset-0 z-[1500] overflow-y-auto',
  wrapper: 'min-h-full flex items-center justify-center p-4',
  content: {
    base: 'relative bg-white rounded-xl shadow-2xl w-full',
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    },
  },
  header: 'flex items-center justify-between px-6 py-4 border-b border-gray-200',
  title: 'text-lg font-semibold text-gray-900',
  closeButton: 'text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100',
  body: 'px-6 py-4 text-gray-700',
  footer: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200',
}

export function getDialogClasses(size: DialogSize = 'md'): string {
  return `${dialogStyles.content.base} ${dialogStyles.content.sizes[size]}`
}

export function getDialogHeaderClasses(): string {
  return dialogStyles.header
}

export function getDialogBodyClasses(): string {
  return dialogStyles.body
}

export function getDialogFooterClasses(): string {
  return dialogStyles.footer
}
