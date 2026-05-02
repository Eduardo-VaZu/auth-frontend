import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

import type { ValidationIssue } from '@/shared/types/api.types'

const issueTargetsField = <TFieldValues extends FieldValues>(
  issue: ValidationIssue,
): issue is ValidationIssue & { field: FieldPath<TFieldValues> } => issue.field !== 'body'

export const applyValidationIssues = <TFieldValues extends FieldValues>(
  issues: ValidationIssue[] | undefined,
  setError: UseFormSetError<TFieldValues>,
): void => {
  if (issues === undefined) {
    return
  }

  for (const issue of issues) {
    if (issueTargetsField<TFieldValues>(issue)) {
      setError(issue.field, {
        message: issue.message,
      })
    }
  }
}
