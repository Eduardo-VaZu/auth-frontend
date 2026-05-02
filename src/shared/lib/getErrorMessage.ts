import { HttpError } from './httpError'

export const getErrorMessage = (error: unknown, fallback = 'Algo salió mal'): string => {
  if (error instanceof HttpError) {
    return error.message
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message
  }

  return fallback
}
