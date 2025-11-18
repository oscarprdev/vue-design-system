<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DropdownProps, DropdownItem } from './dropdown.types'
import Popover from '../popover/popover.vue'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import { getDropdownTriggerClasses, getDropdownItemClasses, dropdownStyles } from '@/theme/dropdown'

const props = withDefaults(defineProps<DropdownProps>(), {
  modelValue: undefined,
  placeholder: 'Select an option',
  disabled: false,
  size: 'md',
  variant: 'default',
  placement: 'bottom',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const isOpen = ref(false)

const selectedValue = computed({
  get: () => props.modelValue,
  set: value => {
    if (value !== undefined) {
      emit('update:modelValue', value)
      emit('change', value)
    }
  },
})

const displayValue = computed(() => {
  const selectedItem = props.items.find(item => item.value === selectedValue.value)
  return selectedItem?.label
})

const triggerClasses = computed(() => getDropdownTriggerClasses(props.size, props.variant))

const placeholderClasses = computed(() => {
  return displayValue.value ? '' : dropdownStyles.placeholder
})

const iconClasses = computed(() => {
  return [dropdownStyles.icon, isOpen.value ? 'rotate-180' : ''].join(' ')
})

const selectItem = (item: DropdownItem) => {
  if (item.disabled) return
  selectedValue.value = item.value
  isOpen.value = false
}

const isSelected = (item: DropdownItem) => {
  return item.value === selectedValue.value
}

const getItemClasses = (item: DropdownItem, index: number) => {
  return getDropdownItemClasses(isSelected(item), highlightedIndex.value === index, item.disabled || false, props.size)
}

const itemsRef = computed(() => props.items)
const { highlightedIndex, handleKeydown, setHighlightedIndex } = useKeyboardNavigation(itemsRef, selectItem, isOpen)
</script>

<template>
  <Popover v-model:open="isOpen" :placement="placement" trigger="click" match-width @close="highlightedIndex = -1">
    <template #trigger>
      <button :class="triggerClasses" :disabled="disabled" type="button">
        <span :class="placeholderClasses">
          {{ displayValue || placeholder }}
        </span>
        <svg
          :class="iconClasses"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </template>

    <template #content>
      <ul
        :class="dropdownStyles.container"
        role="listbox"
        :aria-activedescendant="highlightedIndex !== -1 ? `item-${highlightedIndex}` : undefined"
        @keydown="handleKeydown"
        tabindex="0"
      >
        <li
          v-for="(item, index) in items"
          :key="item.value"
          :id="`item-${index}`"
          :class="getItemClasses(item, index)"
          :aria-selected="isSelected(item)"
          :aria-disabled="item.disabled"
          role="option"
          @click="selectItem(item)"
          @mouseenter="setHighlightedIndex(index)"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </template>
  </Popover>
</template>
