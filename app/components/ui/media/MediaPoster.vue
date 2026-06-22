<script setup>
import { useIntersectionObserver, useImage, useNetwork } from '@vueuse/core'

const props = defineProps({
  src: { type: String, required: true },
})

// ─── Lazy visibility ──────────────────────────────────────────────────────────
const cardEl = ref(null)
const visible = ref(false)

const { stop } = useIntersectionObserver(
  cardEl,
  ([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      stop() // observe once, then detach
    }
  },
  { threshold: 0.1 },
)

// ─── Image loading ────────────────────────────────────────────────────────────
const posterSrc = props.src

const { isLoading, error, execute } = useImage({ src: posterSrc })

// ─── Network recovery ─────────────────────────────────────────────────────────
const { isOnline } = useNetwork()

// When the image failed because we were offline, retry once we're back
watch(isOnline, (online) => {
  if (online && error.value) {
    execute()
  }
})

onMounted(() => {
  setInterval(() => console.log(error.value), 2000)
})
</script>

<template>
  <div class="poster-wrapper relative aspect-[2/3]" ref="cardEl">
    <!-- Not visible yet → skeleton -->
    <div class="skeleton" v-if="!visible" />

    <!-- Visible + loading → shimmer -->
    <div class="skeleton shimmer" v-else-if="isLoading" />

    <!-- Error state -->
    <div class="poster-error" v-else-if="error">
      <span v-if="!isOnline">📡 Offline — retrying when back online…</span>
      <span v-else>Failed to load poster {{ error.value }} {{ posterSrc }}</span>
    </div>

    <!-- Loaded -->
    <img class="poster h-full w-full object-cover border-0" v-else :src="posterSrc" alt="movie.title" loading="lazy" decoding="async" />
  </div>
</template>
