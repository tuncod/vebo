import { WBK, simplifySparqlResults } from 'wikibase-sdk'
import { ofetch } from 'ofetch'

interface WikiBaseOptions {
  instance: string,
  sparqlEndpoint: string,
  useragent: string,
}

class WikiBase {
  constructor(options: WikiBaseOptions) {
    this.setBuilder(() => {
      return WBK({
        instance: options.instance,
        sparqlEndpoint: options.sparqlEndpoint,
      })
    }) 

    this.setClient(() => {
      return ofetch.create({
        headers: {
          'user-agent': options.useragent,
        }
        retry: 10,
        retryDelay: 500,
      })
    })

  }

  setClient(client) {
    if (typeof client === 'function') {
      this.client = client()
    } else {
      this.client = client
    }
  }

  setBuilder(builder) {
    if (typeof builder === 'function') {
      this.builder = builder()
    } else {
      this.builder = builder
    }
  }

  async build(sparql) {
    return this.builder.sparqlQuery(sparql)
  }

  async query(sparql) {
    const url = await this.build(sparql)
    return await this.client(url)
  }
}