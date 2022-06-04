import {
  Grid,
  Typography,
  Card,
} from "@mui/material";
import Globe from "../assets/globe.png";

const ExtensionsMarketplace = () => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Card
          sx={{
            backgroundColor: "#F3A35C",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: "2.3rem",
            marginBottom: ".6rem",
          }}
        >
          <img src={Globe} alt="globe" />
        </Card>
        <Typography variant="body1" sx={{ fontSize: "17px" }}>
          Connect your own domain
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            backgroundColor: "#00C48C",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: "2.3rem",
            color: "#fff",
            marginBottom: ".6rem",
            marginLeft: "2rem",
            marginRight: "-3rem",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" sx={{ fontSize: "26px", color: "#fff" }}>
            +50
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px", color: "#fff" }}>
            Prodotti
          </Typography>
        </Card>
        <Typography
          variant="body1"
          sx={{ marginLeft: "2rem", fontSize: "17px" }}
        >
          50 additional products
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExtensionsMarketplace;
