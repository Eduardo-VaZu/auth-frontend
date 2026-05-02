import type { ApiErrorResponse, ValidationIssue } from '@/shared/types/api.types'

export class HttpError extends Error {
  public readonly status: number

  public readonly code: string

  public readonly requestId: string | null

  public readonly details: ValidationIssue[] | undefined

  public readonly body: unknown

  public constructor(options: {
    status: number
    message: string
    code?: string
    requestId?: string | null
    details?: ValidationIssue[]
    body?: unknown
  }) {
    super(options.message)

    this.name = 'HttpError'
    this.status = options.status
    this.code = options.code ?? 'HTTP_ERROR'
    this.requestId = options.requestId ?? null
    this.details = options.details
    this.body = options.body
  }
}

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse => {
  if (typeof value !== 'object' || value === null || !('error' in value)) {
    return false
  }

  const error = (value as { error: unknown }).error

  return typeof error === 'object' && error !== null && 'message' in error
}

export const toHttpError = (status: number, body: unknown): HttpError => {
  if (isApiErrorResponse(body)) {
    return new HttpError({
      status,
      message: body.error.message,
      code: body.error.code,
      requestId: body.error.requestId,
      details: body.error.details,
      body,
    })
  }

  return new HttpError({
    status,
    message: status >= 500 ? 'Unexpected server error' : 'Request failed',
    body,
  })
}
