import Box from '@mui/material/Box';
import Carousel from '../helpers/ImageCarousel';

const styles = {
  box: {
    maxWidth: '357px',
  },
};
/**
 *
 * @returns
 */
export default function ExtensionCard() {
  return (
    <Box sx={styles.box}>
      <Carousel />
    </Box>
  );
}
