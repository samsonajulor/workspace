import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HiOutlineLightningBolt } from "react-icons/hi";
import {
  SidebarPrimaryData,
  SidebarSecondaryData,
} from "../components/models/SidebarData";
import {SidebarItem} from "../components/models/DataStructure";
// images
import logo from "../assets/logo.svg";
import { Link } from "@mui/material";
import SubmenuItem from "../components/SubmenuItem";
import SelectInput from "../components/SelectInput";
import RightSection from "../components/RightSection";
import {AllNewsList} from "../components/AllNewsList";
import VisitorsAndOrders from "../components/VisitorsAndOrders";
import MarketDemoPlace from "../components/MarketDemoPlace";


const drawerWidth: number = 255;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const mdTheme = createTheme({
  customProps: {
    background: "#E5E5E5",
    color: "#103B66",
  },
  palette: {
    primary: {
      main: "#21B8F9",
    },
    secondary: {
      main: "#F33451",
    },
    extra: {
      orange: "#F3A35C",
      orangePrimary: "#FFA26B",
      greenPrimary: "#00C48C",
      darkGreen: "#005128",
      darkBlue: "#000032",
      tintBlue: "#E9F8FE",
    },
  },
});

function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        {/* APPBAR */}
        <AppBar position="absolute" open={open} color="inherit" elevation={0}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" sx={{ px: [3] }}>
              <Badge badgeContent={2} color="secondary">
                <HiOutlineLightningBolt
                  style={{ marginRight: "5px" }}
                  color="#103B66"
                />
                <Typography
                  variant="body1"
                  sx={{ color: (theme) => theme.customProps.color }}
                >
                  What's new
                </Typography>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* SIDEBAR */}
        <Drawer variant="permanent" open={open} sx={{}}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [2, 3],
            }}
          >
            {open && <img src={logo} alt="logo" />}
            <IconButton onClick={toggleDrawer}>
              {open && <MenuIcon />}
            </IconButton>
          </Toolbar>
          {/* SIDEBAR MENU ITEMS */}
          <List component="nav">
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
              sx={{
                marginTop: "3rem",
                mx: [2],
                paddingBottom: "9rem",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "normal", py: 1 }}>
                Select your shop
              </Typography>
              <SelectInput />
            </Stack>
          )}
        </Drawer>
        {/* MAIN CONTENT AREA */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box
            sx={{
              background:
                "linear-gradient(180deg, #21B8F9 0%, rgba(33, 184, 249, 0) 132.05%)",
              height: "182px",
              px: [3],
            }}
          >
            <Box
              sx={{
                py: [5, 5],
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
              }}
              maxWidth="xl"
            >
              <Typography variant="h4">Welcome Mario!</Typography>
              <Box
                sx={{
                  py: [2],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <Link
                  href="#"
                  sx={{ color: "white", textDecoration: "underline", px: [3] }}
                >
                  app.vetrinalive.it/fenoh-store
                </Link>
                <OpenInNewIcon />
              </Box>
            </Box>
          </Box>
          <Container maxWidth="xl" sx={{ mt: -9, mb: 4 }}>
            <Grid container columns={16} spacing={2}>
              <Grid item xs={16} md={12} lg={11} xl={11}>
                <VisitorsAndOrders />
                <MarketDemoPlace />
                <Stack sx={{ backgroundColor: "white" }} spacing={2}>
                  <AllNewsList />
                </Stack>
              </Grid>
              <Grid item xs={16} md={3} lg={2} xl={5}>
                <RightSection />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
