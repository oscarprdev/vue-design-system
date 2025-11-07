<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useClickOutside } from '../../composables/useClickOutside'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
import { getDialogClasses, dialogStyles, type DialogSize } from '../../theme/dialog'

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  size?: DialogSize
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}

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

// Internal state
const internalOpen = ref(props.defaultOpen ?? false)

// Controlled/uncontrolled pattern
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

// Animation state
const shouldRender = ref(isOpen.value)
const isAnimating = ref(false)

// Refs for composables
const contentRef = ref<HTMLElement | null>(null)

// Computed for animation
const showContent = computed(() => shouldRender.value && !isAnimating.value && isOpen.value)

// Animation watcher
watch(isOpen, (newValue, oldValue) => {
  if (newValue) {
    shouldRender.value = true
    isAnimating.value = false
    emit('open')
  } else if (oldValue) {
    isAnimating.value = true
    emit('close')
    setTimeout(() => {
      shouldRender.value = false
      isAnimating.value = false
    }, 150) // Match transition duration
  }
})

// Close handler
const close = () => {
  isOpen.value = false
}

// Click outside handling
useClickOutside(contentRef, () => {
  if (props.closeOnClickOutside && isOpen.value) {
    close()
  }
})

// Focus trap
const { activate, deactivate } = useFocusTrap(contentRef, isOpen)

watch(isOpen, open => {
  if (open) {
    activate()
  } else {
    deactivate()
  }
})

// Body scroll lock
useBodyScrollLock(isOpen)

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="shouldRender" @keydown="handleKeydown">
      <!-- Backdrop -->
      <div
        :class="dialogStyles.backdrop"
        :style="{
          opacity: showContent ? '1' : '0',
          transition: 'opacity 0.15s ease-out',
        }"
      />

      <!-- Dialog Container -->
      <div :class="dialogStyles.container">
        <div :class="dialogStyles.wrapper">
          <!-- Dialog Content -->
          <div
            ref="contentRef"
            role="dialog"
            aria-modal="true"
            :class="getDialogClasses(size)"
            :style="{
              opacity: showContent ? '1' : '0',
              transform: showContent ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            }"
          >
            <slot :close="close" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
