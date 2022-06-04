import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import eye from '../../icons/eye.svg';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VisitorsCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '349px',
        marginBottom: '20px',
        height: '220px',
        padding: '14px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton aria-label='add to favorites'>
              <img src={eye} alt={`icon`} />
            </IconButton>
            <Typography align='left' variant='h6' color='#103B66'>
              Visitors
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography align='right' variant='body2' color='#666666'>
              This Month
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </Box>
      </Box>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Typography variant='caption'>Something should be here</Typography>
      </Collapse>
      <Box>
        <Typography align='left' variant='h3' color='#103B66'>
          1893,24
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            Do you want more visits? Contact us!
          </Link>
          <IconButton sx={{ color: '#21B8F9' }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
