<template>
  <button :class="buttonClasses" :disabled="disabled" :type="type" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getButtonClasses, type ButtonVariant, type ButtonSize } from '@/theme/button'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return getButtonClasses(props.variant, props.size)
})
</script>
