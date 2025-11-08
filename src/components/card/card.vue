<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './card.types'
import { cardStyles, getCardHeaderClasses, getCardFooterClasses } from '@/theme/card'

const props = withDefaults(defineProps<CardProps>(), {
  headerBordered: false,
  footerBordered: false,
  footerBackground: false,
})

const headerClasses = computed(() => getCardHeaderClasses(props.headerBordered))
const footerClasses = computed(() => getCardFooterClasses(props.footerBordered, props.footerBackground))
</script>

<template>
  <div :class="cardStyles.container">
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>
    <div v-if="$slots.content" :class="cardStyles.content">
      <slot name="content" />
    </div>
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>
