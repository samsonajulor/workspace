import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Toolbar, Typography, List, Divider, IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarPrimaryData, SidebarSecondaryData } from '../components/models/SidebarData';
import { SidebarItem } from '../components/models/DataStructure';
// images
import logo from '../assets/logo.svg';
import SubmenuItem from '../components/SubmenuItem';
import SelectInput from '../components/SelectInput';

const drawerWidth: number = 255;

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: [2, 3],
  },
  stack: {
    marginTop: '3rem',
    mx: [2],
    paddingBottom: '9rem',
  },
  typo: { fontWeight: 'normal', py: 1 },
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer className='Carousel__Image' variant='permanent' open={open}>
        <Toolbar
          sx={styles.toolbar}
        >
          {open && <img src={logo} alt='logo' />}
          <IconButton onClick={toggleDrawer}>{open && <MenuIcon />}</IconButton>
        </Toolbar>
        {/* SIDEBAR MENU ITEMS */}
        <List component='nav'>
          {SidebarPrimaryData.map((item: SidebarItem, index: number) => (
            <SubmenuItem item={item} key={index} open={open} />
          ))}
          <Divider sx={{ my: 1 }} />
          {SidebarSecondaryData.map((item: SidebarItem, index: number) => (
            <SubmenuItem item={item} key={index} open={open} />
          ))}
        </List>
        {/* SIDEBAR SELECT INPUT */}
        {open && (
          <Stack
            sx={styles.stack}
          >
            <Typography variant='body1' sx={styles.typo}>
              Select your shop
            </Typography>
            <SelectInput />
          </Stack>
        )}
      </Drawer>
    </>
  );
}

export default Sidebar;
