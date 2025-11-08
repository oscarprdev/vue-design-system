<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { PopoverProps } from './popover.types'
import type { Placement } from '@/composables/useFloating'
import { useClickOutside } from '@/composables/useClickOutside'
import { useFloating } from '@/composables/useFloating'
import { getPopoverClasses } from '@/theme/popover'

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

const internalOpen = ref(props.defaultOpen)
const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const placementRef = ref<Placement>(props.placement)
const shouldRender = ref(false)
const isAnimating = ref(false)

const isControlled = computed(() => props.open !== undefined)

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

const showContent = computed(() => isPositioned.value && isOpen.value && !isAnimating.value)
const popoverClasses = computed(() => getPopoverClasses())

watch(isOpen, (newValue, oldValue) => {
  if (newValue) {
    shouldRender.value = true
    isAnimating.value = false
  } else if (oldValue) {
    isAnimating.value = true
    setTimeout(() => {
      shouldRender.value = false
      isAnimating.value = false
      nextTick(() => {
        isPositioned.value = false
      })
    }, 150)
  }
})

watch(
  () => props.placement,
  newPlacement => {
    placementRef.value = newPlacement
  }
)

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

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    isOpen.value = false
  }
}

const { position, isPositioned } = useFloating(
  triggerRef,
  contentRef,
  placementRef,
  props.offset,
  isOpen,
  props.matchWidth
)

useClickOutside(contentRef, () => {
  if (props.closeOnClickOutside && isOpen.value) {
    isOpen.value = false
  }
}, [triggerRef])

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
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
