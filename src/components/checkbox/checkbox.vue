<template>
  <label :class="checkboxStyles.container">
    <input type="checkbox" :id="id" :checked="checked" @change="handleChange" :class="checkboxStyles.input" />
    <span :class="checkboxStyles.customCheckbox">
      <CheckboxCheckedIcon v-if="checked" :size="24" />
      <CheckboxUncheckedIcon v-else :size="24" />
    </span>
    <span v-if="label" :class="checkboxStyles.label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { checkboxStyles } from '@/theme/checkbox'
import { CheckboxCheckedIcon, CheckboxUncheckedIcon } from '@/components/icons'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  id?: string
}

withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
})

const emit = defineEmits<{
  change: [checked: boolean]
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.checked)
}
</script>
