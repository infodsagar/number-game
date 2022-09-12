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
    <div className='flex flex-col items-center  mt-8'>
      <span className='justify-self-center text-xl'>Login</span>
      <form
        className='flex flex-col max-w-[600px] min-w-[400px] mt-8'
        onSubmit={handleSubmit}
      >
        <label>Email</label>
        <input
          type='text'
          className='border-2 border-blue-100'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label>Password</label>
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
  );
};
