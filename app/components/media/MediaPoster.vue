<!-- components/MovieCard.vue -->
<script setup>
import { useIntersectionObserver, useImage, useNetwork } from '@vueuse/core'

const props = defineProps({
  src: { type: String, required: true },
})

// ─── Lazy visibility ──────────────────────────────────────────────────────────
const cardEl  = ref(null)
const visible = ref(false)

const { stop } = useIntersectionObserver(
  cardEl,
  ([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      stop()           // observe once, then detach
    }
  },
  { threshold: 0.1 }
)

// ─── Image loading ────────────────────────────────────────────────────────────
const posterSrc = https://image.tmdb.org/t/p/w500' + props.src

const { isLoading, error, execute } = useImage(
  { src: posterSrc }
)

// ─── Network recovery ─────────────────────────────────────────────────────────
const { isOnline } = useNetwork()

// When the image failed because we were offline, retry once we're back
watch(isOnline, (online) => {
  if (online && error.value) {
    execute()
  }
})
</script>

<template>
  <div ref="cardEl" class="movie-card">

    <!-- Poster -->
    <div class="poster-wrapper">
      <!-- Not visible yet → skeleton -->
      <div bv-if="!visible" class="skeleton" />

      <!-- Visible + loading → shimmer -->
      <div v-else-if="isLoading" class="skeleton shimmer" />

      <!-- Error state -->
      <div v-else-if="error" class="poster-error">
        <span v-if="!isOnline">📡 Offline — retrying when back online…</span>
        <span v-else>Failed to load poster {{ error }} {{ posterSrc }}</span>
      </div>

      <!-- Loaded -->
      <img
        v-else
        :src="posterSrc"
        alt="movie.title"
        class="poster"
        loading="lazy"
        hdecoding="async"
      />
    </div>

  </div>
</template>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.skeleton {
  width: 100%;
  height: 100%;
  background: #2a2a3e;
}

.shimmer {
  background: linear-gradient(
    90deg,
    #2a2a3e 25%,
    #3a3a5e 50%,
    #2a2a3e 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.poster-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 0.75rem;
  color: #888;
  padding: 1rem;
  text-align: center;
}

.info h3 {
  font-size: 0.9rem;
  margin: 0;
}

.info p {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}
</style>