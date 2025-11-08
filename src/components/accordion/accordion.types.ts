import type { AccordionVariant } from '@/theme/accordion'

export interface AccordionItem {
  id: string
  trigger: string
  content: string[]
}

export interface AccordionProps {
  items: AccordionItem[]
  variant?: AccordionVariant
  multiple?: boolean
  defaultOpen?: string[]
}
