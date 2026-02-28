export type PaginatedResponse<T> = {
  data: T[]
  pagination?: {
    cursor?: string
    hasMore?: boolean
    total?: number
  }
}

type PaginateOptions = {
  limit?: number
}

export const paginate = async function* <T>(
  fetchPage: (cursor?: string) => Promise<PaginatedResponse<T>>,
  options: PaginateOptions = {}
): AsyncGenerator<T> {
  let cursor: string | undefined

  while (true) {
    const page = await fetchPage(cursor)

    for (const item of page.data) {
      yield item
    }

    if (!page.pagination?.hasMore || !page.pagination?.cursor) {
      break
    }

    cursor = page.pagination.cursor

    if (options.limit && page.data.length === 0) {
      break
    }
  }
}
