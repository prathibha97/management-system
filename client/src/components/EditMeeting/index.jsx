/* eslint-disable react/jsx-props-no-spreading */
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fragment, useState } from 'react';
import Button from '../Button';

function EditMeeting({ isOpen, setIsOpen, people, handleMeetingEdit, meeting }) {
  console.log(meeting.start.dateTime);
  const [summary, setSummary] = useState(meeting?.summary)
  const [startValue, setStartValue] = useState(meeting?.start?.dateTime);
  const [endValue, setEndValue] = useState(meeting?.end?.dateTime);
  const [selectedPeople, setSelectedPeople] = useState([people[0]]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPeople(value);
  };

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
              <Dialog.Panel className="w-[600px] h-[450px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Meeting
                </Dialog.Title>
                <div className="mt-2">
                  <div className="fixed top-18 w-[400px]">
                    <InputLabel id="demo-simple-select-label" className='mb-2'>Meeting Summary</InputLabel>
                    <TextField fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} />
                    <InputLabel id="demo-simple-select-label" className='mb-2'>Select Attendees</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple
                      fullWidth
                      value={selectedPeople}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected
                          .map((person) => `${person.name.first} ${person.name.last}`)
                          .join(", ")
                      }
                    >
                      {people.map((person, personIdx) => (
                        <MenuItem key={personIdx} value={person}>
                          {`${person.name.first} ${person.name.last}`}
                        </MenuItem>
                      ))}
                    </Select>
                    <div className='flex mt-8 mb-8 gap-2'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Start Date & Time"
                          value={startValue}
                          onChange={(newValue) => setStartValue(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="End Date & Time"
                          value={endValue}
                          onChange={(newValue) => setEndValue(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <Button title='Edit Meeting' onClick={() => handleMeetingEdit(meeting?.id, summary, selectedPeople, startValue, endValue)} icon={faCalendarCheck} />
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

export default EditMeeting