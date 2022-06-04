import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import spanner from '../../icons/spanner.svg';

export default function ConfigureShopCard() {

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '350px',
        marginBottom: '20px',
        height: '289px',
        padding: '14px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton aria-label='add to favorites'>
              <img src={spanner} alt={`icon`} />
            </IconButton>
            <Typography align='left' variant='h6' color='#103B66'>
              Configure your shop
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography mt='-25px' fontSize='34px' align='left' variant='h6' color='#FFA26B'>
          45%
        </Typography>
        <Typography mt='-20px' fontSize='15px' align='left' variant='subtitle1' color='#FFA26B'>
          Completed
        </Typography>
      </Box>
      <Box>
        <Typography fontSize='17px' align='left' variant='body2' color='#103B66'>
          Complete all the steps to have a complete shop to best present to your customers
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Link
            href='/'
            variant='body2'
            sx={{
              textDecoration: 'underline',
              color: '#21B8F9',
              '&:hover': {
                color: '#798e97',
              },
            }}
            rel='noopener noreferrer'
            target='_blank'
          >
            Complete the setup!
          </Link>
          <IconButton color='primary'>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
