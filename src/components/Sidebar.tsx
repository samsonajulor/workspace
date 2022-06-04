import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import home from '../icons/home.svg';
import orders from '../icons/orders.svg';
import cart from '../icons/cart.svg';
import user from '../icons/user.svg';
import target from '../icons/target.svg';
import union from '../icons/union.svg';
import dollarSign from '../icons/dollar-sign.svg';
import paintbrush from '../icons/paintbrush.svg';
import creditcard from '../icons/credit-card.svg';
import cog from '../icons/cog.svg';
import newapp from '../icons/new-app.svg';
import settings from '../icons/settings.svg';
import logout from '../icons/log-out.svg';
import help from '../icons/help-circle.svg';
import share from '../icons/share-2.svg';
import eye from '../icons/eye.svg';

const top_nav = [
  {
    id: 'Dashboard',
    icon: home,
    active: true,
  },
  {
    id: 'Catalogue',
    icon: cart,
  },
  { id: 'Orders', icon: orders },
  { id: 'Customers', icon: user },
  { id: 'Marketing', icon: target },
  { id: 'Delivery Options', icon: union },
  {
    id: 'Payment Options',
    icon: dollarSign,
  },
  {
    id: 'Store Design',
    icon: paintbrush,
  },
  { id: 'Subscriptions', icon: creditcard },
  { id: 'Integrations', icon: cog },
  { id: 'Extensions', icon: newapp },
  { id: 'Settings', icon: settings },
  {
    id: 'Log Out',
    icon: logout,
  },
];

const bottom_nav = [
  {
    id: 'Customer Support',
    icon: help,
  },
  {
    id: 'Share Your Shop',
    icon: share,
  },
  { id: 'View YOur Shop', icon: eye },
];

const item = {
  py: '2px',
  px: 3,
  color: '#103B66',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Sidebar(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#103B66' }}>
          <span style={{ color: '#000000' }}>vetrina</span>
          <span style={{ color: '#21B8F9' }}>live</span>
        </ListItem>
        <Box sx={{ bgcolor: '#ffffff' }}>
          {top_nav.map(({ id, icon, active }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton selected={active} sx={item}>
                <ListItemIcon>
                  <img src={icon} alt={`${id} icon`} />
                </ListItemIcon>
                <ListItemText>{id}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
        <Box sx={{ bgcolor: '#ffffff' }}>
          {bottom_nav.map(({ id, icon }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <img src={icon} alt={`${id} icon`} />
                </ListItemIcon>
                <ListItemText>{id}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}
