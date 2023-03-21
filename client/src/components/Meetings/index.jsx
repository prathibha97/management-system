import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import {
  format, parseISO
} from 'date-fns'

import { Fragment } from 'react'
import CustomAvatar from '../CustomAvatar'

function Meeting({ meeting, handleMeetingCancel }) {
  const startDateTime = parseISO(meeting.startDatetime)
  const endDateTime = parseISO(meeting.endDatetime)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // const isCreator = meeting?.creator?._id === currentUser?._id;

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <CustomAvatar name={`${meeting?.creator?.name?.first} ${meeting?.creator?.name?.last}`} />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting?.creator?.name?.first} {meeting?.creator?.name?.last}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      {meeting?.attendee?.length > 0 && (
        <div className="flex mt-2">
          {meeting?.attendee?.map((attendee) => (
            <CustomAvatar key={attendee._id} name={`${attendee.name.first} ${attendee.name.last}`} size={28} style={{ fontSize: 12 }} />
          ))}
        </div>
      )}
      {/* {isCreator && ( */}
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <FontAwesomeIcon icon={faEllipsisVertical} className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classNames(
                      active ? 'bg-gray-100  text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full'
                    )}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full'
                    )}
                    onClick={() => handleMeetingCancel(meeting?._id)}
                  >
                    Cancel
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* )} */}
    </li>
  )
}

export default Meeting