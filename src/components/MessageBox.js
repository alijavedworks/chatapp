import { TextField } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

function MessageBox({ handleSubmit, text, setText, loading }) {
  return (
    <div>
      <Box
        container
        noValidate
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TextField
          fullWidth
          rows={2}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          id="message-box"
          color="primary"
          label="Your message"
          placeholder="Type in your message"
        />

        <Stack
          direction="row"
          justifyContent="right"
          alignItems="right"
          spacing={2}
        >
          <Button
            sx={{ mx: 3, my: 1 }}
            color="primary"
            type="submit"
            disabled={loading}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default MessageBox;
