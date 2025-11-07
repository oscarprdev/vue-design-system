import { onMounted, onUnmounted, type Ref } from 'vue'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, isActive: Ref<boolean>) {
  let previouslyFocusedElement: HTMLElement | null = null
  let focusableElements: HTMLElement[] = []

  const updateFocusableElements = () => {
    if (!containerRef.value) return
    focusableElements = Array.from(containerRef.value.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isActive.value || !containerRef.value) return
    if (event.key !== 'Tab') return

    updateFocusableElements()

    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement as HTMLElement

    if (event.shiftKey) {
      // Shift + Tab
      if (activeElement === firstElement || !containerRef.value.contains(activeElement)) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (activeElement === lastElement || !containerRef.value.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  const activate = () => {
    previouslyFocusedElement = document.activeElement as HTMLElement
    updateFocusableElements()

    if (focusableElements.length > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        focusableElements[0]?.focus()
      }, 50)
    }
  }

  const deactivate = () => {
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
      previouslyFocusedElement = null
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    deactivate()
  })

  return {
    activate,
    deactivate,
  }
}
