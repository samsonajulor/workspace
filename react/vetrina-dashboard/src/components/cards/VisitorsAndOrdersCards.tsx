import { Grid, Stack, Typography } from '@mui/material';
import { AiOutlineEye, AiOutlineUnorderedList } from 'react-icons/ai';
import CardsContainer from '../CardsContainer';

  const styles = {
    h4: {
      fontSize: '2rem',
      color: '#103B66',
      fontWeight: '700',
    },
    stackOne: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: '1rem',
    },
    typoOne: {
      fontSize: '1rem',
      color: '#103B66',
      fontWeight: '400',
    },
    typoTwo: {
      fontSize: '1rem',
      color: '#103B66',
      fontWeight: '700',
    },
    stackTwo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: '1rem',
    },
    typoThree: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: '1rem',
    },
    typoFour: {
      fontSize: '1rem',
      color: '#103B66',
      fontWeight: '700',
    },
  };
/**
 * 
 * @returns 
 */
const VisitorsAndOrders = () => {
  return (
    <Stack className='Carousel__Image' direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Grid item xs={16} data-testid='visitors'>
        <CardsContainer
          componentHeight='170px'
          cardLable='Visitors'
          hasDate={true}
          Icon={<AiOutlineEye size={25} color='#103B66' />}
          hasReadMoreArrow={true}
          readMoreLink='Do you want more visits? Contact us!'
        >
          <Typography variant='h4' sx={styles.h4}>
            1824
          </Typography>
        </CardsContainer>
      </Grid>
      <Grid item xs={16} data-testid='orders'>
        <CardsContainer
          componentHeight='170px'
          cardLable='Orders'
          hasDate={true}
          Icon={<AiOutlineUnorderedList size={25} color='#103B66' />}
          hasReadMoreArrow={false}
          readMoreLink='10 free tips to increase your sales'
        >
          <Stack sx={styles.stackOne}>
            <Typography variant='body1' sx={styles.typoOne}>
              Orders received:
            </Typography>
            <Typography variant='body1' sx={styles.typoTwo}>
              156
            </Typography>
          </Stack>
          <Stack sx={styles.stackTwo}>
            <Typography variant='body1' sx={styles.typoThree}>
              Earnings:
            </Typography>
            <Typography variant='body1' sx={styles.typoFour}>
              € 1893, 24
            </Typography>
          </Stack>
        </CardsContainer>
      </Grid>
    </Stack>
  );
}

export default VisitorsAndOrders