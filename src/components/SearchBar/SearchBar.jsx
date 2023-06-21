import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";

const SearchBar = ({ isDarkMode }) => {
    const { searchText, setSearchText, setCurrentPage } =
        useContext(NoteContext);

    return (
        <FormControl className="search-bar" variant="standard">
            <OutlinedInput
                sx={{
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                            borderColor: "transparent",
                        },
                    paddingLeft: 0,
                    fontSize: "1.8rem",
                    color: isDarkMode ? "#fff" : "#000",
                }}
                variant="standard"
                startAdornment={
                    <InputAdornment position="start">
                        <Search
                            fontSize="1.8rem"
                            color={isDarkMode ? "#fff" : "#757575"}
                        />
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
