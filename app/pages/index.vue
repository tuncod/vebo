<script setup lang="ts">

const { data: movies } = await useFetch('https://api.themoviedb.org/3/trending/movie/week', {
  query: {
    api_key: '8301a21598f8b45668d5711a814f01f6',
  }
})


</script>

<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">Index</h1>
    {{ movies }}


    <section class="section">
      <div class="section-header">
        <h2>Popular</h2>
      </div>

      <div class="scroll-row">
        <div
          v-for="item in movies.results"
          class="card"
          tabindex="0"
          role="button"
          aria-label="title"
        >
          <img
            class="card-poster"
            :src="'https://image.tmdb.org/t/p/w500' + item.poster_path"
            alt="title"
            loading="lazy"
            decoding="async"
          />
      </div>
    </div>

    </div>
  </section>
  
  </div>
</template>
