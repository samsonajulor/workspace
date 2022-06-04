import { Grid, Typography, Link, styled, Stack } from "@mui/material";
import { BsArrowRightShort } from "react-icons/bs";
import Phone from "../assets/iPhone-12.png";

const CardLink = styled(Link)(({ theme }) => ({
  fontSize: ".7rem",
  textDecoration: "underline",
  color: theme.palette.primary.main,
  marginRight: "1.5rem",
}));

const ProductAdvert = () => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={16}
    >
      <Grid item xs={8} lg={8}>
        <Typography variant="h5" sx={{ fontSize: "1.5rem", color: "#fff" }}>
          Sell your products on your exclusive APP published on the stores
        </Typography>
        <Stack direction="row" sx={{ marginTop: ".5rem" }}>
          <CardLink variant="body1" sx={{ fontSize: ".9rem", color: "#fff" }}>
            Show more
          </CardLink>
          <BsArrowRightShort size={25} color="#fff" />
        </Stack>
      </Grid>
      <Grid
        item
        xs={8}
        lg={8}
        sx={{ alignItems: "end", alignContent: "end", textAlign: "right" }}
      >
        <img src={Phone} alt="globe"  />
      </Grid>
    </Grid>
  );
};

export default ProductAdvert;
