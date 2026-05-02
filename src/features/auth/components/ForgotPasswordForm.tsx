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

import { useForgotPassword } from '../hooks/useForgotPassword'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '../schemas/forgot-password.schema'

export interface ForgotPasswordFormProps {
  onSuccess?: () => void
}

export const ForgotPasswordForm = ({
  onSuccess,
}: ForgotPasswordFormProps): JSX.Element => {
  const forgotPasswordMutation = useForgotPassword()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (values: ForgotPasswordSchema): Promise<void> => {
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const response = await forgotPasswordMutation.mutateAsync(values)
      setSubmitSuccess(response.message || t('auth.forgotPassword.success'))
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<ForgotPasswordSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.forgotPassword.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      {submitSuccess === null ? null : <Alert variant="success">{submitSuccess}</Alert>}
      <Input
        label={t('auth.fields.email')}
        type="email"
        autoComplete="email"
        placeholder={t('auth.fields.emailPlaceholder')}
        error={errors.email?.message}
        {...register('email')}
      />
      <Button type="submit" className="w-full" isLoading={forgotPasswordMutation.isPending}>
        {t('auth.forgotPassword.submit')}
      </Button>
    </form>
  )
}
