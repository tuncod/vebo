import { WBK, type WikibaseSdk } from 'wikibase-sdk'
import { ofetch, type $Fetch } from 'ofetch'

export interface WikiBaseOptions {
  readonly instance: string
  readonly sparqlEndpoint: string
  readonly userAgent: string
}

export class WikiBase {
  private readonly builder: WikibaseSdk
  private readonly client: $Fetch

  constructor({ instance, sparqlEndpoint, userAgent }: WikiBaseOptions) {
    this.builder = WBK({
      instance,
      sparqlEndpoint,
    })

    this.client = ofetch.create({
      headers: {
        'user-agent': userAgent,
      },
      retry: 10,
      retryDelay: 500,
    })
  }

  build(sparql: string): string {
    return this.builder.sparqlQuery(sparql)
  }

  query<T = unknown>(sparql: string): Promise<T> {
    return this.client<T>(this.build(sparql))
  }
}
