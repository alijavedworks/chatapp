import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Searchbar from "./Searchbar";
import { Typography } from "@mui/material";

function ContactList() {
  return (
    <div>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem>{<Searchbar />}</ListItem>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
          const labelId = `Contact-${value}`;
          return (
            <ListItem key={value} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`https://www.w3schools.com/howto/img_avatar.png`}
                    //src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText />
                <ListItemText
                  id={labelId}
                  primary={`Contact ${value + 1}`}
                  secondary={`-last message from ${value + 1}`}
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
