import React from 'react';
import { Link } from 'react-router-dom';
import useLoginForm from './hooks';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';


const Login: React.FC = () => {

  const { formik,translate, loading } = useLoginForm();

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-md'>
      <div className='flex flex-col p-6 space-y-1'>
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold" data-id="3">{translate('auth.login')}</h3>
        <p className="text-sm text-[#707070]" data-id="4">{translate('auth.enter_your_credentials_to_access_your_account')}</p>
      </div>

      <div className='p-6'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <Input
              id='email'
              label={translate('auth.email')}
              type="email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-error'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <Input
              label={translate('auth.password')}
              id='password'
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-error'>{formik.errors.password}</div>
            ) : null}
          </div>
          <Button variant='primary-raised' type="submit" disabled={false}>
              { loading ? <Spinner/> : translate('auth.login')}
          </Button>
        </form>

        <div className='mt-4 text-center text-sm text-[#707070]'>
          {translate('auth.dont_have_an_accout')}?
          <Link to="/auth/sign-up" className='pl-1 font-medium text-primary hover:underline'> {" "} {translate('auth.signup_here')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
