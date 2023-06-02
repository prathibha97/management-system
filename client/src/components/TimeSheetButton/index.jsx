/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Add } from '@mui/icons-material';


function TimeSheetButton({ text, Icon, onClick }) {
  return (
    <div className='bg-[#1db4ab] w-[88px] h-[83px] text-white hover:cursor-pointer rounded' onClick={onClick}>
      <Add />
      <div className='flex flex-col items-center'>
        <Icon />
        <span>{text}</span>
      </div>
    </div>
  )
}

export default TimeSheetButton