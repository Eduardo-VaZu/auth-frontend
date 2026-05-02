import { env } from './env'
import { toHttpError } from './httpError'

type PrimitiveBody = BodyInit | null | undefined

type JsonBody = object

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers' | 'signal'> {
  body?: JsonBody | PrimitiveBody
  headers?: HeadersInit
  signal?: AbortSignal
}

const buildUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return new URL(path, env.apiUrl).toString()
}

const isJsonLikeBody = (body: RequestOptions['body']): body is JsonBody =>
  typeof body === 'object' &&
  body !== null &&
  !(body instanceof FormData) &&
  !(body instanceof URLSearchParams)

const parseResponseBody = async <TResponse>(response: Response): Promise<TResponse | null> => {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return (await response.json()) as TResponse
  }

  const text = await response.text()

  return (text.length > 0 ? text : null) as TResponse | null
}

const createInit = (method: string, options: RequestOptions = {}): RequestInit => {
  const headers = new Headers({
    Accept: 'application/json',
  })

  if (options.headers !== undefined) {
    const customHeaders = new Headers(options.headers)

    customHeaders.forEach((value, key) => {
      headers.set(key, value)
    })
  }

  let body: BodyInit | undefined

  if (options.body instanceof FormData || options.body instanceof URLSearchParams) {
    body = options.body
  } else if (isJsonLikeBody(options.body)) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(options.body)
  } else if (typeof options.body === 'string') {
    body = options.body
  }

  return {
    ...options,
    method,
    body,
    headers,
    credentials: 'include',
  }
}

export const request = async <TResponse>(
  path: string,
  method: string,
  options?: RequestOptions,
): Promise<TResponse> => {
  const response = await fetch(buildUrl(path), createInit(method, options))
  const body = await parseResponseBody<TResponse>(response)

  if (!response.ok) {
    throw toHttpError(response.status, body)
  }

  return body as TResponse
}

export const get = <TResponse>(path: string, options?: RequestOptions): Promise<TResponse> =>
  request<TResponse>(path, 'GET', options)

export const post = <TResponse>(path: string, options?: RequestOptions): Promise<TResponse> =>
  request<TResponse>(path, 'POST', options)

export const put = <TResponse>(path: string, options?: RequestOptions): Promise<TResponse> =>
  request<TResponse>(path, 'PUT', options)

export const patch = <TResponse>(path: string, options?: RequestOptions): Promise<TResponse> =>
  request<TResponse>(path, 'PATCH', options)

export const del = <TResponse>(path: string, options?: RequestOptions): Promise<TResponse> =>
  request<TResponse>(path, 'DELETE', options)
