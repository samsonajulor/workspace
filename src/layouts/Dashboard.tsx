import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
} from '@mui/material';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const styles = {
  box: { display: 'flex', height: '100vh' },
};
export const mdTheme = createTheme({
  customProps: {
    background: '#E5E5E5',
    color: '#103B66',
  },
  palette: {
    primary: {
      main: '#21B8F9',
    },
    secondary: {
      main: '#F33451',
    },
    extra: {
      orange: '#F3A35C',
      orangePrimary: '#FFA26B',
      greenPrimary: '#00C48C',
      darkGreen: '#005128',
      darkBlue: '#000032',
      tintBlue: '#E9F8FE',
    },
  },
});

/**
 * 
 * @returns 
 */
function Dashboard() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box className='Carousel__Image' sx={styles.box}>
        <CssBaseline />
        <Navbar />
        <Sidebar/>
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
