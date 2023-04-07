/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { CheckCircle } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { MarkNotificationAsRead, clearUserNotifications, getUserNotifications } from '../../redux/actions/notificationActions';

function NotificationItem({ notification }) {
  const dispatch = useDispatch();

  const formattedDate = new Date(notification.createdAt).toLocaleString();

  const handleMarkAsRead = () => {
    try {
      dispatch(MarkNotificationAsRead(notification._id));
    } catch (err) {
      console.log('Error marking notification as read');
    }
  }

  return (
    <>
      <ListItem key={notification.id} sx={{ background: '#EEF2F5' }}>
        <ListItemText
          primary={notification.message}
          secondary={formattedDate}
        />
        {!notification.isRead && (
          <IconButton onClick={handleMarkAsRead}>
            <CheckCircle color="primary" />
          </IconButton>
        )}
      </ListItem>
      <Divider />
    </>
  );
}

function Notifications({ empNo }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0)

  const { notifications: userNotifications } = useSelector((state) => state.userNotifications);

  const unreadCount = Array.from(userNotifications)?.filter(notification => !notification?.isRead).length;

  const handleNotificationClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleNotificationClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClearNotifications = useCallback(() => {
    dispatch(clearUserNotifications(empNo));
    dispatch(getUserNotifications(empNo));
    setNotificationCount(0);
    setAnchorEl(null);
  }, [empNo, dispatch]);

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const socket = io('http://ec2-52-88-221-122.us-west-2.compute.amazonaws.com:5001', {
      query: { empNo },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('leaveApproved', async (data) => {
      try {
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('leaveRejected', async (data) => {
      try {
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingCreated', async (data) => {
      try {
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingUpdated', async (data) => {
      try {
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingCancelled', async (data) => {
      try {
        await dispatch(getUserNotifications(empNo));
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    fetchNotifications();

    return () => {
      isMounted = false;
      socket.disconnect();
    };
  }, [empNo, dispatch, userNotifications.length, userNotifications.isRead]);

  return (
    <>
      <IconButton color="inherit" onClick={handleNotificationClick}>
        <Badge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
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
          style: { minWidth: '20em', minHeight: '18em', overflowY: 'auto' },
        }}
      >
        {loading ? (
          <List>
            <ListItem sx={{ justifyContent: 'center' }}>
              <ListItemText primary="Loading..." />
            </ListItem>
          </List>
        ) : userNotifications.length > 0 ? (
          <List sx={{ textAlign: 'center' }}>
            {Array.from(userNotifications).map((notification) => (
              <NotificationItem notification={notification} />
            ))}
            <Button onClick={handleClearNotifications}>Clear All</Button>
          </List>
        ) : (
          <List>
            <ListItem sx={{ textAlign: 'center' }}>
              <ListItemText primary="No new notifications" />
            </ListItem>
          </List>
        )}
      </Popover>
    </>
  );
}

export default Notifications;
