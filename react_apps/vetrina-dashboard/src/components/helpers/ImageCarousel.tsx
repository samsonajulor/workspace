import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import wwwext from '../../assets/wwwext.svg';
import products from '../../assets/50products.svg';



const itemData = [
  {
    img: wwwext,
    title: 'Breakfast',
    desc: 'Connect your own domain',
  },
  {
    img: products,
    title: 'Burger',
    desc: '50 Additional products',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    desc: 'helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    desc: 'nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    desc: 'hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    desc: 'arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    desc: 'tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    desc: 'katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    desc: 'silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    desc: 'shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    desc: 'peterlaster is a good',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    desc: 'southside_customs',
  },
];
const styles = {
  imageList: { border: 'none', width: '25rem' },
  image: { width: '10.3rem', height: '10.3rem' },
  imageListItemBar: { gap: '2px', textAlign: 'left', color: '#103B66' },
};

/**
 * 
 * @returns 
 */
export default function StickyHeadTable() {
  return (
    <ImageList sx={styles.imageList} className='Carousel__Image' cols={itemData.length} gap={110}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            style={styles.image}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading='lazy'
          />
          <ImageListItemBar
            subtitle={<span>{item.desc}</span>}
            position='below'
            sx={styles.imageListItemBar}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
