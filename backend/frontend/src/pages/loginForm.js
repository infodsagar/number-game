import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='mt-8 grid grid-cols-12'>
      <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        <form className='flex flex-col mt-8 ' onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type='text'
            className='border-2 border-blue-100'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className='mt-2'>Password</label>
          <input
            type='password'
            className='border-2 border-blue-100'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className='border-2 border-blue-300 rounded-lg mt-4 min-w-[70%] self-center'
            disabled={isLoading}
          >
            Submit
          </button>
          {error}
        </form>
      </div>
    </div>
  );
};
