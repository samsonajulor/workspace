import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import BlogCards from './BlogCards';
import Grid from '@mui/material/Grid';
import file from '../../icons/file-text.svg';
import link from '../../icons/external-link.svg';

export default function MediaControlCard() {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', maxWidth: '729px', marginBottom: '20px', height: '617px', padding: '14px' }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box >
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton aria-label="add to favorites">
                <img src={file} alt={`icon`} />
              </IconButton>
              <Typography align="left" variant="h6" color="#103B66">
              Latest News
              </Typography>
            </Box>
          </Box>
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
                Visit our blog!
              </Link>
              <IconButton color="primary">
                <img src={link} alt={`icon`} />
              </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
            {Array.from(Array(8)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <BlogCards />
              </Grid>
            ))}
          </Grid>
      </Box>
    </Card>
  );
}
