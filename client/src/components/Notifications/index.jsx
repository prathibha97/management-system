/* eslint-disable no-unused-vars */
import { CheckCircle } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  useClearNotificationsMutation,
  useReadNotificationMutation,
  useUserNotificationsQuery,
} from '../../app/features/notifications/notificationApiSlice';
import {
  setClearNotifications,
  setReadNotification,
} from '../../app/features/notifications/notificationSlice';

function NotificationItem({ notification, empNo }) {
  const dispatch = useDispatch();
  const formattedDate = new Date(notification.createdAt).toLocaleString();
  const { refetch: refetchNotifications } = useUserNotificationsQuery(empNo);
  const [readNotification] = useReadNotificationMutation();

  const handleMarkAsRead = async () => {
    try {
      const notificationData = await readNotification({
        id: notification._id,
      }).unwrap();
      dispatch(setReadNotification({ notificationData }));
      refetchNotifications();
    } catch (err) {
      console.log('Error marking notification as read');
    }
  };

  useEffect(() => {
    refetchNotifications();
  }, []);

  return (
    <>
      <ListItem
        key={notification?._id}
        sx={{
          // background: '#EEF2F5',
          padding: '8px 12px',
          marginBottom: '5px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {notification?.isRead === false && (
          <IconButton
            sx={{ marginRight: '8px' }}
            onClick={handleMarkAsRead}
            title="Mark as read"
          >
            <CheckCircle color="primary" />
          </IconButton>
        )}
        <ListItemText
          primary={notification.message}
          secondary={formattedDate}
        />
      </ListItem>
      {/* <Divider /> */}
    </>
  );
}

function Notifications({ empNo }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: userNotifications, refetch: refetchNotifications } =
    useUserNotificationsQuery(empNo);
  const [notificationCount, setNotificationCount] = useState(
    userNotifications?.length
  );
  const [clearNotifications] = useClearNotificationsMutation();

  const unreadCount = userNotifications?.filter(
    (notification) => !notification.isRead
  ).length;

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

    const socket = io('http://34.210.201.75:5000', {
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
          style: {
            minWidth: '20em',
            maxWidth: '30em',
            minHeight: '18em',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <List sx={{ padding: '16px' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, marginBottom: '6px' }}
          >
            Notifications
          </Typography>
          {unreadCount > 0 ? (
            <Typography
              variant="subtitle2"
              color="GrayText"
              sx={{ marginBottom: '8px' }}
            >
              You have {unreadCount} unread messages.
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="GrayText">
              You have no unread messages.
            </Typography>
          )}
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : (
            notificationCount > 0 &&
            userNotifications.map((notification) => (
              <>
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  empNo={empNo}
                />

                <Button
                  variant="contained"
                  color="info"
                  sx={{ marginTop: '16px' }}
                  onClick={handleClearNotifications}
                >
                  Clear All
                </Button>
              </>
            ))
          )}
        </List>
      </Popover>
    </>
  );
}

export default Notifications;
