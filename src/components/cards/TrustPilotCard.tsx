import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import star from '../../icons/star.svg';

export default function TrustPilotCard() {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '350px', marginBottom: '20px', height: '232px', padding: '14px', background: '#000032' }}>
     <Box>
       <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton aria-label="add to favorites">
            <img src={star} alt={`icon`} />
          </IconButton>
          <Typography align="left" variant="h6" color="white">
           Trustpilot
          </Typography>
        </Box>
       </Box>
     </Box>
      <Box>
        <Typography fontSize='17px' align="left" variant="body2" color="white">
         Show us your love by leaving a <span style={{color: '#00C48C'}}>positive</span> review on trust pilot and receive the extension of 50 additional products
        </Typography>
      </Box>
      <Box>
       <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Link
            href="/"
            variant="body2"
            sx={{
             textDecoration: 'underline',
             color: '#00C48C',
             '&:hover': {
              color: '#a5bab4',
             },
            }}
            rel="noopener noreferrer"
            target="_blank"
            >
            Write a review on trust pilot!
          </Link>
          <IconButton sx={{ color: "#00C48C" }}>
            <ArrowForwardIcon />
          </IconButton>
       </Box>
      </Box>
    </Card>
  );
}
