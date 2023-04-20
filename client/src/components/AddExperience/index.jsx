/* eslint-disable react/jsx-props-no-spreading */
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { InputLabel, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { useAddExperienceMutation } from '../../app/features/experiences/experienceApiSlice';
import { setAddExperience } from '../../app/features/experiences/experienceSlice';

function AddExperience({ isOpen, setIsOpen, setAlert, setExperienceChangeCount }) {

  const dispatch = useDispatch()
  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [addExperience, { error }] = useAddExperienceMutation()

  const handleSubmit = async () => {
    try {
      const experienceData = await addExperience({ position, company, startDate, endDate }).unwrap()
      console.log(experienceData);
      dispatch(setAddExperience({ newExperience: experienceData }))
      setExperienceChangeCount(1)
      setAlert({ open: true, message: `Experience added successfully`, severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: error?.data?.message, severity: 'error' });
      console.log(error);
    }
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[600px] h-[425px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Past Experience
                </Dialog.Title>
                <div className="mt-2">
                  <div className="fixed top-18 w-[400px]">
                    <InputLabel id="demo-simple-select-label" className='mb-2'>Position</InputLabel>
                    <TextField value={position} onChange={(e) => setPosition(e.target.value)} fullWidth />
                    <InputLabel id="demo-simple-select-label" className='mt-2 mb-2'>Company</InputLabel>
                    <TextField value={company} onChange={(e) => setCompany(e.target.value)} fullWidth />
                    <div className='flex mt-8 mb-8 gap-2'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <Button title='Add Experience' onClick={() => handleSubmit(position, company, startDate, endDate)} icon={faUserTie} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddExperience