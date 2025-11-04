<template>
  <div :class="accordionStyles.container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { accordionStyles, type AccordionVariant } from '@/theme/accordion'

export interface AccordionRootProps {
  variant?: AccordionVariant
  multiple?: boolean
  defaultValue?: string[]
}

const props = withDefaults(defineProps<AccordionRootProps>(), {
  variant: 'default',
  multiple: false,
  defaultValue: () => [],
})

const emit = defineEmits<{
  change: [value: string[]]
}>()

const openItems = ref<string[]>(props.defaultValue)

function isOpen(value: string): boolean {
  return openItems.value.includes(value)
}

function toggle(value: string) {
  if (isOpen(value)) {
    openItems.value = openItems.value.filter((v) => v !== value)
  } else {
    if (props.multiple) {
      openItems.value = [...openItems.value, value]
    } else {
      openItems.value = [value]
    }
  }
  emit('change', openItems.value)
}

// Provide context to child components
provide('accordion', {
  variant: props.variant,
  isOpen,
  toggle,
})
</script>
