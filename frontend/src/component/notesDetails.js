import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

export const NoteDetails = ({ note }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/notes/' + note._id, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_NOTE', payload: json });
    }
  };

  return (
    <div>
      <span>{note.text}</span>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};
