export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export const dialogStyles = {
  backdrop: 'fixed inset-0 z-[1500] bg-black/40 opacity-0 transition-opacity duration-150',
  dialog: {
    base: 'relative bg-white rounded-xl shadow-xl w-full m-auto',
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    },
  },
  header: 'flex items-center justify-between px-6 py-4 border-b border-neutral-200',
  title: 'text-lg font-semibold text-neutral-900',
  closeButton: 'text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg p-1.5 hover:bg-neutral-100',
  body: 'px-6 py-5 text-neutral-700 text-sm leading-relaxed',
  footer: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 bg-neutral-50',
}

export function getDialogClasses(size: DialogSize = 'md'): string {
  return `${dialogStyles.dialog.base} ${dialogStyles.dialog.sizes[size]}`
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
