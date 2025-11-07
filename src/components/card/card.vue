<template>
  <div :class="cardStyles.container">
    <div v-if="$slots.header" :class="cardStyles.header">
      <slot name="header" />
    </div>
    <div v-if="$slots.content" :class="cardStyles.content">
      <slot name="content" />
    </div>
    <div v-if="$slots.footer" :class="cardStyles.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardStyles } from '@/theme/card'

export interface CardProps {}

defineProps<CardProps>()
</script>
