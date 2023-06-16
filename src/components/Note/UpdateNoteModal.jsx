import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    Stack,
    checkboxClasses,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import useUpdateNoteModal from "../../hooks/Note/useUpdateNoteModal";

const UpdateNoteModal = ({ handleClose, open }) => {
    const {
        updatingContent,
        isStarred,
        handleCloseUpdateNoteModal,
        selectedNote,
        setIsStarred,
        setUpdatingContent,
        handleUpdateNote,
    } = useUpdateNoteModal(handleClose);

    return (
        <Modal
            open={open}
            onClose={handleCloseUpdateNoteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: selectedNote?.color?.colorCode,
                }}
                className="update-modal-box"
            >
                <Textarea
                    defaultValue={updatingContent}
                    sx={{
                        "--Textarea-focusedHighlight": "transparent",
                        backgroundColor: selectedNote?.color?.colorCode,
                        height: "60%",
                        fontSize: "1.6em",
                    }}
                    onChange={(e) => setUpdatingContent(e.target.value)}
                    className="update-textarea"
                />

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => setIsStarred(e.target.checked)}
                                checked={isStarred}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                        label="Starred"
                        sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                                color: "#000",
                            },
                        }}
                    />
                </FormGroup>

                <Stack className="update-note-btns" direction="row" spacing={2}>
                    <Button
                        className="note-btn close-note-btn"
                        variant="contained"
                        onClick={handleCloseUpdateNoteModal}
                    >
                        Close
                    </Button>
                    <Button
                        className="note-btn update-note-btn"
                        variant="contained"
                        onClick={handleUpdateNote}
                    >
                        Update
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default UpdateNoteModal;
