import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { BsArrowRightShort } from "react-icons/bs";
import SplitButton from "./SplitButton";
import { Box, Link, Stack } from "@mui/material";
import { FC } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export type VisitorsOrdersContainerProps = {
  componentHeight?: string;
  cardLable: string;
  Icon?: any;
  hasReadMoreArrow?: boolean;
  readMoreLink?: string;
  hasDate?: boolean;
  backgroundColor?: string;
  LabelColor?: string;
  image?: any;
  children: React.ReactNode;
  hasTopRightUrl?: boolean;
};

const CardLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: theme.customProps.color,
  marginBottom: "0.5rem",
}));

const CardLink = styled(Link)(({ theme }) => ({
  fontSize: ".7rem",
  textDecoration: "underline",
  color: theme.palette.primary.main,
  marginRight: "1.5rem",
}));

const VisitorsOrdersContainer: FC<VisitorsOrdersContainerProps> = ({
  children,
  cardLable,
  Icon,
  hasDate,
  componentHeight,
  hasReadMoreArrow,
  backgroundColor,
  readMoreLink,
  image,
  LabelColor,
  hasTopRightUrl,
}) => {
  // const cardTopLink = () => (

  // );

  return (
    <Card
      sx={{
        maxWidth: "100%",
        minHeight: componentHeight,
        marginBottom: 2,
        backgroundColor: backgroundColor,
      }}
    >
      <CardContent>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Stack direction="row" columnGap={1}>
            {image && (
              <img
                src={image}
                alt="start"
                style={{
                  marginRight: "0rem",
                  marginBottom: "1rem",
                  width: "30%",
                }}
              />
            )}
            {Icon}
            <CardLabel
              variant="body2"
              style={{ color: LabelColor ? LabelColor : "" }}
            >
              {cardLable}
            </CardLabel>
          </Stack>
          {hasDate && <SplitButton />}
          {hasTopRightUrl && (
            <Box
              sx={{
                py: [2],
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#21B8F9",
              }}
            >
              <Link
                href="#"
                sx={{ color: "#21B8F9", textDecoration: "underline", px: [3] }}
              >
                visit our blog
              </Link>
              <OpenInNewIcon />
            </Box>
          )}
        </Stack>
        {children}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          mx: 2,
        }}
      >
        <CardLink>{readMoreLink}</CardLink>
        {hasReadMoreArrow && <BsArrowRightShort size={25} color="#21B8F9" />}
      </CardActions>
    </Card>
  );
};

export default VisitorsOrdersContainer;
