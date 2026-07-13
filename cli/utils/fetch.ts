import { ofetch as ofetchBase } from 'ofetch'
import { consola } from 'consola'

export const ofetch = ofetchBase.create({
  retry: 2,
  retryDelay: 300,
  async onRequestError({ error }) {
    consola.error(error)
  },
  async onResponseError({ error }) {
    consola.error(error)
  },
})
