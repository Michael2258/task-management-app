import { Grid } from "@mui/material";
import NoteList from "../Note/NoteList";
import SearchBar from "../SearchBar/SearchBar";
import SwitchTheme from "../SwitchTheme/SwitchTheme";

const MainLayout = ({ isDarkTheme, setDarkTheme }) => {
    return (
        <Grid container className="main-layout-wrapper">
            <Grid className="search-bar-wrapper" item height="10%">
                <SearchBar />

                <div className="switch-theme-wrapper">
                    <SwitchTheme
                        isDarkTheme={isDarkTheme}
                        setDarkTheme={setDarkTheme}
                    />
                </div>
            </Grid>
            <Grid item height="90%">
                <NoteList />
            </Grid>
        </Grid>
    );
};

export default MainLayout;
