<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './button.types'
import { getButtonClasses } from '@/theme/button'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return getButtonClasses(props.variant, props.size)
})
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled" :type="type" @click="emit('click', $event)">
    <slot />
  </button>
</template>
