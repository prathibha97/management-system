/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDateShort } from '../../utils/formatDate'

function LeaveHistory({ leaves }) {
  return (
    <div className='flex flex-col bg-white px-12 py-5 mt-5 h-[390px] md:h-[730px] overflow-y-auto w-[90%] m-auto rounded-2xl'>
      <h1 className='font-bold mb-5'>Leave History</h1>
      {leaves?.map((leave) => (
        <>
          <div className='flex items-center justify-between' key={leave?._id}>
            <FontAwesomeIcon icon={faCircle} className='text-[10px]' />
            <p className='text-sm'>{leave?.leaveType}</p>
            <p className='text-sm'>{formatDateShort(leave?.startDate)} {' '}- {' '} {formatDateShort(leave?.endDate)}</p>
            <p className={`text-sm ${leave?.status === 'Pending' ? 'text-yellow-500' : leave?.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>{leave?.status}</p>
          </div>
          <div className="w-full my-6 border-b" />
        </>
      ))}
    </div>
  )
}

export default LeaveHistory