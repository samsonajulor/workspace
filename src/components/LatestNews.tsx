import Card from '@mui/material/Card';
import Cards from './cards';

const { LatestNewsCard } = Cards
export default function LatestNews() {

  return (
    <Card sx={{ maxWidth: '729px', marginBottom: '20px', height: '617px' }}>
      <LatestNewsCard/>
    </Card>
  );
}
