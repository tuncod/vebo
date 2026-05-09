import { ofetch } from 'ofetch'
import { stringifyQuery } from 'ufo'

const fetch = async (url, { method = 'GET', headers, query, body }) => {
  const data = await ofetch('/api/proxy', {
    method: 'POST',
    body: {
      url: url + stringifyQuery(query),
      method,
      headers,
      body
    }
  })
  return data
}

(async () => {

  const data = fetch('https:goog

  console.log(data)

})()