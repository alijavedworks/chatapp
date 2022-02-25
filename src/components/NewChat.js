import React from "react";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ChatIcon from "@mui/icons-material/Chat";

export default function NewChat({ users, selectUser }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={handleClickOpen("paper")}
      >
        <ChatIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Select contacts to Message
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {users.map((user) => {
                return (
                  <ListItem key={user} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${user + 1}`}
                          src={`https://www.w3schools.com/howto/img_avatar.png`}
                          //src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText />
                      <ListItemText id={user} primary={user.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
