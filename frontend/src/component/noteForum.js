import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import FileBase64 from 'react-file-base64';

export const NoteForum = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
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

    const note = { text, file };

    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      enctype: 'multipart/form-data',
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
        type='file'
        className='border-2 border-blue-200  mx-4'
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
      <input
        type='text'
        className='border-2 border-blue-200'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className='ml-4 px-2 border-2 rounded-lg' disabled={isLoading}>
        Submit
      </button>
      {error}
    </form>
  );
};
