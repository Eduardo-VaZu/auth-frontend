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

import { useVerifyEmail } from '../hooks/useVerifyEmail'
import { verifyEmailSchema, type VerifyEmailSchema } from '../schemas/verify-email.schema'

export interface VerifyEmailFormProps {
  initialToken?: string
  onSuccess?: () => void
}

export const VerifyEmailForm = ({
  initialToken,
  onSuccess,
}: VerifyEmailFormProps): JSX.Element => {
  const verifyEmailMutation = useVerifyEmail()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<VerifyEmailSchema>({
    defaultValues: {
      token: initialToken ?? '',
    },
    resolver: zodResolver(verifyEmailSchema),
  })

  useEffect(() => {
    if (initialToken !== undefined && initialToken.length > 0) {
      setValue('token', initialToken)
    }
  }, [initialToken, setValue])

  const onSubmit = async (values: VerifyEmailSchema): Promise<void> => {
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const response = await verifyEmailMutation.mutateAsync(values)
      setSubmitSuccess(response.message || t('auth.verifyEmail.success'))
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<VerifyEmailSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.verifyEmail.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      {submitSuccess === null ? null : <Alert variant="success">{submitSuccess}</Alert>}
      <Input
        label={t('auth.verifyEmail.tokenLabel')}
        autoComplete="one-time-code"
        placeholder={t('auth.verifyEmail.tokenPlaceholder')}
        error={errors.token?.message}
        {...register('token')}
      />
      <Button type="submit" className="w-full" isLoading={verifyEmailMutation.isPending}>
        {t('auth.verifyEmail.submit')}
      </Button>
    </form>
  )
}
