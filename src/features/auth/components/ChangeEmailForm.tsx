import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { applyValidationIssues } from '@/shared/lib/applyValidationIssues'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { HttpError } from '@/shared/lib/httpError'

import { useChangeEmail } from '../hooks/useChangeEmail'
import { changeEmailSchema, type ChangeEmailSchema } from '../schemas/change-email.schema'

export interface ChangeEmailFormProps {
  onSuccess?: () => void
}

export const ChangeEmailForm = ({ onSuccess }: ChangeEmailFormProps): JSX.Element => {
  const changeEmailMutation = useChangeEmail()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ChangeEmailSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(changeEmailSchema),
  })

  const onSubmit = async (values: ChangeEmailSchema): Promise<void> => {
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const response = await changeEmailMutation.mutateAsync(values)
      setSubmitSuccess(response.message || t('auth.changeEmail.success'))
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<ChangeEmailSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.changeEmail.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      {submitSuccess === null ? null : <Alert variant="success">{submitSuccess}</Alert>}
      <Input
        label={t('auth.changeEmail.label')}
        type="email"
        autoComplete="email"
        placeholder={t('auth.changeEmail.placeholder')}
        error={errors.email?.message}
        {...register('email')}
      />
      <Button type="submit" className="w-full sm:w-auto" isLoading={changeEmailMutation.isPending}>
        {t('auth.changeEmail.submit')}
      </Button>
    </form>
  )
}
