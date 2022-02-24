import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function User({ user, selectUser }) {
  return (
    <div>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem key={user} disablePadding>
          <ListItemButton onClick={() => selectUser(user)}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${user + 1}`}
                src={`https://www.w3schools.com/howto/img_avatar.png`}
                //src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText />
            <ListItemText
              id={user}
              primary={user.name}
              secondary={`-last message from ${user.name}`}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default User;
