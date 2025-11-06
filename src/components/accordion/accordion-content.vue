<template>
  <div
    :class="accordionStyles.content.base"
    :style="{ height: accordionItem.isOpen.value ? contentHeight + 'px' : '0px' }"
  >
    <div ref="contentRef" :class="accordionStyles.content.inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, nextTick, watch } from 'vue'
import { accordionStyles } from '@/theme/accordion'
import type { ComputedRef } from 'vue'

const accordionItem = inject<{
  value: string
  isOpen: ComputedRef<boolean>
  toggle: () => void
}>('accordionItem')

if (!accordionItem) {
  throw new Error('AccordionContent must be used within AccordionItem')
}

const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

function updateHeight() {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
}

onMounted(async () => {
  await nextTick()
  updateHeight()
})

// Update height when content changes
watch(
  () => accordionItem.isOpen.value,
  async () => {
    await nextTick()
    updateHeight()
  }
)
</script>
