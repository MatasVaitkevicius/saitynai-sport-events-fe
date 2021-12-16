import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ReactComponent as ReactLogo } from './images/deseret-industries.svg';

export default function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ReactLogo />
                    <Typography variant="h6">Sport Events</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
