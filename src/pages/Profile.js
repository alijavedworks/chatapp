import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebase-config";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const MyCard = styled(Card)({
  background: "linear-gradient(45deg, #f0c3ff 30%, #71e5ff 70%)",
});

function Profile() {
  const [data, setData] = useState("");
  const { user } = useContext(AuthContext);
  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapShot) => {
      let users = [];
      querySnapShot.forEach((doc) => {
        users.push(doc.data());
      });
      setData(users);
    });
    return () => unsub();
  }, []);
  console.log(data);
  return (
    <div>
      <Grid container spacing={0} alignItems="center" justifyContent="center">
        <Grid item xs={3}>
          <Box
            container
            noValidate
            component="form"
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
                  <PersonIcon />
                  <h2>Profile</h2>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Full Name</TableCell>
                          <TableCell align="right">{data.name}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          key="email"
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Email
                          </TableCell>
                          <TableCell align="right">Email</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </MyCard>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
