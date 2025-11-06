<template>
  <div :class="alertClasses" role="alert">
    <div :class="iconClasses">
      <slot name="icon">
        <TickIcon v-if="variant === 'success'" :size="20" />
        <DangerIcon v-else-if="variant === 'warning'" :size="20" />
        <ErrorIcon v-else-if="variant === 'error'" :size="20" />
        <InfoIcon v-else :size="20" />
      </slot>
    </div>
    <div :class="alertStyles.content">
      <div v-if="title" :class="alertStyles.title">{{ title }}</div>
      <div v-if="description" :class="alertStyles.description">{{ description }}</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { alertStyles, getAlertClasses, getAlertIconClasses, type AlertVariant } from '@/theme/alert'
import { InfoIcon, TickIcon, DangerIcon, ErrorIcon } from '@/components/icons'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  description?: string
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default',
})

const alertClasses = computed(() => getAlertClasses(props.variant))
const iconClasses = computed(() => getAlertIconClasses(props.variant))
</script>
