import React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Searchbar from "./Searchbar";
import { Stack } from "@mui/material";
import NewGroupChat from "./NewGroupChat";
import NewChat from "./NewChat";
import UserService from "../services/UserServices";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";

function ContactList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapShot) => {
      querySnapShot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const getUsers = async () => {
    const data = await UserService.getAllUsers();
    console.log(data);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div>
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
        {users.map((doc, index) => {
          const labelId = `Contact-${doc}`;
          return (
            <ListItem key={doc} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${doc + 1}`}
                    src={`https://www.w3schools.com/howto/img_avatar.png`}
                    //src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText />
                <ListItemText
                  id={labelId}
                  primary={doc.name}
                  secondary={`-last message from ${doc.name}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ContactList;
