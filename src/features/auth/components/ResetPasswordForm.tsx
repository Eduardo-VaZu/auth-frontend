import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { applyValidationIssues } from '@/shared/lib/applyValidationIssues'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { HttpError } from '@/shared/lib/httpError'

import { useResetPassword } from '../hooks/useResetPassword'
import { resetPasswordSchema, type ResetPasswordSchema } from '../schemas/reset-password.schema'

export interface ResetPasswordFormProps {
  initialToken?: string
  onSuccess?: () => void
}

export const ResetPasswordForm = ({
  initialToken,
  onSuccess,
}: ResetPasswordFormProps): JSX.Element => {
  const resetPasswordMutation = useResetPassword()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<ResetPasswordSchema>({
    defaultValues: {
      token: initialToken ?? '',
      newPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    if (initialToken !== undefined && initialToken.length > 0) {
      setValue('token', initialToken)
    }
  }, [initialToken, setValue])

  const onSubmit = async (values: ResetPasswordSchema): Promise<void> => {
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const response = await resetPasswordMutation.mutateAsync(values)
      setSubmitSuccess(response.message || t('auth.resetPassword.success'))
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<ResetPasswordSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.resetPassword.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      {submitSuccess === null ? null : <Alert variant="success">{submitSuccess}</Alert>}
      <Input
        label={t('auth.resetPassword.tokenLabel')}
        autoComplete="one-time-code"
        placeholder={t('auth.resetPassword.tokenPlaceholder')}
        error={errors.token?.message}
        {...register('token')}
      />
      <Input
        label={t('auth.resetPassword.newPasswordLabel')}
        type="password"
        autoComplete="new-password"
        placeholder={t('auth.fields.passwordPlaceholder')}
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Button type="submit" className="w-full" isLoading={resetPasswordMutation.isPending}>
        {t('auth.resetPassword.submit')}
      </Button>
    </form>
  )
}
