<script setup lang="ts">
import { ref, computed } from 'vue'
import Popover from '../popover/popover.vue'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import {
  getDropdownTriggerClasses,
  getDropdownItemClasses,
  dropdownStyles,
  type DropdownSize,
  type DropdownVariant,
} from '@/theme/dropdown'

export interface DropdownItem {
  value: string
  label: string
  disabled?: boolean
}

export interface DropdownProps {
  items: DropdownItem[]
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  size?: DropdownSize
  variant?: DropdownVariant
  placement?: 'top' | 'bottom'
}

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

// Popover state
const isOpen = ref(false)

// Selected value
const selectedValue = computed({
  get: () => props.modelValue,
  set: value => {
    if (value !== undefined) {
      emit('update:modelValue', value)
      emit('change', value)
    }
  },
})

// Display value
const displayValue = computed(() => {
  const selectedItem = props.items.find(item => item.value === selectedValue.value)
  return selectedItem?.label
})

// Item selection
const selectItem = (item: DropdownItem) => {
  if (item.disabled) return
  selectedValue.value = item.value
  isOpen.value = false
}

// Check if item is selected
const isSelected = (item: DropdownItem) => {
  return item.value === selectedValue.value
}

// Keyboard navigation
const itemsRef = computed(() => props.items)
const { highlightedIndex, handleKeydown, setHighlightedIndex } = useKeyboardNavigation(itemsRef, selectItem, isOpen)

// Get item classes
const getItemClasses = (item: DropdownItem, index: number) => {
  return getDropdownItemClasses(isSelected(item), highlightedIndex.value === index, item.disabled || false, props.size)
}

// Trigger classes
const triggerClasses = computed(() => getDropdownTriggerClasses(props.size, props.variant))

// Placeholder classes
const placeholderClasses = computed(() => {
  return displayValue.value ? '' : dropdownStyles.placeholder
})

// Icon classes
const iconClasses = computed(() => {
  return [dropdownStyles.icon, isOpen.value ? 'rotate-180' : ''].join(' ')
})
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
      <div :class="dropdownStyles.container">
        <ul
          :class="dropdownStyles.list"
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
            <svg
              v-if="isSelected(item)"
              class="ml-auto"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
    </template>
  </Popover>
</template>
