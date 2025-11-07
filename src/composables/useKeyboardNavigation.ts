import { ref, watch, type Ref } from 'vue'

export interface NavigableItem {
  disabled?: boolean
  [key: string]: any
}

/**
 * Composable to handle keyboard navigation for list-based components
 * @param items - Array of items to navigate through
 * @param onSelect - Callback when an item is selected (Enter/Space)
 * @param isOpen - Whether the list is currently visible
 */
export function useKeyboardNavigation<T extends NavigableItem>(
  items: Ref<T[]>,
  onSelect: (item: T) => void,
  isOpen: Ref<boolean>
) {
  const highlightedIndex = ref<number>(-1)

  // Reset highlighted index when list opens
  watch(isOpen, newValue => {
    if (newValue) {
      highlightedIndex.value = -1
    }
  })

  const findNextEnabledIndex = (startIndex: number, direction: 1 | -1): number => {
    const itemsLength = items.value.length
    let currentIndex = startIndex

    for (let i = 0; i < itemsLength; i++) {
      currentIndex = (currentIndex + direction + itemsLength) % itemsLength
      if (!items.value[currentIndex]?.disabled) {
        return currentIndex
      }
    }

    return startIndex
  }

  const moveHighlight = (direction: 1 | -1) => {
    if (items.value.length === 0) return

    if (highlightedIndex.value === -1) {
      // If nothing is highlighted, start from the beginning or end
      highlightedIndex.value = direction === 1 ? 0 : items.value.length - 1
      // Find first enabled item
      if (items.value[highlightedIndex.value]?.disabled) {
        highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, direction)
      }
    } else {
      highlightedIndex.value = findNextEnabledIndex(highlightedIndex.value, direction)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveHighlight(1)
        break

      case 'ArrowUp':
        event.preventDefault()
        moveHighlight(-1)
        break

      case 'Home':
        event.preventDefault()
        highlightedIndex.value = 0
        if (items.value[0]?.disabled) {
          highlightedIndex.value = findNextEnabledIndex(0, 1)
        }
        break

      case 'End':
        event.preventDefault()
        highlightedIndex.value = items.value.length - 1
        if (items.value[items.value.length - 1]?.disabled) {
          highlightedIndex.value = findNextEnabledIndex(items.value.length - 1, -1)
        }
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (highlightedIndex.value !== -1 && items.value[highlightedIndex.value]) {
          const item = items.value[highlightedIndex.value]
          if (!item.disabled) {
            onSelect(item)
          }
        }
        break
    }
  }

  return {
    highlightedIndex,
    handleKeydown,
    setHighlightedIndex: (index: number) => {
      highlightedIndex.value = index
    },
  }
}
