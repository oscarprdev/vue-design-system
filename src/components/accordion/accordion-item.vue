<template>
  <div :class="itemClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { getAccordionItemClasses, type AccordionVariant } from '@/theme/accordion'

export interface AccordionItemProps {
  value: string
}

const props = defineProps<AccordionItemProps>()

const accordion = inject<{
  variant: AccordionVariant
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
}>('accordion')

if (!accordion) {
  throw new Error('AccordionItem must be used within AccordionRoot')
}

const itemClasses = computed(() => getAccordionItemClasses(accordion.variant))

const isOpen = computed(() => accordion.isOpen(props.value))

// Provide context to trigger and content
provide('accordionItem', {
  value: props.value,
  isOpen,
  toggle: () => accordion.toggle(props.value),
})
</script>
