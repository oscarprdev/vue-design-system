<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDialog } from '../../composables/useDialog'
import { useClickOutside } from '../../composables/useClickOutside'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
import { getDialogClasses, dialogStyles, type DialogSize } from '../../theme/dialog'

const { state, close } = useDialog()

const shouldRender = ref(false)
const isAnimating = ref(false)
const backdropRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const size = computed(() => (state.value.props.size as DialogSize) || 'md')
const closeOnClickOutside = computed(
  () => state.value.props.closeOnClickOutside !== false // default true
)
const closeOnEscape = computed(() => state.value.props.closeOnEscape !== false) // default true
const showContent = computed(() => shouldRender.value && !isAnimating.value && state.value.isOpen)

watch(
  () => state.value.isOpen,
  (newValue, oldValue) => {
    if (newValue) {
      shouldRender.value = true
      isAnimating.value = true
      // Use double rAF to ensure browser has painted the initial state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isAnimating.value = false
        })
      })
    } else if (oldValue) {
      isAnimating.value = true
      setTimeout(() => {
        shouldRender.value = false
        isAnimating.value = false
      }, 150) // Match transition duration
    }
  }
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && closeOnEscape.value) {
    close()
  }
}

useClickOutside(contentRef, () => {
  if (closeOnClickOutside.value && state.value.isOpen) {
    close()
  }
})

const { activate, deactivate } = useFocusTrap(
  contentRef,
  computed(() => state.value.isOpen)
)

watch(
  () => state.value.isOpen,
  isOpen => {
    if (isOpen) {
      activate()
    } else {
      deactivate()
    }
  }
)

useBodyScrollLock(computed(() => state.value.isOpen))
</script>

<template>
  <Teleport to="body">
    <div v-if="shouldRender" @keydown="handleKeydown">
      <!-- Backdrop -->
      <div
        ref="backdropRef"
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
            <component :is="state.component" v-if="state.component" v-bind="state.props" @close="close" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
