export interface ValidationIssue {
  field: string
  message: string
}

export interface ApiErrorPayload {
  code: string
  message: string
  requestId: string
  details?: ValidationIssue[]
}

export interface ApiErrorResponse {
  error: ApiErrorPayload
}

export interface StatusMessageResponse {
  message: string
}
