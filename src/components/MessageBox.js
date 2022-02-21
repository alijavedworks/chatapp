import { TextField } from "@mui/material";
import React from "react";

function MessageBox() {
  return (
    <div>
      <TextField
        maxwidth
        fullWidth
        multiline
        rows={3}
        id="message-box"
        color="primary"
        label="Your message"
        placeholder="Type in your message"
      />
    </div>
  );
}

export default MessageBox;
