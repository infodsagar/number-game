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

  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('text', text);

  const note = { text };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError('Please login');
      setIsLoading(false);
    }

    if (!text && !file) {
      setError(`Can't submit empty response`);
      setIsLoading(false);
    }

    //Text only
    if (!file && text) {
      console.log('text only ' + text);

      const response = await fetch('/api/notes/text', {
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
        console.log(json);
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    } else {
      console.log('file and text or file only');
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
        setFile(null);
        console.log('new note added');
        console.log(json);
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    }
  };

  return (
    <form className='mt-10' onSubmit={handleSubmit}>
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
