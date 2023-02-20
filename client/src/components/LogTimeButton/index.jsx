

function LogTimeButton({ onClick }) {


  return (
    <button
      className='bg-[#1DB3AB] text-white rounded-2xl px-5 py-3'
      type='button'
      onClick={onClick}
    >
      Log Time
    </button>
  )
}

export default LogTimeButton