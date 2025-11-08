import type { DialogSize } from '../../theme/dialog'

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  size?: DialogSize
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}
