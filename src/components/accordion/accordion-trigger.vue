<template>
  <button :class="triggerClasses" @click="handleClick" :aria-expanded="accordionItem.isOpen.value">
    <slot />
    <slot name="icon" :isOpen="accordionItem.isOpen.value">
      <ArrowDownIcon :class="[accordionStyles.icon, { 'rotate-180': accordionItem.isOpen.value }]" :size="20" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { accordionStyles, getAccordionTriggerClasses, type AccordionVariant } from '@/theme/accordion'
import { ArrowDownIcon } from '@/components/icons'
import type { ComputedRef } from 'vue'

const accordion = inject<{
  variant: AccordionVariant
}>('accordion')

const accordionItem = inject<{
  value: string
  isOpen: ComputedRef<boolean>
  toggle: () => void
}>('accordionItem')

if (!accordion || !accordionItem) {
  throw new Error('AccordionTrigger must be used within AccordionItem')
}

const triggerClasses = computed(() => getAccordionTriggerClasses(accordion.variant))

function handleClick() {
  accordionItem?.toggle()
}
</script>
