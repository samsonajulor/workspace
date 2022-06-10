import { Card, CardActionArea, CardContent, Grid, Stack } from '@mui/material';
import { CgExtensionAdd } from 'react-icons/cg';
import ExtensionCard from './ExtensionCard';
import ProductCard from './ProductCard';
import CardsContainer from '../CardsContainer';

// styles
const styles = {
  card: {
    maxWidth: '100%',
    marginBottom: 2,
    backgroundColor: '#F3A35C',
    borderRadius: '10px',
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

/**
 *
 * @returns
 */
const MarketCard = () => {
  return (
    <Stack className='Carousel__Image' direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Grid item xs={16}>
        <Card sx={styles.card}>
          <CardActionArea>
            <CardContent>
              <ProductCard />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={16} data-testid='extensions-marketplace'>
        <CardsContainer
          componentHeight='320px'
          cardLable='Extensions Marketplace'
          hasDate={false}
          Icon={<CgExtensionAdd size={25} color='#103B66' />}
          hasReadMoreArrow={true}
          readMoreLink='Discover all extensions'
        >
          <ExtensionCard />
        </CardsContainer>
      </Grid>
    </Stack>
  );
};

export default MarketCard;
