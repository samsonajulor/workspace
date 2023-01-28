import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const drawerWidth: number = 255;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const styles = {
  toolbar: {
    pr: '24px',
  },
  bolt: { marginRight: '5px' },
  iconButton: { px: [3] },
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navbar() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <AppBar position='fixed' open={open} color='inherit' elevation={0}>
        <Toolbar sx={styles.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              mr: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton color='inherit' sx={styles.iconButton}>
            <Badge badgeContent={2} color='secondary'>
              <HiOutlineLightningBolt style={styles.bolt} color='#103B66' />
              <Typography variant='body1' sx={{ color: (theme) => theme.customProps.color }}>
                What's new
              </Typography>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
