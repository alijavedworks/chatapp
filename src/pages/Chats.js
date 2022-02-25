import React from "react";
import { useEffect, useState } from "react";
import "./chat.css";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { AppBar } from "@mui/material";
import Searchbar from "../components/Searchbar";
import NewGroupChat from "../components/NewGroupChat";
import NewChat from "../components/NewChat";
import Message from "../components/Message";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import Users from "../components/Users";

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

  const selectUser = async (user) => {
    setChat(user);
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
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

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

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });
    setText("");
  };

  return (
    <div className="container">
      <div className="home_container">
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        ></AppBar>
        <div className="users_container">
          <Searchbar />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <NewChat users={users} selectUser={selectUser} />
            <NewGroupChat users={users} selectUser={selectUser} />
          </Stack>

          {users.map((user) => (
            <Users
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </div>

        <div className="messages_container">
          {chat ? (
            <div>
              <div className="messages_user">
                <h3>{chat.name}</h3>
              </div>
              <div className="messages">
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message keys={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
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
            <h3 className="no_conv">Select a user to start a converstation</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
