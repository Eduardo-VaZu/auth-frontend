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

import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterSchema } from '../schemas/register.schema'

export interface RegisterFormProps {
  onSuccess?: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps): JSX.Element => {
  const registerMutation = useRegister()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterSchema): Promise<void> => {
    setSubmitError(null)

    try {
      await registerMutation.mutateAsync(values)
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<RegisterSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.register.error')))
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
        autoComplete="new-password"
        placeholder={t('auth.fields.passwordPlaceholder')}
        hint={t('auth.fields.passwordHint')}
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
        {t('auth.register.submit')}
      </Button>
    </form>
  )
}
