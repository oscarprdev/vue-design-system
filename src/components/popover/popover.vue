<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
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
}

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: false,
  placement: 'bottom',
  offset: 8,
  closeOnClickOutside: true,
  closeOnEscape: true,
  trigger: 'click',
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
const { position, isPositioned } = useFloating(triggerRef, contentRef, placementRef, props.offset, isOpen)

// Click outside handling
useClickOutside(contentRef, () => {
  if (props.closeOnClickOutside && isOpen.value) {
    isOpen.value = false
  }
})

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
        v-if="isOpen"
        ref="contentRef"
        :class="popoverClasses"
        :style="{
          top: position.top,
          left: position.left,
          opacity: isPositioned ? '1' : '0',
          transition: 'opacity 0.1s ease-in-out',
        }"
        role="dialog"
        aria-modal="false"
      >
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>
