
import * as Yup from 'yup';

export const registerValidationSchema = (t:(key: string, options?: Record<string, any>) => string) => Yup.object({
  username: Yup.string().required(t('auth.required', { required_entity: 'Name' })),
  email: Yup.string().email(t('auth.invalid_email')).required(t('auth.required', { required_entity: 'Email' })),
  password: Yup.string()
    .required(t('auth.required', { required_entity: 'Password' }))
    .min(6, t('auth.min_length', { required_entity: 'Password', min: 6 }))
});
