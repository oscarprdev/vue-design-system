import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable to detect clicks outside of a given element
 * @param elementRef - Reference to the element to watch
 * @param callback - Function to call when clicking outside
 */
export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
  const handleClick = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick)
  })
}
