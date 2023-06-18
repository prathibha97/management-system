/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { CheckCircle } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  useClearNotificationsMutation,
  useReadNotificationMutation,
  useUserNotificationsQuery,
} from '../../app/features/notifications/notificationApiSlice';
import { setClearNotifications, setReadNotification } from '../../app/features/notifications/notificationSlice';

function NotificationItem({ notification, empNo }) {
  const dispatch = useDispatch();
  const formattedDate = new Date(notification.createdAt).toLocaleString();
  const { refetch: refetchNotifications } = useUserNotificationsQuery(empNo);
  const [readNotification] = useReadNotificationMutation();

  const handleMarkAsRead = async () => {
    try {
      const notificationData = await readNotification({ id: notification._id }).unwrap();
      dispatch(setReadNotification({ notificationData }));
      refetchNotifications()
    } catch (err) {
      console.log('Error marking notification as read');
    }
  };

  useEffect(() => {
    refetchNotifications();
  }, []);

  return (
    <>
      <ListItem key={notification.id} sx={{ background: '#EEF2F5' }}>
        <ListItemText primary={notification.message} secondary={formattedDate} />
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
  const [notificationCount, setNotificationCount] = useState(0);
  const { data: userNotifications, refetch: refetchNotifications } = useUserNotificationsQuery(empNo);
  const [clearNotifications] = useClearNotificationsMutation();

  const unreadCount = userNotifications?.filter((notification) => !notification.isRead).length;

  const handleNotificationClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleNotificationClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClearNotifications = useCallback(async () => {
    try {
      const res = await clearNotifications({ empNo }).unwrap();
      dispatch(setClearNotifications(res));
      refetchNotifications();
      setNotificationCount(0);
      setAnchorEl(null);
    } catch (err) {
      console.error(err);
    }
  }, [empNo, dispatch]);

  useEffect(() => {
    let isMounted = true;

    const socket = io('http://34.220.229.58:5001', {
      query: { empNo },
    });

    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('newNotification', async (_data) => {
      try {
        await refetchNotifications();
      } catch (err) {
        console.error(err);
      }
    });

    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        await refetchNotifications();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
      socket.disconnect();
    };
  }, [empNo, dispatch]);

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
            {userNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} empNo={empNo} />
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
