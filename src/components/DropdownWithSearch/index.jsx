import React from "react";
import { Autocomplete, TextField } from "@mui/material";

function DropdownWithSearch({ options, onSelect }) {
  const handleInputChange = (event, value) => {
    onSelect(value);
  };

  return (
    <Autocomplete
      options={options}
      onChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Patient Id"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}

export default DropdownWithSearch;
