<script setup lang="ts">
import { getDialogHeaderClasses, dialogStyles } from '../../theme/dialog'
import type { DialogHeaderProps } from './dialog-header.types'

const props = withDefaults(defineProps<DialogHeaderProps>(), {
  showClose: true,
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div :class="getDialogHeaderClasses()">
    <div :class="dialogStyles.title">
      <slot />
    </div>
    <button
      v-if="props.showClose"
      type="button"
      :class="dialogStyles.closeButton"
      aria-label="Close dialog"
      @click="handleClose"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>
