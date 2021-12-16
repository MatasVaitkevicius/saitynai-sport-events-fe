import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

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
    const [response, setResponse] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    function handleRegister(e) {
        e.preventDefault();

        async function handleRegister() {
            setLoadingRegister(true);
            const response = await fetch("http://18.130.184.133:98/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput,
                }),
            });
            const result = await response.json();
            setLoadingRegister(false);
            setResponse(result);
            if (result.message) {
                setOpen(false);
            }
        }
        handleRegister();
    }

    const resultObject = {
        ...(response.email && { email: "The email field is required." }),
        ...(response.password && { password: "The password has to be at least 6 characters." }),
        ...(response.error && { error: "" }),
        ...(response.message && { message: "" }),
    };

    return (
        <div>
            <LoadingButton
                onClick={handleOpen}
                style={{ minWidth: "40vh", minHeight: "7vh" }}
                loadingIndicator="Loading..."
                variant="outlined"
            >
                Register
            </LoadingButton>
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
                            <FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="email"
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    error={resultObject.email || resultObject.error}
                                />
                                <FormHelperText id="component-helper-text">
                                    {resultObject.email || resultObject.error}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Box m={2} pt={3}>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="password"
                                    type="password"
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    error={resultObject.password || resultObject.error}
                                />
                                <FormHelperText id="component-helper-text">
                                    {resultObject.password || resultObject.error}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Box m={2} pt={3}>
                            <LoadingButton
                                style={{ minWidth: "40vh", minHeight: "7vh" }}
                                onClick={handleRegister}
                                loading={loadingRegister}
                                loadingIndicator="Loading..."
                                variant="outlined"
                            >
                                Register
                            </LoadingButton>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
