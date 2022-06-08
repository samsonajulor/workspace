import Box from '@mui/material/Box';
import Carousel from './helpers/ImageCarousel';

export default function ExtensionCard() {
  const styles = {
    box: {
      maxWidth: '357px',
    },
  };
  return (
    <Box
      sx={styles.box}
    >
      <Carousel />
    </Box>
  );
}
