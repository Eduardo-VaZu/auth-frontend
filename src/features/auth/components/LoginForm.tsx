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

import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginSchema } from '../schemas/login.schema'

export interface LoginFormProps {
  onSuccess?: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
  const loginMutation = useLogin()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginSchema): Promise<void> => {
    setSubmitError(null)

    try {
      await loginMutation.mutateAsync(values)
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<LoginSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.login.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      <Input
        label={t('auth.fields.email')}
        type="email"
        autoComplete="email"
        placeholder={t('auth.fields.emailPlaceholder')}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t('auth.fields.password')}
        type="password"
        autoComplete="current-password"
        placeholder={t('auth.fields.passwordPlaceholder')}
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
        {t('auth.login.submit')}
      </Button>
    </form>
  )
}
