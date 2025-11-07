<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useFloating, type Placement } from '@/composables/useFloating'
import { getPopoverClasses } from '@/theme/popover'

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  placement?: Placement
  offset?: number
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  trigger?: 'click' | 'hover' | 'manual'
  matchWidth?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: false,
  placement: 'bottom',
  offset: 8,
  closeOnClickOutside: true,
  closeOnEscape: true,
  trigger: 'click',
  matchWidth: false,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  open: []
  close: []
}>()

// Internal state for uncontrolled mode
const internalOpen = ref(props.defaultOpen)

// Determine if component is controlled
const isControlled = computed(() => props.open !== undefined)

// Computed open state
const isOpen = computed({
  get: () => (isControlled.value ? (props.open ?? false) : internalOpen.value),
  set: value => {
    if (isControlled.value) {
      emit('update:open', value)
    } else {
      internalOpen.value = value
    }
    if (value) {
      emit('open')
    } else {
      emit('close')
    }
  },
})

// Template refs
const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// Positioning
const placementRef = ref<Placement>(props.placement)
const { position, isPositioned } = useFloating(triggerRef, contentRef, placementRef, props.offset, isOpen, props.matchWidth)

// Animation state - keeps element mounted during close animation
const shouldRender = ref(false)
const isAnimating = ref(false)

// Computed style values for smooth open/close animations
const showContent = computed(() => isPositioned.value && isOpen.value && !isAnimating.value)

watch(isOpen, (newValue, oldValue) => {
  if (newValue) {
    shouldRender.value = true
    isAnimating.value = false
  } else if (oldValue) {
    // Start close animation
    isAnimating.value = true
    // Remove from DOM after animation completes
    setTimeout(() => {
      shouldRender.value = false
      isAnimating.value = false
      // Reset positioning state for next open
      nextTick(() => {
        isPositioned.value = false
      })
    }, 150) // Match transition duration
  }
})

// Click outside handling - exclude trigger from outside detection
useClickOutside(
  contentRef,
  () => {
    if (props.closeOnClickOutside && isOpen.value) {
      isOpen.value = false
    }
  },
  [triggerRef]
)

// Trigger handlers
const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    isOpen.value = !isOpen.value
  }
}

const handleTriggerMouseEnter = () => {
  if (props.trigger === 'hover') {
    isOpen.value = true
  }
}

const handleTriggerMouseLeave = () => {
  if (props.trigger === 'hover') {
    isOpen.value = false
  }
}

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Watch placement prop changes
watch(
  () => props.placement,
  newPlacement => {
    placementRef.value = newPlacement
  }
)

const popoverClasses = computed(() => getPopoverClasses())
</script>

<template>
  <div ref="containerRef" class="inline-block">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
    >
      <slot name="trigger" />
    </div>

    <!-- Popover content -->
    <Teleport to="body">
      <div
        v-if="shouldRender"
        ref="contentRef"
        :class="popoverClasses"
        :style="{
          top: position.top,
          left: position.left,
          width: position.width,
          opacity: showContent ? '1' : '0',
          transform: showContent ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
          transformOrigin: placement === 'top' ? 'bottom' : 'top',
        }"
        role="dialog"
        aria-modal="false"
      >
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>
