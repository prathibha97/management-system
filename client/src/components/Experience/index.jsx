import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRemoveExperienceMutation } from '../../features/experiences/experienceApiSlice'
import Loader from '../Loader'
import { setRemoveExperience } from '../../features/experiences/experienceSlice'

function Experience({ item, formatDate, setAlert, setExperienceChangeCount }) {
  const dispatch = useDispatch()
  const [isHovering, setIsHovering] = useState(false)
  const [removeExperience, {isLoading}] = useRemoveExperienceMutation()

  const handleExperienceDelete = async () => {
    try {
      await removeExperience(item._id).unwrap()
      dispatch(setRemoveExperience({ id: item._id }))
      setExperienceChangeCount((prevCount) => prevCount + 1)
      setAlert({ open: true, message: 'Experience deleted successfully', severity: 'success' })
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' })
    }
  }

  if(isLoading) return <Loader/>

  return (
    <div
      className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl relative'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div>
        <h2 className='font-bold text-lg'>{item.position}</h2>
        <p className='text-sm text-[#707070]'>{item.company}</p>
      </div>
      <div className='mr-[60px]'>
        <p className='text-xs text-[#707070]'>Start date: {formatDate(item.startDate)}</p>
        <p className='text-xs text-[#707070]'>End date: {formatDate(item.endDate)}</p>
      </div>
      {isHovering && (
        <div className='absolute top-0 right-0 mt-2 mr-3'>
          <FontAwesomeIcon icon={faCircleXmark} className='text-red-500 cursor-pointer' onClick={handleExperienceDelete} />
        </div>
      )}
    </div>
  )
}

export default Experience
