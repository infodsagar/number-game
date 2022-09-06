import { NoteForum } from '../component/noteForum';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { NoteDetails } from '../component/notesDetails';

export const Notes = () => {
  const { user } = useAuthContext();
  const { dispatch, notes } = useNotesContext();

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

  return (
    <div className='flex items-center flex-col'>
      <span className='mt-10 text-2xl'>Notes</span>
      <div className='border-2 border-blue-200  w-[35vw] min-w-[400px] max-w-[1000px] min-h-[300px] h-[50vh] overflow-y-auto'>
        {notes &&
          notes.map((note) => {
            return <NoteDetails note={note} />;
          })}
      </div>
      <NoteForum />
    </div>
  );
};
