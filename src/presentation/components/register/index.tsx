import React from 'react';
import useRegisterForm from './hooks';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import Spinner from '../ui/Spinner';

const Register: React.FC = () => {

  const { formik, loading, translate } = useRegisterForm();

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-md'>
      <div className='flex flex-col p-6 space-y-1'>
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold" data-id="3">{translate('auth.create_an_accout')}</h3>
        <p className="text-sm text-[#707070]" data-id="4">{translate('auth.enter_your_details_to_get_started')}</p>
      </div>

      <div className='p-6'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <Input
              label={translate('auth.name')}
              id='username'
              type="text"
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className='text-error'>{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <Input
              label={translate('auth.email')}
              id='email'
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
              <div className='text-error'>{JSON.stringify(formik.errors.password)}</div>
            ) : null}
          </div>
          <Button className='w-full' variant='primary-raised' type="submit">

            {loading ? <Spinner /> : translate('auth.register')}
          </Button>
        </form>

        <div className='mt-4 text-center text-sm text-[#707070]'>
          {translate('auth.already_have_an_account')}?
          <Link to="/auth/login" className='pl-1 font-medium text-primary hover:underline'> {" "}{translate('auth.login_here')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
