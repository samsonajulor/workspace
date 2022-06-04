import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import thunder from '../icons/thunder.svg';

const lightColor = '#ffffff', darkColor = '#103B66';

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar color="transparent" position="sticky" elevation={0} 
        sx={{
          paddingBottom: "10px",
          zIndex: -100000
        }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
            <Typography variant="body2" color='#103B66' align="center">
              Dashboard
            </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
                <IconButton>
                  <img src={thunder} alt={`icon`} />
                </IconButton>
            </Grid>
            <Grid item>
                <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: darkColor,
                  '&:hover': {
                    color: darkColor,
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Badge badgeContent={2} color="error">
                What's new
                </Badge>
               </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{
          paddingTop: "25px",
          paddingBottom: "60px",
          height: '182px',
          maxWidth: '1184px',
          background: 'linear-gradient(180deg, #21B8F9 0%, rgba(33, 184, 249, 0) 132.05%)'
        }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h6">
                Welcome Samson!
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item xs />
            <Grid item xs />
            <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'underline',
                  color: lightColor,
                  '&:hover': {
                    color: darkColor,
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/samsonajulor
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
