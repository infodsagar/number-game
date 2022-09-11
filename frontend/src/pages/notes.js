import { NoteForum } from '../component/noteForum';
import { useEffect, useContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { NoteDetails } from '../component/notesDetails';
import { useLogout } from '../hooks/useLogout';
import { SnackbarContext } from '../context/snackbar';
import bg from '../images/bg.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg3.jpg';

export const Notes = () => {
  const { user } = useAuthContext();
  const { dispatch, notes } = useNotesContext();
  const { logout } = useLogout();
  const setStateSnackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    const featchNotes = async () => {
      const response = await fetch('api/notes', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json });
      } else {
        logout();
        return setStateSnackbarContext(
          true,
          'Login session expired!!',
          'warning'
        );
      }
    };
    if (user) {
      featchNotes();
    }
  }, [dispatch, user]);

  return (
    <div className='flex items-center flex-col'>
      <span className='mt-4 text-xl'>Notes</span>
      <div
        className='border-2 border-blue-200  w-[35vw] min-w-[400px] max-w-[1000px] min-h-[300px] h-[70vh] max-h-[70vh] overflow-y-auto'
        style={{
          backgroundImage: `url(${bg3})`,
        }}
      >
        {notes &&
          notes.map((note) => {
            return <NoteDetails note={note} />;
          })}
      </div>
      <NoteForum />
    </div>
  );
};
