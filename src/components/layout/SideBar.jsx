import { Grid, Typography } from "@mui/material";
import NoteColorList from "../NoteColor/NoteColorList";

const SideBar = () => {
    return (
        <Grid container className="sidebar-wrapper">
            <Grid item height="10%" className="sidebar-title-wrapper">
                <Typography className="sidebar-title" variant="h4">
                    Michael
                </Typography>
            </Grid>

            <Grid item className="note-color-list">
                <NoteColorList />
            </Grid>
        </Grid>
    );
};

export default SideBar;
