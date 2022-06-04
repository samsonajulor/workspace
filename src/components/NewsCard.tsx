import { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Link, Skeleton, styled } from "@mui/material";
import TextTruncate from "./TextTruncate/TextTruncate";
import { NewsContext } from "../context/NewsContext";
import { PayloadType } from "./models/DataStructure";

//   TEXT DESCRIPTIONS
const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  fontWeight: "700",
  lineHeight: "13px",
  lineClamp: 2,
  textOverflow: "ellipsis",
  overflow: "hidden",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
}));
const CardText = styled(Box)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "bold",
  lineHeight: "20px",
  padding: ".5rem 0px",
  color: theme.customProps.color,
}));
const CardSubtext = styled(Link)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "300",
  lineHeight: "12px",
  textDecoration: "underline",
  color: theme.customProps.color,
}));

const NewsCard = () => {
  console.log("NewsCard Rerndering");

  const { state } = useContext<any>(NewsContext);

  const loading = state.isLoading;
  const error = state.error && <div>{state.error}</div>;
  const data =
    state.data &&
    state.data.map((item: PayloadType, index: number) => (
      <Grid item xs={16} lg={8} columnSpacing={2} key={index} >
        <Card elevation={0} sx={{ display: "flex", borderRadius: "0px" }} >
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={210}
              height={118}
            />
          ) : (
            <CardMedia
              component="img" 
              sx={{ width: 151 }}
              image={item.urlToImage}
              alt={item.title}
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", maxWidth: "256.56px" }}>
              <CardTitle>
                {loading ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={210}
                    height={118}
                  />
                ) : (
                  <TextTruncate isMultiLine={false} text={item.source.name} />
                )}
              </CardTitle>
              <CardText>
                {loading ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={210}
                    height={118}
                  />
                ) : (
                  <TextTruncate isMultiLine={true} text={item.content} />
                )}
              </CardText>
              <CardSubtext
                as="a"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {loading ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={210}
                    height={118}
                  />
                ) : (
                  <TextTruncate isMultiLine={false} text={item.url} />
                )}
              </CardSubtext>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    ));

  if (error) {
    return error;
  } else {
    return data;
  }
};

export default NewsCard;
