import { Fab } from "@mui/material";

const NoteColorItem = ({ noteColor, onClick }) => {
    return (
        <Fab
            onClick={onClick}
            className="note-color-item"
            sx={{ backgroundColor: noteColor?.colorCode }}
        ></Fab>
    );
};

export default NoteColorItem;
