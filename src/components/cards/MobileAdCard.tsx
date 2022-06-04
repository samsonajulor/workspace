import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import phone from '../../icons/phone.svg';
import appstore from '../../icons/appstore.svg';
import googleplay from '../../icons/googleplay.svg';

export default function MobileAdCard() {

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '348px',
        marginBottom: '20px',
        height: '343px',
        backgroundColor: '#F3A35C',
        padding: '14px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              maxWidth: '162px',
              height: '135px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            <Typography align='left' variant='body2' color='white' fontSize='22px'>
              Sell your products on your exclusive APP published on the stores
              <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <Link
                  href='/'
                  variant='body2'
                  sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      color: 'blue',
                    },
                    fontSize: '17px',
                  }}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Show more
                </Link>
                <IconButton sx={{ color: '#ffffff' }}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <img src={phone} alt={`icon`} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box >
            <img src={appstore} alt={`icon`} />
          </Box>
          <Box >
            <img src={googleplay} alt={`icon`} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
