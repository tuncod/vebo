import { ref, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void
  threshold?: number      // px needed to trigger refresh
  maxPull?: number        // px cap for visual pull distance
  resistance?: number     // higher = harder to pull
  disabled?: Ref<boolean>
}

export function usePullToRefresh(
  target: Ref<HTMLElement | null | undefined>,
  options: PullToRefreshOptions
) {
  const {
    onRefresh,
    threshold = 70,
    maxPull = 120,
    resistance = 2.5,
    disabled,
  } = options

  const pullDistance = ref(0)
  const isRefreshing = ref(false)
  const isPulling = ref(false)

  let startY = 0
  let startScrollTop = 0
  let tracking = false

  function getScrollTop(el: HTMLElement) {
    return el === document.documentElement || el === document.body
      ? window.scrollY
      : el.scrollTop
  }

  function onTouchStart(e: TouchEvent) {
    const el = target.value
    if (!el || disabled?.value || isRefreshing.value) return

    startScrollTop = getScrollTop(el)
    // Only start tracking if already at (or very near) the top
    if (startScrollTop <= 0) {
      startY = e.touches[0].clientY
      tracking = true
      isPulling.value = false
    }
  }

  function onTouchMove(e: TouchEvent) {
    if (!tracking || isRefreshing.value) return

    const el = target.value
    if (!el) return

    // If user scrolled down mid-gesture, abandon the pull
    if (getScrollTop(el) > 0) {
      tracking = false
      pullDistance.value = 0
      isPulling.value = false
      return
    }

    const currentY = e.touches[0].clientY
    const diff = currentY - startY

    if (diff <= 0) {
      pullDistance.value = 0
      isPulling.value = false
      return
    }

    // Resistance curve so it feels rubbery, capped at maxPull
    const pulled = Math.min(diff / resistance, maxPull)
    pullDistance.value = pulled
    isPulling.value = true

    // Prevent the page from scrolling while pulling down at the top
    if (e.cancelable) e.preventDefault()
  }

  async function onTouchEnd() {
    if (!tracking) return
    tracking = false

    if (pullDistance.value >= threshold && !isRefreshing.value) {
      isRefreshing.value = true
      pullDistance.value = threshold // settle at threshold while loading

      try {
        await onRefresh()
      } finally {
        isRefreshing.value = false
        pullDistance.value = 0
        isPulling.value = false
      }
    } else {
      pullDistance.value = 0
      isPulling.value = false
    }
  }

  useEventListener(target, 'touchstart', onTouchStart, { passive: true })
  useEventListener(target, 'touchmove', onTouchMove, { passive: false })
  useEventListener(target, 'touchend', onTouchEnd, { passive: true })
  useEventListener(target, 'touchcancel', onTouchEnd, { passive: true })

  return {
    pullDistance,
    isRefreshing,
    isPulling,
    progress: () => Math.min(pullDistance.value / threshold, 1),
  }
}