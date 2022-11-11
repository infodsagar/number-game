import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNotesContext } from '../hooks/useNotesContext';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error, login } = useLogin();
  const { demo, setDemo } = useNotesContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail('');
    setPassword('');
  };

  const handleDemo = () => {
    setEmail('demo123');
    setPassword('Abcdefg@123');
  };

  useEffect(() => {
    if (demo) {
      handleDemo();
      setDemo(false);
    }
  }, [demo]);

  return (
    <div className='mt-8 grid grid-cols-12'>
      <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        <form className='flex flex-col mt-8 mb-4' onSubmit={handleSubmit}>
          <label className='text-lg'>Email</label>
          <input
            type='text'
            className='border-2 border-blue-300 py-1'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className='mt-4 text-lg'>Password</label>
          <input
            type='password'
            className='border-2 border-blue-300 py-1'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className='border-2 border-blue-300 hover:bg-blue-400 rounded-lg mt-8 py-2 md:py-1 min-w-[70%] self-center text-lg'
            disabled={isLoading}
          >
            Submit
          </button>
          {error}
        </form>
        <span
          className='md:pl-1 sm:pl-1 cursor-pointer text-blue-500 underline'
          onClick={handleDemo}
        >
          Click here to login with demo user id
        </span>
      </div>
    </div>
  );
};
