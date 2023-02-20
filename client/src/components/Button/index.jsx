

function Button({ onClick, title }) {


  return (
    <button
      className='bg-[#1DB3AB] text-white rounded-2xl px-5 py-3'
      type='button'
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button