import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import orders from '../../icons/orders.svg';

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

export default function Visitors() {
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
        maxWidth: '356px',
        marginBottom: '20px',
        height: '220px',
        padding: '14px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton aria-label='add to favorites'>
              <img src={orders} alt={`icon`} />
            </IconButton>
            <Typography align='left' variant='h6' color='#103B66'>
              Orders
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle1' color='#6C7C8C'>
            Orders Received:
          </Typography>
          <Typography variant='subtitle1' color='#103B66'>
            156
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography align='left' variant='subtitle1' color='#6C7C8C'>
            Earnings:
          </Typography>
          <Typography align='right' variant='subtitle1' color='#103B66'>
            £ 1893,24
          </Typography>
        </Box>
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
            10 free tips to increase your sales!
          </Link>
        </Box>
      </Box>
    </Card>
  );
}
