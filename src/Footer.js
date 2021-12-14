import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <AppBar>
      <Grid position={"sticky"} display="flex" justifyContent="center">
        <Typography>© 2021 Sport Events</Typography>
      </Grid>
    </AppBar>
  );
}
