import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../app/features/auth/authApiSlice';
import { setLogout } from '../../app/features/auth/authSlice';
import { resetBoards } from '../../app/features/boards/boardSlice';
import { resetProjects } from '../../app/features/projects/projectSlice';
import CustomAvatar from '../CustomAvatar';
import Loader from '../Loader';

export default function AccountMenu({ userInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      dispatch(resetProjects())
      dispatch(resetBoards())
      navigate('/');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <CustomAvatar name={`${userInfo?.name?.first} ${userInfo?.name?.last}`} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <CustomAvatar name={`${userInfo?.name?.first} ${userInfo?.name?.last}`} fontSize={14}/> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/settings')} className="gap-2">
          <FontAwesomeIcon icon={faGear} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} className="gap-2">
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
