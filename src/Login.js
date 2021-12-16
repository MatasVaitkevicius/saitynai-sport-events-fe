import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { POST_DATA } from "./react-redux/actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function Login({ dispatch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log("handlesubmit");
        e.preventDefault();
        dispatch({
            type: POST_DATA,
            payload: {
                email: email,
                password: password,
                apiUrl: "http://localhost:98/api/login",
            },
        });
    };

    const handleChange = (e) => {
        e.target.id === "email"
            ? setEmail(e.target.value)
            : setPassword(e.target.value);
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Grid container
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <TextField required label="E-mail" variant="outlined"
                            required
                            id="email"
                            label="email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={handleChange}
                        />
                        <LoadingButton
                            onClick={handleSubmit}
                            // loading={loading}
                            loadingIndicator="Loading..."
                            variant="outlined"
                        >
                            Login
                        </LoadingButton>
                    </Box>
                </Grid>
            </Container>
        </>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return { dispatch };
};

// const mapStateToProps = (store) => {
//   const { apiUrl } = store;
//   return { apiUrl };
// };

export default connect(null, mapDispatchToProps)(Login);
