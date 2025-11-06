<template>
  <div :class="accordionStyles.container">
    <div v-for="(item, index) in items" :key="index" :class="itemClasses">
      <button :class="triggerClasses" @click="toggle(index)" :aria-expanded="isOpen(index)">
        <span>{{ item.title }}</span>
        <svg
          :class="[accordionStyles.icon, { 'rotate-180': isOpen(index) }]"
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
      </button>
      <div
        :class="accordionStyles.content.base"
        :style="{ height: isOpen(index) ? contentHeights[index] + 'px' : '0px' }"
      >
        <div :ref="el => setContentRef(el, index)" :class="accordionStyles.content.inner">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  accordionStyles,
  getAccordionItemClasses,
  getAccordionTriggerClasses,
  type AccordionVariant,
} from '@/theme/accordion'

export interface AccordionItem {
  title: string
  content: string
}

export interface AccordionProps {
  items: AccordionItem[]
  variant?: AccordionVariant
  multiple?: boolean
  defaultOpen?: number[]
}

const props = withDefaults(defineProps<AccordionProps>(), {
  variant: 'default',
  multiple: false,
  defaultOpen: () => [],
})

defineEmits<{
  change: [openIndexes: number[]]
}>()

const openIndexes = ref<number[]>(props.defaultOpen)
const contentHeights = ref<number[]>([])
const contentRefs = ref<(HTMLElement | null)[]>([])

const itemClasses = computed(() => getAccordionItemClasses(props.variant))
const triggerClasses = computed(() => getAccordionTriggerClasses(props.variant))

function setContentRef(el: any, index: number) {
  if (el) {
    contentRefs.value[index] = el as HTMLElement
  }
}

function isOpen(index: number): boolean {
  return openIndexes.value.includes(index)
}

function toggle(index: number) {
  if (isOpen(index)) {
    openIndexes.value = openIndexes.value.filter(i => i !== index)
  } else {
    if (props.multiple) {
      openIndexes.value.push(index)
    } else {
      openIndexes.value = [index]
    }
  }
}

onMounted(async () => {
  await nextTick()
  contentHeights.value = contentRefs.value.map(ref => ref?.scrollHeight || 0)
})
</script>
