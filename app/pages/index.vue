<script setup lang="ts">
const { data: movies } = await useAsyncData('trending_movies_week', () => useTMDB().trending.movies({ time_window: 'week' }))
const { data: shows } = await useAsyncData('trending_shows_week', () => useTMDB().trending.tv({ time_window: 'week' }))

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
    <img class="w-full aspect-square object-cover object-center rounded-[12vw] hidden" src="https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg" />
    <div class="w-full aspect-square mask-b-from-45% mashk-radial-[50%_90%] mask-radial-from-70% bg-[url(https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg)] bg-cover bg-center bg-fixed hidden"></div>
    <div class="w-full aspect-square bg-[url(https://image.tmdb.org/t/p/original/sYsaVy047cfGTLMfcRihee3ShnM.jpg)] bg-cover bg-contain bg-center bg-fixed rounded-[12vw]"></div>
    <div class="absolute bottom-0">
      <h1 class="font-heading text-white text-3xl font-black ml-4 mb-14">Spider-Man</h1>
    </div>
  </div>
  <div class="font-heading px-3 hidden">
    <h1 class="text-5xl font-black my-8" @click="fullscreen">{{ $t('pages.home') }}</h1>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="movies.results" title="This Week's Trending Movies">
      <template #item="{ poster_path, original_title, vote_average, release_date }">
        <UiMediaCard :poster="poster_path" :title="original_title" :score="vote_average" :year="release_date" />
      </template>
    </UiMediaScroll>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="shows.results" title="This Week's Trending TV Shows">
      <template #item="{ poster_path, original_name, vote_average, first_air_date }">
        <UiMediaCard :poster="poster_path" :title="original_name" :score="vote_average" :year="first_air_date" />
      </template>
    </UiMediaScroll>
  </div>
  <div class="w-full h-14"></div>
  <div class="w-full h-14 fixed bottom-0 left-0 right-0 bg-white/30 backdrop-filter backdrop-blur-lg border-t border-zinc-200 z-20"></div>
</template>
