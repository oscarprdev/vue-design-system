import { ref, watch, nextTick, type Ref } from 'vue'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface FloatingPosition {
  top: string
  left: string
}

/**
 * Composable to calculate floating element position relative to a trigger
 * @param triggerRef - Reference to the trigger element
 * @param contentRef - Reference to the floating content element
 * @param placement - Desired placement of the floating element
 * @param offset - Distance from the trigger in pixels
 * @param isOpen - Whether the floating element is visible
 */
export function useFloating(
  triggerRef: Ref<HTMLElement | null>,
  contentRef: Ref<HTMLElement | null>,
  placement: Ref<Placement>,
  offset: number = 8,
  isOpen: Ref<boolean>
) {
  const position = ref<FloatingPosition>({ top: '0px', left: '0px' })
  const isPositioned = ref(false)

  const calculatePosition = () => {
    if (!triggerRef.value || !contentRef.value || !isOpen.value) return

    const triggerRect = triggerRef.value.getBoundingClientRect()
    const contentRect = contentRef.value.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (placement.value) {
      case 'top':
        top = triggerRect.top - contentRect.height - offset
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
        break

      case 'bottom':
        top = triggerRect.bottom + offset
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
        break

      case 'left':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
        left = triggerRect.left - contentRect.width - offset
        break

      case 'right':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
        left = triggerRect.right + offset
        break
    }

    // Viewport boundary detection
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Adjust horizontal position if it goes off screen
    if (left < 0) {
      left = 8 // 8px padding from edge
    } else if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width - 8
    }

    // Adjust vertical position if it goes off screen
    if (top < 0) {
      top = 8
    } else if (top + contentRect.height > viewportHeight) {
      top = viewportHeight - contentRect.height - 8
    }

    position.value = {
      top: `${top}px`,
      left: `${left}px`,
    }
    isPositioned.value = true
  }

  // Recalculate position when isOpen changes
  watch(isOpen, async newValue => {
    if (newValue) {
      isPositioned.value = false
      // Wait for DOM to update before calculating position
      await nextTick()
      // Additional RAF to ensure layout is complete
      requestAnimationFrame(() => {
        calculatePosition()
      })
    } else {
      isPositioned.value = false
    }
  })

  // Recalculate on window resize
  const handleResize = () => {
    if (isOpen.value) {
      calculatePosition()
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize, true)
  }

  return {
    position,
    isPositioned,
    calculatePosition,
  }
}
