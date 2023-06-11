import { Box } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import moment from "moment";
import RoundButton from "../common/RoundButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import React, { Fragment, useEffect, useState } from "react";

const NoteItem = ({
    note,
    onDelete,
    handleCreatingNotes,
    setSelectedNote,
    handleOpenUpdateModal,
}) => {
    const FORMAT_DATE = "MMM DD, YYYY";

    const isCreating = note?.isCreating;

    const [creatingContent, setCreatingContent] = useState("");

    useEffect(() => {
        setCreatingContent(note?.content);
    }, [note?.content]);

    return (
        <Box
            className="note-item-wrapper"
            sx={{ backgroundColor: note.color.colorCode }}
            component="div"
        >
            {note?.isStarred ? (
                <div className="starred-btn">
                    <RoundButton
                        IconElement={StarIcon}
                        size="small"
                        iconSize="small"
                        fillIcon="#ffce03"
                    />
                </div>
            ) : null}

            <Textarea
                className={`${
                    note?.isStarred
                        ? "note-item-text-area starred"
                        : "note-item-text-area"
                }`}
                readOnly={!isCreating}
                value={creatingContent}
                sx={{
                    "--Textarea-focusedHighlight": "transparent",
                }}
                onChange={(e) => setCreatingContent(e.target.value)}
                onBlur={() => {
                    handleCreatingNotes &&
                        isCreating &&
                        handleCreatingNotes({
                            content: creatingContent,
                            createdAt: note?.createdAt,
                            colorId: note?.colorId,
                            isStarred: false,
                        });
                }}
            />

            {!isCreating ? (
                <Fragment>
                    <div className="note-item-created-date">
                        <p>
                            {moment(note?.createdAt.toDate()).format(
                                FORMAT_DATE
                            )}
                        </p>
                    </div>

                    <div className="note-item-actions">
                        <div className="note-item-edit-btn">
                            <RoundButton
                                IconElement={EditIcon}
                                size="medium"
                                iconSize="small"
                                onClick={() => {
                                    setSelectedNote(note);
                                    handleOpenUpdateModal();
                                }}
                            />
                        </div>

                        <div className="note-item-delete-btn">
                            <RoundButton
                                IconElement={DeleteIcon}
                                onClick={() => onDelete(note?.id)}
                                size="medium"
                                iconSize="small"
                            />
                        </div>
                    </div>
                </Fragment>
            ) : null}
        </Box>
    );
};

export default React.memo(NoteItem);
