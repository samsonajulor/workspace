import * as React from 'react';
import { Box, Toolbar, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import RightContent from '../components/RightContent';
import { AllNewsList } from '../components/AllNewsList';
import VisitorsAndOrders from '../components/cards/VisitorsAndOrdersCards';
import MarketCard from '../components/cards/MarketCard';

const styles = {
  boxOne: {
    backgroundColor: 'grey',
    flexGrow: 1,
    height: '100vh',
  },
  boxTwo: {
    background: 'linear-gradient(180deg, #21B8F9 0%, rgba(33, 184, 249, 0) 132.05%)',
    height: '182px',
    px: [3],
  },
  boxThree: {
    py: [5, 5],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
  },
  boxFour: {
    py: [2],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
  },
  link: { color: 'white', textDecoration: 'underline', px: [3] },
};

function MainContent() {
  return (
    <>
      <Box component='main' sx={styles.boxOne}>
        <Toolbar />
        <Box sx={styles.boxTwo}>
          <Box sx={styles.boxThree} maxWidth='xl'>
            <Typography variant='h4'>Welcome Hakeem!</Typography>
            <Box sx={styles.boxFour}>
              <Link
                href='https://github.com/samsonajulor/workspace/tree/ReactTSFrontend/vetrina-dashboard-clone'
                sx={styles.link}
              >
                view code on github
              </Link>
              <OpenInNewIcon />
            </Box>
          </Box>
        </Box>
        <Container maxWidth='xl' sx={{ mt: -9, mb: 4 }}>
          <Grid container columns={16} spacing={2}>
            <Grid item xs={16} md={12} lg={11} xl={11}>
              <VisitorsAndOrders />
              <MarketCard />
              <Stack spacing={2}>
                <AllNewsList />
              </Stack>
            </Grid>
            <Grid item xs={16} md={3} lg={2} xl={5}>
              <RightContent />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default MainContent;
