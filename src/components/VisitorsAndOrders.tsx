import { Grid, Stack, Typography } from '@mui/material';
import { AiOutlineEye, AiOutlineUnorderedList } from 'react-icons/ai';
import VisitorsOrdersContainer from './VisitorsOrdersContainer';

const VisitorsAndOrders = () => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Grid item xs={16} data-testid="visitors">
        <VisitorsOrdersContainer
          componentHeight="170px"
          cardLable="Visitors"
          hasDate={true}
          Icon={<AiOutlineEye size={25} color="#103B66" />}
          hasReadMoreArrow={true}
          readMoreLink="Do you want more visits? Contact us!"
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "2rem",
              color: "#103B66",
              fontWeight: "700",
            }}
          >
            1824
          </Typography>
        </VisitorsOrdersContainer>
      </Grid>
      <Grid item xs={16} data-testid="orders">
        <VisitorsOrdersContainer
          componentHeight="170px"
          cardLable="Orders"
          hasDate={true}
          Icon={<AiOutlineUnorderedList size={25} color="#103B66" />}
          hasReadMoreArrow={false}
          readMoreLink="10 free tips to increase your sales"
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: "1rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#103B66",
                fontWeight: "400",
              }}
            >
              Orders received:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#103B66",
                fontWeight: "700",
              }}
            >
              156
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: "1rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#103B66",
                fontWeight: "400",
              }}
            >
              Earnings:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#103B66",
                fontWeight: "700",
              }}
            >
              € 1893, 24
            </Typography>
          </Stack>
        </VisitorsOrdersContainer>
      </Grid>
    </Stack>
  );
}

export default VisitorsAndOrders