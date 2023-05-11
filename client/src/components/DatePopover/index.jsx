import { faCalendarDays, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Popper, Typography } from "@mui/material";
import { useEffect } from "react";

function DatePopover(props) {
  const { anchorEl, date, hours, onClose, isDataAvailable } = props;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  useEffect(() => {
    const handleClose = (event) => {
      if (anchorEl instanceof Node && !anchorEl.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [anchorEl, onClose]);

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="top-start"
      sx={{ zIndex: 1000 }}
    >
      <Paper sx={{ p: 1 }}>
        <Typography variant="h7" color='GrayText'>
          <FontAwesomeIcon icon={faCalendarDays} />
          {' '}
          {date}
        </Typography>
        {isDataAvailable ? (
          <Typography variant="body1">
            Total Logged Hours: {hours}
          </Typography>
        ) : (
          <Typography variant="body1">
            No data available for this date
          </Typography>
        )}

        {hours < 8 && <Typography variant="body1" color='red'>
          <FontAwesomeIcon icon={faCircleExclamation} />
          {' '}
          08:00 hours required as minimum
        </Typography>}
      </Paper>
    </Popper>
  );
}

export default DatePopover;