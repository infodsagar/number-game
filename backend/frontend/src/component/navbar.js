import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDelete } from '../hooks/useDelete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

export const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { deleteUser } = useDelete();
  const [open, setOpen] = useState(null);

  const handleClick = () => {
    logout();
  };

  const handleDelete = () => {
    deleteUser();
  };

  const handleDrop = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className='flex border-2 border-black'>
        <span className='text-lg ml-6 md:ml-8 lg:ml-12'>
          <Link to='/'>Home</Link>
        </span>
        <span className='text-lg ml-6 md:ml-8 lg:ml-12 mr-2'>
          <Link to='/'>Notes</Link>
        </span>
        <nav className='ml-auto mr-10'>
          <div
            className={user ? 'text-lg cursor-pointer flex' : 'hidden'}
            onClick={handleDrop}
          >
            <span>
              {user ? user.email : ''}
              {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </span>

            <button
              className={
                user && open ? 'text-lg absolute mt-8 ml-[64px]' : 'hidden'
              }
              onClick={handleDelete}
            >
              Delete account
            </button>
            <button
              className={user ? 'text-lg pl-4 ' : 'hidden'}
              onClick={handleClick}
            >
              Logout
            </button>
          </div>

          <Link to='/login'>
            <span className={user ? 'hidden' : 'text-lg pl-4'}>Login</span>
          </Link>
          <Link to='/signup'>
            <span className={user ? 'hidden' : 'text-lg pl-4'}>Signup</span>
          </Link>
        </nav>
      </div>
    </>
  );
};
