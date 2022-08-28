import { NoteForum } from '../component/noteForum';

export const Notes = () => {
  return (
    <div className='flex items-center flex-col'>
      <span className='mt-10 text-2xl'>Notes</span>
      <div className='border-2 border-blue-200  w-[35vw] min-w-[400px] max-w-[1000px] min-h-[300px] h-[50vh]'></div>
      <NoteForum />
    </div>
  );
};
