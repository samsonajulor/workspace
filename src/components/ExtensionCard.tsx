import Box from '@mui/material/Box';
import Carousel from './helpers/ImageCarousel';

export default function ExtensionCard() {
  return (
    <Box
      sx={{
        maxWidth: '357px',
      }}
    >
      <Carousel />
    </Box>
  );
}
