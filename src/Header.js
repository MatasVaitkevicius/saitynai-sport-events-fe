import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { ReactComponent as ReactLogo } from './images/deseret-industries.svg';

export default function Header() {
    return (
        <AppBar position="static">

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ReactLogo />
                    <Typography
                        variant="h6"
                    >
                        Sport Events
                    </Typography>
                    <Box ml={5}>
                        <Button
                            component={Link}
                            to={`/types`}
                            variant="contained"
                        >
                            Types
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}