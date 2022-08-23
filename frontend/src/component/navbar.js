import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <div className='flex border-2 border-black'>
        <span className='text-lg ml-10'>
          <Link to='/'>Home</Link>
        </span>
        <span className='ml-auto mr-10'>
          <Link to='/login'>
            <span className='text-lg'>Login</span>
          </Link>
          <Link to='/signup'>
            <span className='text-lg pl-4'>Signup</span>
          </Link>
        </span>
      </div>
    </>
  );
};
