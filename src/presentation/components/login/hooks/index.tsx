import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from 'domain/validation/auth/userLoginValidation';
import { FirebaseAuthRepository } from 'infrastructure/repositories/auth/authRepository';

import toast from 'react-hot-toast';
import { LoginUserUseCase } from 'domain/useCase/auth/LoginUser';

const useLoginForm = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const { t:translate } = useTranslation();
  const navigate = useNavigate();

  const authRepository = new FirebaseAuthRepository()
  const loginUserUseCase = new LoginUserUseCase(authRepository)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: loginValidationSchema(translate),
    onSubmit: async (values) => {
   
      try {
        setLoading(true)
        await loginUserUseCase.execute(values.email, values.password)
        navigate('/')
      } catch (e: any) {
        toast.error(translate(e.message))
      } finally{
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

export default useLoginForm;
