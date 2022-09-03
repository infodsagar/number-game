import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

export const NoteForum = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formdata = new FormData();
    formdata.append('image', file);

    if (!user) {
      setError('Please login');
      setIsLoading(false);
    }

    //File handle
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: formdata,
      headers: {
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

      setIsLoading(false);
    }
  };

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
      body: JSON.parse(note),
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
    <form className='mt-10' onSubmit={handleSubmit2}>
      <input
        type='file'
        className='border-2 border-blue-200  mx-4'
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <input
        type='text'
        className='border-2 border-blue-200'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className='ml-4 px-2 border-2 rounded-lg'>Submit</button>
      {error}
    </form>
  );
};
