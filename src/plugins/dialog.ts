import type { App, Component } from 'vue'
import { useDialog, type DialogOptions } from '../composables/useDialog'
import DialogProvider from '../components/dialog/dialog-provider.vue'

export interface DialogPlugin {
  open: (component: Component, options?: DialogOptions) => void
  close: () => Promise<void>
}

export const DialogPlugin = {
  install(app: App) {
    const { open, close } = useDialog()

    // Make dialog methods available globally
    app.config.globalProperties.$dialog = {
      open,
      close,
    }

    // Auto-mount DialogProvider if not already mounted
    // Note: Users should manually add <DialogProvider /> to their app root
    // This is just to make the composable available
  },
}

// Augment Vue types
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: DialogPlugin
  }
}

export { DialogProvider }
