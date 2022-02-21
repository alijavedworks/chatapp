import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("../chats");
  };
  const MyCard = styled(Card)({
    background: "linear-gradient(45deg, #f0c3ff 30%, #71e5ff 70%)",
  });

  return (
    <div>
      <Header></Header>
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
                    autoFocus
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
