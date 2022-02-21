import { TextField } from "@mui/material";
import React from "react";

function Searchbar() {
  return (
    <div>
      <TextField
        id="Search Contact"
        color="secondary"
        label="Search Contact"
        type="search"
      />
    </div>
  );
}

export default Searchbar;
