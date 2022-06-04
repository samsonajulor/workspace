import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Carousel from '../helpers/ImageCarousel';
import app from '../../icons/new-app.svg'

export default function ExtensionCard() {

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '357px',
        marginBottom: '20px',
        height: '343px',
        padding: '14px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton aria-label='add to favorites'>
              <img src={app} alt={`icon`} />
            </IconButton>
            <Typography align='left' variant='h6' color='#103B66'>
              Extensions Marketplace
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Carousel />
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
            Discover all extensions
          </Link>
          <IconButton sx={{ color: '#21B8F9' }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
