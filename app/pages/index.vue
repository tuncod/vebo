<script setup lang="ts">
const tmdb = useTMDB()
const { data: movies, status, error } = await useAsyncData('trending_movies_week', () => tmdb.trending.movies({ time_window: 'week' }))
const { data: shows } = await useAsyncData('trending_shows_week', () => tmdb.trending.tv({ time_window: 'week' }))

// const movies = ref({ results: [] })
// const shows = ref({ results: [] })

const pending = computed(() => status.value === 'pending')

const fullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

onMounted(() => {
  const layout = window.localStorage.getItem('app_layout')
  if (layout) {
    setPageLayout(layout)
  }
})
</script>
<template>
  <div class="relative w-full p-2 p-0 mb-8">
    <img
      class="w-full aspect-square object-cover object-center rounded-[12vw] hidden"
      src="https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg"
    />
    <div
      class="w-full aspect-square mask-b-from-45% mashk-radial-[50%_90%] mask-radial-from-70% bg-[url(https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg)] bg-cover bg-center bg-fixed hidden"
    ></div>
    <div
      class="w-full aspect-square bg-[url(https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg)] bg-cover bg-contain bg-center bg-fixed rounded-[12vw]"
    ></div>
    <div class="absolute bottom-0">
      <h1 class="font-heading text-white text-3xl font-black ml-4 mb-14">Spider-Man</h1>
    </div>
  </div>
  <div class="font-heading px-3 hidden">
    <h1 class="text-5xl font-black my-8" @click="fullscreen">{{ $t('pages.home') }}</h1>
  </div>
  {{ pending }} - {{ status }}
  <div class="px-3" v-if="pending">
    <div v-if="error"></div>
    <UiMediaScroll v-else :items="movies.results" title="This Week's Trending Movies">
      <template #item="{ id, poster_path, title, original_title, vote_average, release_date }">
        <MediaCard :id :lazy="true" type="movie" />
      </template>
    </UiMediaScroll>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="shows.results" title="This Week's Trending TV Shows">
      <template #item="{ poster_path, name, original_name, vote_average, first_air_date }">
        <UiMediaCard :poster="poster_path" :title="name || original_name" :score="vote_average" :year="first_air_date" />
      </template>
    </UiMediaScroll>
  </div>
</template>
