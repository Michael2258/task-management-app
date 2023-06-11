import { Grid } from "@mui/material";
import NoteList from "../Note/NoteList";
import SearchBar from "../SearchBar/SearchBar";

const MainLayout = () => {
    return (
        <Grid container className="main-layout-wrapper">
            <Grid className="search-bar-wrapper" item height="10%">
                <SearchBar />
            </Grid>
            <Grid item height="90%">
                <NoteList />
            </Grid>
        </Grid>
    );
};

export default MainLayout;
