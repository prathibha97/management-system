/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { CheckCircle } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useClearNotificationsMutation, useReadNotificationMutation, useUserNotificationsQuery } from '../../app/features/notifications/notificationApiSlice';
import { setClearNotifications, setReadNotification } from '../../app/features/notifications/notificationSlice';

function NotificationItem({ notification, empNo }) {
  const dispatch = useDispatch();
  const [notificationCount, setNotificationCount] = useState(0)
  const { data: userNotifications, refetch: refetchNotifications } = useUserNotificationsQuery(empNo)
  const [readNotification] = useReadNotificationMutation()

  const formattedDate = new Date(notification.createdAt).toLocaleString();

  const handleMarkAsRead = async () => {
    try {
      const notificationData = await readNotification({ id: notification._id }).unwrap()
      dispatch(setReadNotification({ notificationData }));
    } catch (err) {
      console.log('Error marking notification as read');
    }
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications()
  }, [])

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
  const { data: userNotifications, refetch: refetchNotifications } = useUserNotificationsQuery(empNo)
  const [clearNotifications] = useClearNotificationsMutation()

  const unreadCount = userNotifications?.filter(notification => !notification.isRead).length;

  const handleNotificationClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleNotificationClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClearNotifications = useCallback(async () => {
    try {
      const res = await clearNotifications({ empNo }).unwrap()
      dispatch(setClearNotifications(res));
      refetchNotifications()
      setNotificationCount(0);
      setAnchorEl(null);
    } catch (err) {
      console.error(err);
    }
  }, [empNo, dispatch]);


  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const socket = io('http://34.210.201.75:5000', {
      query: { empNo },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('leaveApproved', async (_data) => {
      try {
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('leaveRejected', async (_data) => {
      try {
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingCreated', async (_data) => {
      try {
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingUpdated', async (_data) => {
      try {
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
        setNotificationCount(notificationCount + 1);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('meetingCancelled', async (_data) => {
      try {
        // await dispatch(getUserNotifications(empNo));
        refetchNotifications()
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
  }, [empNo, dispatch, userNotifications?.length, userNotifications?.isRead]);

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
        ) : userNotifications?.length > 0 ? (
          <List sx={{ textAlign: 'center' }}>
            {userNotifications?.map((notification) => (
              <NotificationItem notification={notification} empNo={empNo} />
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
