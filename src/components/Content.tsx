import Cards from './cards';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LatestNews from './LatestNews'

const { 
  VisitorsCard,
  OrdersCard,
  ConfigureShopCard,
  MobileAdCard,
  ExtensionCard,
  TrustPilotCard,
  InviteFriendCard,
  CustomerSupport
} = Cards;
export default function Content() {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 100, backgroundColor: "inherit" }}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
         {/* Top Cards Left */}
          <Grid container spacing={3} >
           <Grid item lg={6} md={6} sm={12} xs={12}>
             <VisitorsCard />
           </Grid>
           <Grid item lg={6} md={6} sm={12} xs={12}>
             <OrdersCard />
           </Grid>
          </Grid>
         {/* Middle Cards Left */}
          <Grid container spacing={3}>
           <Grid item lg={6} md={6} sm={12} xs={12}>
             <MobileAdCard />
           </Grid>
           <Grid item lg={6} md={6} sm={12} xs={12}>
             <ExtensionCard />
           </Grid>
          </Grid>
         {/* Bottom Card Left */}
          <Grid container spacing={3}>
           <Grid item xs={12}>
             <LatestNews />
           </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
             <ConfigureShopCard />
             <TrustPilotCard />
             <InviteFriendCard />
             <CustomerSupport />
        </Grid>
      </Grid>
    </Box>
  );
}
