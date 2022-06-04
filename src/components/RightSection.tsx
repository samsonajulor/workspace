import { Avatar, Button, Stack, styled, Typography } from '@mui/material';
import { FiHeadphones, FiUsers } from 'react-icons/fi';
import { TiSpannerOutline } from "react-icons/ti";
import TextTruncate from "./TextTruncate/TextTruncate";
import VisitorsOrdersContainer from './VisitorsOrdersContainer';
import Star from "../assets/star.svg";
import UserImage from "../assets/user.webp";


const ContactusButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontSize: ".7rem",
  textTransform: "none",
  fontWeight: "normal",
  padding: "0.8rem 3rem",
  borderRadius: "0.5rem",
  marginTop: "1rem",
  marginBottom: ".1rem",
}));


const RightSection = () => {
  return (
    <>
      <VisitorsOrdersContainer
        cardLable="Configure your shop"
        hasDate={false}
        Icon={<TiSpannerOutline size={25} color="#103B66" />}
        hasReadMoreArrow={true}
        readMoreLink="Complete the setup!"
      >
        <Typography
          data-testid="right-section-percentage"
          variant="h4"
          sx={{
            fontSize: "2rem",
            color: "#F3A35C",
            fontWeight: "700",
          }}
        >
          45%
        </Typography>
        <Typography
          sx={{
            fontSize: "11px",
            color: "#F3A35C",
            fontWeight: "700",
          }}
        >
          Completed
        </Typography>
        <Typography sx={{ marginTop: "1rem" }} component="div">
          <TextTruncate text="Complete all the steps to have a complete shop to best present your customers" />
        </Typography>
      </VisitorsOrdersContainer>
      <VisitorsOrdersContainer
        backgroundColor="#000032"
        image={Star}
        LabelColor="#00C48C"
        cardLable="Trustpilot"
        hasDate={false}
        hasReadMoreArrow={true}
        readMoreLink="Write a review on Trustpilot!"
      >
        <Typography
          data-testid="right-section-trustpilot"
          sx={{
            fontSize: "17px",
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Show us your love by leaving a{" "}
          <span style={{ color: "#00C48C" }}>positive</span> review on trust
          pilot and receive the extension of{" "}
          <strong>50 additional products</strong>
        </Typography>
      </VisitorsOrdersContainer>
      <VisitorsOrdersContainer
        cardLable="Invite friend"
        hasDate={false}
        Icon={<FiUsers size={25} color="#103B66" />}
        hasReadMoreArrow={true}
        readMoreLink="Start inviting friends!"
      >
        <Typography
          data-testid="right-section-invite-friend"
          sx={{
            fontSize: "17px",
            color: "#103B66",
            fontWeight: "700",
          }}
        >
          <span style={{ color: "#00C48C" }}>Receive 50 products</span> by
          inviting a friend who subscribes to a plan. Your friend will receive
          30% discount coupon valid any plan.
        </Typography>
      </VisitorsOrdersContainer>
      <VisitorsOrdersContainer
        cardLable="Customer support"
        hasDate={false}
        Icon={<FiHeadphones size={25} color="#103B66" />}
        hasReadMoreArrow={false}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#00C48C",
              marginRight: "2rem",
              color: "white",
              fontSize: "1.5rem",
            }}
            alt="Simone"
            src={UserImage}
          />
          <Typography
            data-testid="right-section-customer-support"
            sx={{
              fontSize: "15px",
              color: "#103B66",
              fontWeight: "400",
            }}
          >
            Simone is here to help.
          </Typography>
        </Stack>
        <ContactusButton variant="contained">Contact Us</ContactusButton>
      </VisitorsOrdersContainer>
    </>
  );
}

export default RightSection