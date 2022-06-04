import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import headphones from '../../icons/headphones.svg';

export default function CustomerSupport() {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '349px', marginBottom: '20px', height: '197px', padding: '14px' }}>
     <Box>
       <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton aria-label="add to favorites">
            <img src={headphones} alt={`icon`} />
          </IconButton>
          <Typography align="left" variant="h6" color="#103B66">
           Customer Support
          </Typography>
        </Box>
       </Box>
     </Box>
      <Box>
       <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <IconButton color="primary">
            <Avatar />
          </IconButton>
          <Typography align="left" variant="body2" color="#103B66">
            Samson is here to help you.
          </Typography>  
       </Box>
      </Box>
      <Box>
          <Button variant="contained" sx={{padding: "15px 20px 15px 20px", width: '158px', height: '50px', color: '#ffffff', background: '#21B8F9'}}>Contact us</Button>
      </Box>
    </Card>
  );
}
