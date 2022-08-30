import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

export const NoteDetails = (note) => {
  const { text, _id } = note.note;
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/notes/' + _id, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ action: 'DELETE_NOTE', payload: json });
    }
  };

  return (
    <div>
      <span>{text}</span>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};
