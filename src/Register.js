import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal(props) {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState(false);
    const [nameInput, setNameInput] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    async function handleRegister() {
        setLoadingRegister(true);
        await fetch("http://18.130.184.133:98/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput,
                name: nameInput,
                password: passwordInput,
            }),
        });
        setLoadingRegister(false);
        setOpen(false);
    }

    return (
        <div>
            <LoadingButton onClick={handleOpen} style={{ minWidth: "40vh", minHeight: "7vh" }} loadingIndicator="Loading..."
                variant="outlined">Register</LoadingButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box m={2} pt={3}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="email"
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                        </Box>
                        <Box m={2} pt={3}>

                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="name"
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        </Box>
                        <Box m={2} pt={3}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="password"
                                onChange={(e) => setPasswordInput(e.target.value)}
                            />
                        </Box>
                        <Box m={2} pt={3} >
                            <Button onClick={() => handleRegister()} color="secondary" variant="contained">
                                {loadingRegister ? `Registering...` : `Register`}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}
