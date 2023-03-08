/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Badge, Popover, List, ListItem, ListItemText } from '@mui/material';

function Notifications({ empNo }) {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const socket = io('http://localhost:5001', {
      query: { empNo },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('leave-approved', (data) => {
      console.log(data);
      setNotifications((notifications) => [...notifications, data.message]);
    });

    socket.on('leave-rejected', (data) => {
      console.log(data);
      setNotifications((notifications) => [...notifications, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [empNo]);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotifications([]);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleNotificationClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: { minWidth: '20em', minHeight: '18em' , overflowY: 'scroll' },
        }}
      >
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default Notifications;
