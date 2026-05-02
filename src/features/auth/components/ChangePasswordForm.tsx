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

import { useChangePassword } from '../hooks/useChangePassword'
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from '../schemas/change-password.schema'

export interface ChangePasswordFormProps {
  onSuccess?: () => void
}

export const ChangePasswordForm = ({
  onSuccess,
}: ChangePasswordFormProps): JSX.Element => {
  const changePasswordMutation = useChangePassword()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ChangePasswordSchema>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (values: ChangePasswordSchema): Promise<void> => {
    setSubmitError(null)

    try {
      await changePasswordMutation.mutateAsync(values)
      onSuccess?.()
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        applyValidationIssues<ChangePasswordSchema>(error.details, setError)
      }

      setSubmitError(getErrorMessage(error, t('auth.changePassword.error')))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}
      <Input
        label={t('auth.changePassword.currentLabel')}
        type="password"
        autoComplete="current-password"
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />
      <Input
        label={t('auth.changePassword.newLabel')}
        type="password"
        autoComplete="new-password"
        hint={t('auth.changePassword.hint')}
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Button type="submit" className="w-full sm:w-auto" isLoading={changePasswordMutation.isPending}>
        {t('auth.changePassword.submit')}
      </Button>
    </form>
  )
}
