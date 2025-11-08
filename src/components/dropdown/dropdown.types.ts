import type { DropdownSize, DropdownVariant } from '@/theme/dropdown'

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
