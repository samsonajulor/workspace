import { Grid, Typography, Link, styled, Stack } from '@mui/material';
import { BsArrowRightShort } from 'react-icons/bs';
import Phone from '../../assets/iPhone-12.png';
import AppStore from '../../assets/appStore.png';
import GooglePlay from '../../assets/googlePlay.png';

const CardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'underline',
  marginRight: '1.5rem',
  ontSize: '.9rem',
  color: '#fff',
}));
const styles = {
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '20px',
  },
  typo: { fontSize: '1.5rem', color: '#fff' },
  grid: { alignItems: 'end', alignContent: 'end', textAlign: 'right' },
};

/**
 * 
 * @returns 
 */
const ProductCard = () => {
  return (
    <>
      <Grid
        className='Carousel__Image'
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={16}
      >
        <Grid item xs={8} lg={8}>
          <Typography variant='h5' sx={styles.typo}>
            Sell your products on your exclusive APP published on the stores
          </Typography>
          <Stack direction='row' sx={{ marginTop: '.5rem' }}>
            <CardLink variant='body1'>Show more</CardLink>
            <BsArrowRightShort size={25} color='#fff' />
          </Stack>
        </Grid>
        <Grid item xs={8} lg={8} sx={styles.grid}>
          <img src={Phone} alt='globe' />
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={16}
        sx={styles.cardActions}
      >
        <Grid item xs={8} lg={8}>
          <img src={AppStore} alt='appStore' />
        </Grid>
        <Grid item xs={8} lg={8} sx={styles.grid}>
          <img src={GooglePlay} alt='GooglePlay' />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductCard;
