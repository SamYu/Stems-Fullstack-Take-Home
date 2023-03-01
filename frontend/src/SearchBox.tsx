import React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSearchBox from "./useSearchBox";
import { CircularProgress } from "@mui/material";

function SearchBox() {
  const { results, setQuery, isLoading } = useSearchBox();

  return (
    <div className="searchBoxContainer">
      <Autocomplete
        options={results}
        loading={isLoading}
        noOptionsText="No results"
        onInputChange={(_, newInputValue) => {
          setQuery(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for something!"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}

export default SearchBox;
