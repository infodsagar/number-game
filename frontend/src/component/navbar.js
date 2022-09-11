import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDelete } from '../hooks/useDelete';

export const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { deleteUser } = useDelete();

  const handleClick = () => {
    logout();
  };

  const handleClick2 = () => {
    deleteUser();
  };

  return (
    <>
      <div className='flex border-2 border-black'>
        <span className='text-lg ml-10'>
          <Link to='/'>Home</Link>
        </span>
        <nav className='ml-auto mr-10'>
          <span className='text-lg'>{user ? user.email : ''}</span>
          <Link to='/login'>
            <span className={user ? 'hidden' : 'text-lg pl-4'}>Login</span>
          </Link>
          <Link to='/signup'>
            <span className={user ? 'hidden' : 'text-lg pl-4'}>Signup</span>
          </Link>
          <button
            className={user ? 'text-lg pl-4' : 'hidden'}
            onClick={handleClick}
          >
            Logout
          </button>
          <button
            className={user ? 'text-lg pl-4' : 'hidden'}
            onClick={handleClick2}
          >
            Delete account
          </button>
        </nav>
      </div>
    </>
  );
};
