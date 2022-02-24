import React from "react";
import { useEffect, useState } from "react";
import "./chat.css";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { AppBar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Searchbar from "../components/Searchbar";
import NewGroupChat from "../components/NewGroupChat";
import NewChat from "../components/NewChat";
import { Typography } from "@mui/material";
import Message from "../components/Message";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import User from "../components/User";
const drawerWidth = 240;

function Chats() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
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
    setChat(user);
    console.log(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapShot) => {
      let msgs = [];
      querySnapShot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };
  console.log(msgs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  };

  return (
    <div className="container">
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Header></Header>
        </AppBar>
        <CssBaseline />

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <div className="home_container">
              <div className="users_container">
                <List
                  dense
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
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
          </Box>
        </Drawer>

        <div className="message_container">
          {chat ? (
            <div>
              <Box component="main" sx={{ flexGrow: 1, m: 1, ml: 3 }}>
                <Toolbar />

                <div className="message_user">
                  <h3>{chat.name}</h3>
                </div>
                <div className="message">
                  <Box
                    sx={{
                      flexGrow: 1,
                      maxHeight: "10%",
                      overflow: "auto",
                      mb: 1,
                      my: 1,
                    }}
                  >
                    {msgs.length
                      ? msgs.map((msg, i) => <Message keys={i} msg={msg} />)
                      : null}
                  </Box>
                </div>
              </Box>
              <div>
                <Box sx={{ flexGrow: 1, mr: 3, ml: 3 }}>
                  <MessageBox
                    handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                  />
                </Box>
              </div>
            </div>
          ) : (
            <h3 className="no_user">Select a user to start a converstation</h3>
          )}
        </div>
      </Box>
    </div>
  );
}

export default Chats;
