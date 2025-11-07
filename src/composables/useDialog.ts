import { ref, shallowRef, type Component } from 'vue'

export interface DialogOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  onClose?: () => Promise<void> | void
  [key: string]: unknown
}

interface DialogState {
  isOpen: boolean
  component: Component | null
  props: Record<string, unknown>
}

const state = ref<DialogState>({
  isOpen: false,
  component: null,
  props: {},
})

export function useDialog() {
  const open = (component: Component, options: DialogOptions = {}) => {
    // Close any existing dialog first
    if (state.value.isOpen) {
      close()
    }

    state.value = {
      isOpen: true,
      component: shallowRef(component).value,
      props: options,
    }
  }

  const close = async () => {
    const onClose = state.value.props.onClose as (() => Promise<void> | void) | undefined

    if (onClose) {
      await onClose()
    }

    state.value = {
      isOpen: false,
      component: null,
      props: {},
    }
  }

  return {
    state,
    open,
    close,
  }
}
