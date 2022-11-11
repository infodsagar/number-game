import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';
import { useNotesContext } from '../hooks/useNotesContext';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading, signup } = useSignup();
  const { setDemo } = useNotesContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, username, email, password);

    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='mt-2 grid grid-cols-12'>
      <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        <form className='flex flex-col mt-8 mb-4' onSubmit={handleSubmit}>
          <label className='text-lg mt-4'>First Name</label>
          <input
            type='text'
            className='border-2 border-blue-300 py-1 '
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Username</label>
          <input
            type='text'
            className='border-2 border-blue-300 py-1 '
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Email</label>
          <input
            type='email'
            className='border-2 border-blue-300 py-1 '
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Password</label>
          <input
            type='password'
            className='border-2 border-blue-300 py-1 '
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className='border-2 border-blue-300 hover:bg-blue-300 rounded-lg mt-4 py-2 md:py-1 min-w-[70%] self-center text-lg'
            disabled={isLoading}
          >
            Submit
          </button>
          {error}
        </form>
        <span
          className='md:pl-1 sm:pl-1 cursor-pointer text-blue-500 underline'
          onClick={() => setDemo(true)}
        >
          <Link to='/login'>Click here to login with demo user id </Link>
        </span>
      </div>
    </div>
  );
};
