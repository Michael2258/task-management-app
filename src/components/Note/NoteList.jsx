import { Fragment, useState } from "react";
import useNoteList from "../../hooks/Note/useNoteList";
import { Grid, Pagination, Skeleton, Typography } from "@mui/material";
import NoteItem from "./NoteItem";
import moment from "moment";
import UpdateNoteModal from "./UpdateNoteModal";
import { LIMIT_PER_PAGE } from "../../constants";

const NoteList = () => {
    const {
        currentPage,
        handlePagination,
        totalNotes,
        handleDeleteNoteList,
        filterNotes,
        creatingNotes,
        handleCreatingNotes,
        setSelectedNote,
        isLoading,
    } = useNoteList();

    const [isOpenUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => setOpenUpdateModal(true);
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);

    return (
        <Grid container sx={{ height: "100%" }}>
            <Grid item className="notelist-title-wrapper" xs={12}>
                <Typography className="notelist-title" variant="h3">
                    Notes
                </Typography>

                <Pagination
                    onChange={handlePagination}
                    className="pagination"
                    count={Math.ceil(totalNotes / LIMIT_PER_PAGE)}
                    page={currentPage || 1}
                    size="large"
                />
            </Grid>

            <Grid item xs={12} className="notelist-wrapper">
                <div className="scrollable-container-note-list">
                    <div className="note-list-content">
                        {isLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width={210}
                                height={118}
                            />
                        ) : (
                            <Fragment>
                                {creatingNotes
                                    .sort((a, b) =>
                                        moment(b.createdAt.toDate()).diff(
                                            moment(a.createdAt.toDate())
                                        )
                                    )
                                    .map((creatingNote, idx) => (
                                        <NoteItem
                                            handleCreatingNotes={
                                                handleCreatingNotes
                                            }
                                            key={idx}
                                            note={creatingNote}
                                            setSelectedNote={setSelectedNote}
                                            handleOpenUpdateModal={
                                                handleOpenUpdateModal
                                            }
                                            onDelete={handleDeleteNoteList}
                                        />
                                    ))}

                                {filterNotes
                                    .sort((a, b) =>
                                        moment(b.createdAt.toDate()).diff(
                                            moment(a.createdAt.toDate())
                                        )
                                    )
                                    .map((note, idx) => (
                                        <NoteItem
                                            key={idx}
                                            note={note}
                                            setSelectedNote={setSelectedNote}
                                            handleOpenUpdateModal={
                                                handleOpenUpdateModal
                                            }
                                            onDelete={handleDeleteNoteList}
                                        />
                                    ))}

                                <div className="pagination-mobile">
                                    <Pagination
                                        onChange={handlePagination}
                                        count={Math.ceil(
                                            totalNotes / LIMIT_PER_PAGE
                                        )}
                                        page={currentPage || 1}
                                        size="large"
                                    />
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </Grid>

            <UpdateNoteModal
                open={isOpenUpdateModal}
                handleClose={handleCloseUpdateModal}
            />
        </Grid>
    );
};

export default NoteList;
