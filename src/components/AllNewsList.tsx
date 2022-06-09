import { Grid } from '@mui/material'
import { NewsContextProvider } from '../context/NewsContext';
import NewsCard from './cards/NewsCard'
import { useFetch } from "../customHooks/useFetch";
import CardsContainer from './CardsContainer';
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

const url =
    'https://newsapi.org/v2/everything?q=Apple&from=2022-05-29&sortBy=popularity&pageSize=8&apiKey=f8123501fb024c38b837b5cedb8ce9d4',
  styles = {
    icon: { color: '#103B66', width: '1.5rem' },
  };

/**
 * 
 * @returns 
 */
export const AllNewsList = () => {
   const state = useFetch(url);
  return (
    <CardsContainer
      cardLable="All News"
      hasDate={false}
      Icon={<FeedOutlinedIcon sx={styles.icon} />}
      hasReadMoreArrow={false}
      hasTopRightUrl={true}
    >
      <NewsContextProvider value={state}>
        <Grid container columns={16} spacing={2} role="contentinfo">
          <NewsCard />
        </Grid>
      </NewsContextProvider>
    </CardsContainer>
  );
}
