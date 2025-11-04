<template>
  <button :class="triggerClasses" @click="handleClick" :aria-expanded="accordionItem.isOpen.value">
    <slot />
    <slot name="icon" :isOpen="accordionItem.isOpen.value">
      <svg
        :class="[accordionStyles.icon, { 'rotate-180': accordionItem.isOpen.value }]"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { accordionStyles, getAccordionTriggerClasses, type AccordionVariant } from '@/theme/accordion'
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
