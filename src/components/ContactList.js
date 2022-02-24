import React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Searchbar from "./Searchbar";
import { Stack } from "@mui/material";
import NewGroupChat from "./NewGroupChat";
import NewChat from "./NewChat";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import User from "./User";
function ContactList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapShot) => {
      let users = [];
      querySnapShot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = (user) => {
    console.log(user);
  };
  return (
    <div className="home container">
      <div className="users container">
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>{<Searchbar />}</ListItem>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <NewChat />
            <NewGroupChat />
          </Stack>
        </List>
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
