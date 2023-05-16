import { faCalendarDays, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Paper, Popper, Typography } from "@mui/material";
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
    <Popper id={id} open={open} anchorEl={anchorEl} placement="top-start" sx={{ zIndex: 1000 }}>
      <Paper sx={{ p: 2, minWidth: '200px' }}>
        <Box display="flex" alignItems="center" mb={1}>
          <FontAwesomeIcon icon={faCalendarDays} color="#878b8e" style={{ marginRight: '8px' }} />
          <Typography variant="subtitle1" color="text.secondary">{date}</Typography>
        </Box>
        {isDataAvailable ? (
          <Typography variant="body1">
            Total Logged Hours: {hours}
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No data available for this date
          </Typography>
        )}
        {hours < 8 && (
          <Typography variant="body1" color="error" mt={1}>
            <FontAwesomeIcon icon={faCircleExclamation} color="error" style={{ marginRight: '8px' }} />
            08:00 hours required as a minimum
          </Typography>
        )}
      </Paper>
    </Popper>
  );
}

export default DatePopover;
