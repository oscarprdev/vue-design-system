<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { DialogProps } from './dialog.types'
import { useClickOutside } from '../../composables/useClickOutside'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
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
const isAnimating = ref(false)
const contentRef = ref<HTMLElement | null>(null)

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

const shouldRender = ref(isOpen.value)
const showContent = computed(() => shouldRender.value && !isAnimating.value && isOpen.value)

watch(isOpen, (newValue, oldValue) => {
  if (newValue) {
    shouldRender.value = true
    isAnimating.value = true
    emit('open')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isAnimating.value = false
      })
    })
  } else if (oldValue) {
    isAnimating.value = true
    emit('close')
    setTimeout(() => {
      shouldRender.value = false
      isAnimating.value = false
    }, 150)
  }
})

watch(isOpen, open => {
  if (open) {
    activate()
  } else {
    deactivate()
  }
})

const close = () => {
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    close()
  }
}

useClickOutside(contentRef, () => {
  if (props.closeOnClickOutside && isOpen.value) {
    close()
  }
})

const { activate, deactivate } = useFocusTrap(contentRef, isOpen)

useBodyScrollLock(isOpen)
</script>

<template>
  <Teleport to="body">
    <div v-if="shouldRender" @keydown="handleKeydown">
      <!-- Backdrop -->
      <div
        :class="dialogStyles.backdrop"
        :style="{
          opacity: showContent ? '1' : '0',
          transition: showContent
            ? 'opacity 0.15s cubic-bezier(0, 0, 0.2, 1)'
            : 'opacity 0.15s cubic-bezier(0.4, 0, 1, 1)',
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
              transition: showContent
                ? 'opacity 0.15s cubic-bezier(0, 0, 0.2, 1), transform 0.15s cubic-bezier(0, 0, 0.2, 1)'
                : 'opacity 0.15s cubic-bezier(0.4, 0, 1, 1), transform 0.15s cubic-bezier(0.4, 0, 1, 1)',
            }"
          >
            <slot :close="close" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
