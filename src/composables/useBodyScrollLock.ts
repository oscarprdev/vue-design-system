import { onUnmounted, watch, type Ref } from 'vue'

export function useBodyScrollLock(isLocked: Ref<boolean>) {
  let originalOverflow = ''
  let originalPaddingRight = ''

  const lock = () => {
    if (typeof document === 'undefined') return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // Store original values
    originalOverflow = document.body.style.overflow
    originalPaddingRight = document.body.style.paddingRight

    // Prevent layout shift by adding padding to compensate for scrollbar
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.body.style.overflow = 'hidden'
  }

  const unlock = () => {
    if (typeof document === 'undefined') return

    // Restore original values
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight
  }

  watch(
    isLocked,
    locked => {
      if (locked) {
        lock()
      } else {
        unlock()
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    unlock()
  })

  return {
    lock,
    unlock,
  }
}
