<template>
  <div :class="accordionStyles.container">
    <div v-for="item in items" :key="item.id" :class="itemClasses">
      <button :class="triggerClasses" @click="toggle(item.id)" :aria-expanded="isOpen(item.id)">
        <span>{{ item.trigger }}</span>
        <ArrowDownIcon
          :class="[accordionStyles.icon, { 'rotate-180': isOpen(item.id) }]"
          :size="20"
        />
      </button>
      <div
        :class="accordionStyles.content.base"
        :style="{ height: isOpen(item.id) ? contentHeights[item.id] + 'px' : '0px' }"
      >
        <div :ref="el => setContentRef(el, item.id)" :class="accordionStyles.content.inner">
          <p v-for="(paragraph, idx) in item.content" :key="idx">
            {{ paragraph }}
            <br v-if="idx < item.content.length - 1" />
          </p>
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
import { ArrowDownIcon } from '@/components/icons'

export interface AccordionItem {
  id: string
  trigger: string
  content: string[]
}

export interface AccordionProps {
  items: AccordionItem[]
  variant?: AccordionVariant
  multiple?: boolean
  defaultOpen?: string[]
}

const props = withDefaults(defineProps<AccordionProps>(), {
  variant: 'default',
  multiple: false,
  defaultOpen: () => [],
})

const emit = defineEmits<{
  change: [openIds: string[]]
}>()

const openIds = ref<string[]>(props.defaultOpen)
const contentHeights = ref<Record<string, number>>({})
const contentRefs = ref<Record<string, HTMLElement | null>>({})

const itemClasses = computed(() => getAccordionItemClasses(props.variant))
const triggerClasses = computed(() => getAccordionTriggerClasses(props.variant))

function setContentRef(el: any, id: string) {
  if (el) {
    contentRefs.value[id] = el as HTMLElement
  }
}

function isOpen(id: string): boolean {
  return openIds.value.includes(id)
}

function toggle(id: string) {
  if (isOpen(id)) {
    openIds.value = openIds.value.filter(i => i !== id)
  } else {
    if (props.multiple) {
      openIds.value.push(id)
    } else {
      openIds.value = [id]
    }
  }
  emit('change', openIds.value)
}

onMounted(async () => {
  await nextTick()
  props.items.forEach(item => {
    const ref = contentRefs.value[item.id]
    if (ref) {
      contentHeights.value[item.id] = ref.scrollHeight
    }
  })
})
</script>
