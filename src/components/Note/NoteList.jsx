import { Fragment } from "react";
import useNoteList from "../../hooks/Note/useNoteList";
import { Grid, Pagination, Skeleton, Typography } from "@mui/material";
import NoteItem from "./NoteItem";
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
        handleOpenUpdateModal,
        isOpenUpdateModal,
        handleCloseUpdateModal,
    } = useNoteList();

    return (
        <Grid container sx={{ height: "100%" }}>
            <Grid item className="notelist-title-wrapper" xs={12}>
                <Typography className="notelist-title" variant="h3">
                    Notes
                </Typography>

                {totalNotes && (
                    <Pagination
                        onChange={handlePagination}
                        className="pagination"
                        count={Math.ceil(totalNotes / LIMIT_PER_PAGE)}
                        page={currentPage || 1}
                        size="large"
                    />
                )}
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
                        ) : filterNotes.length || creatingNotes.length ? (
                            <Fragment>
                                {creatingNotes.map((creatingNote, idx) => (
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

                                {filterNotes.map((note, idx) => (
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
                        ) : (
                            <Typography className="notelist-title" variant="h5">
                                Empty Note
                            </Typography>
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
