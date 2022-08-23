export const SignupForm = () => {
  return (
    <div className='flex flex-col items-center  mt-8'>
      <span className='justify-self-center text-xl'>Signup</span>
      <form className='flex flex-col max-w-[600px] min-w-[400px] mt-8'>
        <lable>First Name</lable>
        <input type='text' className='border-2 border-blue-100' />
        <lable>Last Name</lable>
        <input type='text' className='border-2 border-blue-100' />
        <lable>Username</lable>
        <input type='text' className='border-2 border-blue-100' />
        <lable>email</lable>
        <input type='email' className='border-2 border-blue-100' />
        <lable>Password</lable>
        <input type='password' className='border-2 border-blue-100' />
        <lable>DOB</lable>
        <input type='date' className='border-2 border-blue-100' />
        <button className='border-2 border-blue-300 rounded-lg mt-4 min-w-[70%] self-center'>
          Submit
        </button>
      </form>
    </div>
  );
};
