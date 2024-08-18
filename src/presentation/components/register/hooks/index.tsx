import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthRepository } from 'infrastructure/repositories/auth/authRepository';
import { registerValidationSchema } from 'domain/validation/auth/userRegisterValidation';
import toast from 'react-hot-toast';
import { RegisterUserUseCase } from 'domain/useCase/auth/RegisterUser';

const useRegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const { t:translate } = useTranslation();

  const authRepository = new FirebaseAuthRepository()
  const registerUseCase = new RegisterUserUseCase(authRepository)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidationSchema(translate),
    onSubmit: async (values) => {
     
      try {
        setLoading(true);
        await registerUseCase.execute(values.username, values.email, values.password)
        toast.success(translate('auth.account_created_successfully'))
        navigate('/')
      } catch (e: any) {
        toast.error(translate(e.message))
      } finally {
        setLoading(false)
      }
      
    },
  });

  return {
    formik,
    translate,
    loading
  };
};

export default useRegisterForm;
