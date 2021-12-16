import { Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { LOGIN_SUCCESSFUL } from "./react-redux/actions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import LoginHeader from "./LoginHeader";
import Register from "./Register";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function Login({ access_token, loggedIn, dispatch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    async function postLogin() {
      setLoading(true);
      const response = await fetch("http://localhost:98/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      dispatch({ type: LOGIN_SUCCESSFUL, payload: result });
      setLoading(false);
      setResponse(result);
    }
    postLogin();
  };
  const resultObject = {
    email: response.email ? "The email field is required." : "",
    password: response.password ? "The password has to be at least 6 characters." : "",
    error: response.error || "",
  };

  const handleChange = (e) => {
    e.target.id === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
  };

  return (
    <>
      <LoginHeader></LoginHeader>
      {loggedIn ? (
        <Navigate to="/types" />
      ) : (
        <Container component="main" maxWidth="xs">
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            // style={{ minHeight: "90vh" }}
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
              <FormControl>
                <TextField
                  style={{ minWidth: "40vh" }}
                  required
                  label="E-mail"
                  variant="outlined"
                  required
                  id="email"
                  label="email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={handleChange}
                  error={resultObject.email || resultObject.error}
                />
                <FormHelperText id="component-helper-text">
                  {resultObject.email || resultObject.error}
                </FormHelperText>
              </FormControl>
              <TextField
                style={{ minWidth: "40vh" }}
                required
                id="password"
                label="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handleChange}
                error={resultObject.password || resultObject.error}
              />
              <FormHelperText id="component-helper-text">
                {resultObject.password || resultObject.error}
              </FormHelperText>
              <LoadingButton
                style={{ minWidth: "40vh", minHeight: "7vh" }}
                onClick={handleSubmitLogin}
                loading={loading}
                loadingIndicator="Loading..."
                variant="outlined"
              >
                Login
              </LoadingButton>
              <Register />
            </Box>
          </Grid>
        </Container>
      )}
      <Footer></Footer>
    </>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const mapStateToProps = (store) => {
  const { access_token, loggedIn } = store;
  return { access_token, loggedIn };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
