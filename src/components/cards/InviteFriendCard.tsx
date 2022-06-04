import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import users from '../../icons/users.svg';

export default function InviteFriendCard() {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '350px', marginBottom: '20px', height: '232px', padding: '14px' }}>
     <Box>
       <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton aria-label="add to favorites">
            <img src={users} alt={`icon`} />
          </IconButton>
          <Typography align="left" variant="h6" color="#103B66">
           Invite Friend
          </Typography>
        </Box>
       </Box>
     </Box>
      <Box>
        <Typography fontSize='17px' align="left" variant="body2" color="#103B66">
         <span style={{color: '#00C48C'}}>Receive 50 products</span> by inviting a friend who subscribes to a plan. Your friend will receive a 30% discount coupon valid for any card
        </Typography>
      </Box>
      <Box>
       <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Link
            href="/"
            variant="body2"
            sx={{
             textDecoration: 'underline',
             color: '#21B8F9',
             '&:hover': {
              color: '#798e97',
             },
            }}
            rel="noopener noreferrer"
            target="_blank"
            >
            Write a review on trust pilot!
          </Link>
          <IconButton color="primary">
            <ArrowForwardIcon />
          </IconButton>
       </Box>
      </Box>
    </Card>
  );
}
