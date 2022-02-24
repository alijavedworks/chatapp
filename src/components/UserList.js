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
import React from "react";

const Userlist() {
  return (
    <div>
      {users.map((doc) => {
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
    </div>
  );
}

export default Userlist;
