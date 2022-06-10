import { Avatar, Button, Stack, styled, Typography } from '@mui/material';
import { FiHeadphones, FiUsers } from 'react-icons/fi';
import { TiSpannerOutline } from "react-icons/ti";
import Trimmer from './Trimmer/Trimmer';
import CardsContainer from './CardsContainer';
import Star from "../assets/star.svg";
import UserImage from "../assets/user.webp";


const ContactusButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'theme.palette.primary.main',
  color: "white",
  fontSize: ".7rem",
  textTransform: "none",
  fontWeight: "normal",
  padding: "0.8rem 3rem",
  borderRadius: "0.5rem",
  marginTop: "1rem",
  marginBottom: ".1rem",
}));

const styles = {
  h4: {
    fontSize: '2rem',
    color: '#F3A35C',
    fontWeight: '700',
  },
  h5: {
    fontSize: '11px',
    color: '#F3A35C',
    fontWeight: '700',
  },
  h3: {
    fontSize: '17px',
    color: '#fff',
    fontWeight: '700',
  },
  positive: { color: '#00C48C' },
  inviteFriend: {
    fontSize: '17px',
    color: '#103B66',
    fontWeight: '700',
  },
  avatar: {
    bgcolor: '#00C48C',
    marginRight: '2rem',
    color: 'white',
    fontSize: '1.5rem',
  },
  stackOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
  },
  stackTwo: {
    fontSize: '15px',
    color: '#103B66',
    fontWeight: '400',
  },
  span: { color: '#00C48C' },
};

/**
 * 
 * @returns 
 */
const RightContent = () => {
  return (
    <>
      <CardsContainer
        cardLable='Configure your shop'
        hasDate={false}
        Icon={<TiSpannerOutline size={25} color='#103B66' />}
        hasReadMoreArrow={true}
        readMoreLink='Complete the setup!'
      >
        <Typography data-testid='right-section-percentage' variant='h4' sx={styles.h4}>
          45%
        </Typography>
        <Typography sx={styles.h5}>Completed</Typography>
        <Typography sx={{ mt: '1rem' }} component='div'>
          <Trimmer text='Complete all the steps to have a complete shop to best present your customers' />
        </Typography>
      </CardsContainer>
      <CardsContainer
        backgroundColor='#000032'
        image={Star}
        LabelColor='#00C48C'
        cardLable='Trustpilot'
        hasDate={false}
        hasReadMoreArrow={true}
        readMoreLink='Write a review on Trustpilot!'
      >
        <Typography data-testid='right-section-trustpilot' sx={styles.h3}>
          Show us your love by leaving a <span style={styles.positive}>positive</span> review on
          trust pilot and receive the extension of <strong>50 additional products</strong>
        </Typography>
      </CardsContainer>
      <CardsContainer
        cardLable='Invite friend'
        hasDate={false}
        Icon={<FiUsers size={25} color='#103B66' />}
        hasReadMoreArrow={true}
        readMoreLink='Start inviting friends!'
      >
        <Typography data-testid='right-section-invite-friend' sx={styles.inviteFriend}>
          <span style={styles.span}>Receive 50 products</span> by inviting a friend who subscribes
          to a plan. Your friend will receive 30% discount coupon valid any plan.
        </Typography>
      </CardsContainer>
      <CardsContainer
        cardLable='Customer support'
        hasDate={false}
        Icon={<FiHeadphones size={25} color='#103B66' />}
        hasReadMoreArrow={false}
      >
        <Stack sx={styles.stackOne}>
          <Avatar sx={styles.avatar} alt='Simone' src={UserImage} />
          <Typography data-testid='right-section-customer-support' sx={styles.stackTwo}>
            Samson is here to help.
          </Typography>
        </Stack>
        <ContactusButton variant='contained'>Contact Us</ContactusButton>
      </CardsContainer>
    </>
  );
};

export default RightContent;