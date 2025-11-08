import type { Placement } from '@/composables/useFloating'

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  placement?: Placement
  offset?: number
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  trigger?: 'click' | 'hover' | 'manual'
  matchWidth?: boolean
}
