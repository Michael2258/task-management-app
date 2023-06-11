import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";

const SearchBar = () => {
    const { searchText, setSearchText, setCurrentPage } =
        useContext(NoteContext);

    return (
        <FormControl className="search-bar" variant="standard">
            <OutlinedInput
                sx={{
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                            borderColor: "#fff",
                        },
                    paddingLeft: 0,
                    fontSize: "1.8rem",
                }}
                variant="standard"
                startAdornment={
                    <InputAdornment position="start">
                        <Search fontSize="1.8rem" />
                    </InputAdornment>
                }
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                    setCurrentPage(1);
                    setSearchText(e.target.value);
                }}
            />
        </FormControl>
    );
};

export default SearchBar;
