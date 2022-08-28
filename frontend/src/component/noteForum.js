import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

export const NoteForum = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError('Please login');
      setIsLoading(false);
    }

    const note = { text };

    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setText('');
      console.log('new note added');
      dispatch({ type: 'CREATE_NOTE', payload: json });
      setIsLoading(false);
    }
  };

  return (
    <form className='mt-10' onSubmit={handleSubmit}>
      <input
        type='text'
        className='border-2 border-blue-200'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className='pl-4' disabled={isLoading}>
        Submit
      </button>
      {error}
    </form>
  );
};
