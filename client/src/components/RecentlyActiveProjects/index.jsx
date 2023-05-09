import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Tooltip } from '@mui/material'

function RecentlyActiveProjects() {
  return (
    <div className="flex flex-row justify-between items-start flex-nowrap flex-grow-0 flex-shrink-1 w-full mb-1 bg-white py-[9px] px-[7px] rounded">
      <span className="mr-[5px]">
        <span className="w-4 h-4 p-1 rounded" style={{ backgroundColor: 'rgb(248, 187, 208)' }}>
          tag
        </span>
      </span>
      <div className="w-full">
        <div className="mt-[-1px] break-words">
          <div className="flex float-right gap-1">
            <Tooltip title='View full log for this project'>
              <IconButton>
                <FontAwesomeIcon icon={faClock} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Proceed working'>
              <IconButton>
                <FontAwesomeIcon icon={faPlay} />
              </IconButton>
            </Tooltip>
          </div>
          PROJECT NAME
          <div className="flex flex-row items-start flex-nowrap mt-1 mr-[15px] w-full text-sm text-[##858889] break-words">
            <div className="mr-[5px]">Last active:</div>
            <div>Yesterday</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentlyActiveProjects