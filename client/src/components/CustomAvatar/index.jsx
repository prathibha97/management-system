/* eslint-disable react/jsx-props-no-spreading */
import Avatar from '@mui/material/Avatar';

function CustomAvatar({ name, size = 42, style = {} }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(str) {
    return {
      sx: {
        bgcolor: stringToColor(str),
        width: size,
        height: size,
        ...style,
      },
      children: `${str?.split(' ')[0][0]}${str?.split(' ')[1][0]}`,
    };
  }

  return (
    <Avatar {...stringAvatar(name)} />
  );
}

export default CustomAvatar;
