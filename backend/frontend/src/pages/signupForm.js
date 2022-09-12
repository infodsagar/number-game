import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, surname, username, email, password);

    setName('');
    setSurname('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex flex-col items-center  mt-8'>
      <span className='justify-self-center text-xl'>Signup</span>
      <form
        className='flex flex-col max-w-[600px] min-w-[400px] mt-8'
        onSubmit={handleSubmit}
      >
        <label>First Name</label>
        <input
          type='text'
          className='border-2 border-blue-100'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Last Name</label>
        <input
          type='text'
          className='border-2 border-blue-100'
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
        <label>Username</label>
        <input
          type='text'
          className='border-2 border-blue-100'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>email</label>
        <input
          type='email'
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
