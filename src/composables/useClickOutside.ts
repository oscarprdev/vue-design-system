import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable to detect clicks outside of a given element
 * @param elementRef - Reference to the element to watch
 * @param callback - Function to call when clicking outside
 * @param excludeRefs - Optional array of refs to exclude from outside detection
 */
export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void,
  excludeRefs: Ref<HTMLElement | null>[] = []
) {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node

    // Check if click is inside the main element
    if (elementRef.value && elementRef.value.contains(target)) {
      return
    }

    // Check if click is inside any excluded elements
    for (const excludeRef of excludeRefs) {
      if (excludeRef.value && excludeRef.value.contains(target)) {
        return
      }
    }

    // Click is outside all elements, trigger callback
    callback()
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick)
  })
}
