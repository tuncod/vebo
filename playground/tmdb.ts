import { TMDB, ApiClient as BaseApiClient } from '@lorenzopant/tmdb'
import freekeys from 'freekeys'
import { ref, watch } from 'vue'
import hh from "#imports"
import { createUseAsyncData } from '#app/composables/asyncData'

const data = ref(null)

console.log(
  createUseAsyncData
)

setInterval(() => {
  data.value = Date.now()
}, 2000)

const tmdb = new TMDB('fjjf', {
  images: {
    secure_images_url: true,
    autocomplete_paths: true,
  },
  logger: (entry) => {
    // console.log(`[${entry.type}] ${entry.method} ${entry.endpoint}`);
    // console.log(entry)
  },
})

console.log(
  tmdb.search // .multi
  /*({
    query: '....'
  })*/
)

watch(data, (newValue) => {
  console.log(newValue)
})