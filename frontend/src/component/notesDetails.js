import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { useState, useEffect } from 'react';

export const NoteDetails = ({ note }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();
  const { text, fileUrl } = note;
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    const featchNotes = async () => {
      const response = await fetch('api/notes', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json });
      }
    };
    if (user) {
      featchNotes();
    }
  }, [dispatch, user]);

  const handleClick = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/notes/' + note._id, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(true);
      dispatch({ type: 'DELETE_NOTE', payload: json });
    }
  };

  return (
    <div className='flex' key={note.id}>
      <span className='bg-red-50 ml-4 mt-2'>{text ? text : ''}</span>
      <br />
      {fileUrl ? (
        <img src={fileUrl} alt='img box' className='bg-red-50 ml-4 mt-2' />
      ) : (
        ''
      )}

      <button
        onClick={handleClick}
        className='ml-auto mr-3'
        disabled={isLoading}
      >
        Delete
      </button>
    </div>
  );
};
