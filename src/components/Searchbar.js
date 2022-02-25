import { TextField } from "@mui/material";
import React, { useState } from "react";

function Searchbar({ onSearchChange }) {
  return (
    <div>
      <TextField
        fullWidth
        id="Search Contact"
        margin="normal"
        color="secondary"
        label="Search Contact"
        type="search"
        onChange={onSearchChange}
      />
    </div>
  );
}

export default Searchbar;
