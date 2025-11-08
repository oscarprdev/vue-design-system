<script setup lang="ts">
import { computed } from 'vue'
import { badgeStyles, getBadgeClasses } from '@/theme/badge'
import type { BadgeProps } from './badge.types'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'info',
  outline: false,
})

const badgeClasses = computed(() => getBadgeClasses(props.variant, props.outline))
</script>

<template>
  <span :class="badgeClasses">
    <span v-if="$slots.iconLeft" :class="badgeStyles.icon">
      <slot name="iconLeft" />
    </span>
    <slot />
    <span v-if="$slots.iconRight" :class="badgeStyles.icon">
      <slot name="iconRight" />
    </span>
  </span>
</template>
