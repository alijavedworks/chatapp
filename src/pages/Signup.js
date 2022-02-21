import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";

export default function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
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
                  minWidth: 600,
                  mt: 5,
                  mb: 1,
                }}
              >
                <CardContent>
                  <CreateIcon />
                  <Typography variant="h5" gutterBottom>
                    Sign up for new account
                  </Typography>
                  <TextField
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                    }}
                    value={registerEmail}
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    autoFocus
                  />
                  <TextField
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    value={name}
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    autoFocus
                  />

                  <TextField
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                    }}
                    value={registerPassword}
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                  />
                  <TextField
                    onChange={(event) => {
                      setRepeatPassword(event.target.value);
                    }}
                    value={repeatPassword}
                    margin="normal"
                    id="repeat-password"
                    label="Repeat Password"
                    type="repeat-password"
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
                      color="secondary"
                      sx={{ mt: 2, mb: 0 }}
                    >
                      Signup
                    </Button>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <h5>Already have an account: </h5>
                      <Link to="../login">Sign In</Link>
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
}
