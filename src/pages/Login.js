import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase-config";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import LoginServices from "../services/LoginServices";
import UserService from "../services/UserServices";

const MyCard = styled(Card)({
  background: "linear-gradient(45deg, #f0c3ff 30%, #71e5ff 70%)",
});

const isEmail = (input) =>
  input.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? true
    : false;

export const Login = () => {
  const [user, setUser] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      let shouldBeEmail = loginEmail;
      setError("");
      setLoading(true);
      // check if username or email
      if (!isEmail(shouldBeEmail)) {
        // get Email from user
        console.log("here");
        const snapshot = await UserService.getUsersByName(shouldBeEmail);
        const user = snapshot.docs[0]?.data();
        if (!user) throw "Invalid username";
        shouldBeEmail = user.registerEmail;
      }
      const user = await LoginServices.Login(shouldBeEmail, loginPassword);
      navigate("../chats", { replace: true });
    } catch (error) {
      console.error(error);
      setError("Failed to Sign in");
    }
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div>
      <Grid container spacing={0} alignItems="center" justifyContent="center">
        <Grid item xs={3}>
          <Box
            container
            noValidate
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            spacing={2}
            justify="center"
            style={{ minHeight: "70vh" }}
            autoComplete="off"
          >
            <div>
              <MyCard
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  minWidth: 275,
                  mt: 5,
                  mb: 1,
                }}
              >
                <CardContent>
                  <LockOutlinedIcon />
                  <Typography variant="h4" gutterBottom>
                    Login
                  </Typography>
                  {error && (
                    <Alert
                      sx={{
                        justifyContent: "center",
                        my: 1,
                        mx: 4,
                      }}
                      severity="error"
                    >
                      {error}
                    </Alert>
                  )}
                  <TextField
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    value={loginEmail}
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    me="email"
                    autoComplete="email"
                  />

                  <TextField
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    value={loginPassword}
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 0 }}
                    >
                      Login
                    </Button>
                    <Link to="./">Forgot password?</Link>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <h5>Don't have an account: </h5>
                      <Link to="../signup">Sign up</Link>
                    </Stack>
                  </Stack>
                </CardContent>
              </MyCard>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
