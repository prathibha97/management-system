import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function Button({ onClick, title, icon }) {


  return (
    <button
      className='bg-[#1DB3AB] text-white rounded-2xl px-5 py-3'
      type='button'
      onClick={onClick}
    >
      {title}
      <FontAwesomeIcon icon={icon || ''} className='ml-2' />
    </button>
  )
}

export default Button