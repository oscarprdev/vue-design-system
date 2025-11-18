<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { DialogProps } from './dialog.types'
import { getDialogClasses, dialogStyles } from '../../theme/dialog'

const props = withDefaults(defineProps<DialogProps>(), {
  size: 'md',
  closeOnClickOutside: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  open: []
  close: []
}>()

const internalOpen = ref(props.defaultOpen ?? false)
const dialogRef = ref<HTMLDialogElement | null>(null)
const backdropRef = ref<HTMLElement | null>(null)

const isControlled = computed(() => props.open !== undefined)

const isOpen = computed({
  get: () => (isControlled.value ? props.open : internalOpen.value) ?? false,
  set: value => {
    if (!isControlled.value) {
      internalOpen.value = value
    }
    emit('update:open', value)
  },
})

watch(
  isOpen,
  async newValue => {
    if (!dialogRef.value) return

    if (newValue) {
      dialogRef.value.showModal()
      emit('open')
      await nextTick()
      dialogRef.value.classList.add('dialog-open')
      if (backdropRef.value) {
        backdropRef.value.classList.add('backdrop-open')
      }
    } else {
      dialogRef.value.classList.remove('dialog-open')
      if (backdropRef.value) {
        backdropRef.value.classList.remove('backdrop-open')
      }
      emit('close')
      setTimeout(() => {
        if (dialogRef.value) {
          dialogRef.value.close()
        }
      }, 150)
    }
  },
  { immediate: true }
)

const close = () => {
  isOpen.value = false
}

const handleCancel = (event: Event) => {
  if (!props.closeOnEscape) {
    event.preventDefault()
  } else {
    close()
  }
}

const handleClick = (event: MouseEvent) => {
  if (!props.closeOnClickOutside || !dialogRef.value) return

  const rect = dialogRef.value.getBoundingClientRect()
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom

  if (!isInDialog) {
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div v-if="isOpen" ref="backdropRef" :class="dialogStyles.backdrop" />

    <!-- Native Dialog -->
    <dialog ref="dialogRef" :class="getDialogClasses(size)" @cancel="handleCancel" @click="handleClick">
      <slot :close="close" />
    </dialog>
  </Teleport>
</template>

<style scoped>
dialog {
  border: none;
  padding: 0;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 0.15s cubic-bezier(0.4, 0, 1, 1),
    transform 0.15s cubic-bezier(0.4, 0, 1, 1),
    overlay 0.15s allow-discrete,
    display 0.15s allow-discrete;
}

dialog.dialog-open {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.15s cubic-bezier(0, 0, 0.2, 1),
    transform 0.15s cubic-bezier(0, 0, 0.2, 1);
}

dialog::backdrop {
  background: transparent;
}

.backdrop-open {
  opacity: 1 !important;
  transition: opacity 0.15s cubic-bezier(0, 0, 0.2, 1) !important;
}
</style>
