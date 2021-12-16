import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "#1976d2",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography>© 2021 Sport Events</Typography>
    </div>
  );
}
