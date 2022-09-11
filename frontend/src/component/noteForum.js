import { useState, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const NoteForum = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();
  const inputRef = useRef();
  const triggerFile = () => {
    inputRef.current.click();
  };

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
        setFile(null);
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    } else {
      //File
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
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    }
  };

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <input
        type='file'
        className='border-2 border-blue-200 hidden'
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        onClick={(e) => {
          e.target.value = null;
        }}
        ref={inputRef}
      />
      <input
        type='text'
        className='border-4 border-blue-200 rounded-lg w-[25vw]'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <AttachFileIcon
        color='primary'
        className='max-w-[30px] cursor-pointer'
        onClick={triggerFile}
      />
      <button className='ml-4 px-2 border-2 rounded-lg' disabled={isLoading}>
        Submit
      </button>
      {error}
    </form>
  );
};
