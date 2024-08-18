
import * as Yup from 'yup';

export const loginValidationSchema = (t:(key: string, options?: Record<string, any>) => string) => Yup.object({
  email: Yup.string().email(t('auth.invalid_email')).required(t('auth.required', { required_entity: 'Email' })),
  password: Yup.string().required(t('auth.required', { required_entity: 'Password' })),
});
