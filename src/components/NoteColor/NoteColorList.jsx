import RoundButton from "../common/RoundButton";
import AddIcon from "@mui/icons-material/Add";
import NoteColorItem from "./NoteColorItem";
import useNoteColorList from "../../hooks/NoteColor/useNoteColorList";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";

const NoteColorList = () => {
    const {
        noteColors,
        isShowingNoteColorList,
        toggleCreateNoteButton,
        handleCreateNewNote,
        isLoading,
    } = useNoteColorList();

    return (
        <div className="note-color-list-sub-wrapper">
            {isLoading ? (
                <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
                <Fragment>
                    <RoundButton
                        onClick={toggleCreateNoteButton}
                        IconElement={AddIcon}
                    />

                    <div className="colors-container">
                        {isShowingNoteColorList
                            ? noteColors
                                  .sort((a, b) => a.position - b.position)
                                  .map((noteColor, index) => (
                                      <NoteColorItem
                                          key={index}
                                          noteColor={noteColor}
                                          onClick={() =>
                                              handleCreateNewNote(
                                                  noteColor?.id,
                                                  noteColor?.colorCode,
                                                  noteColor?.type
                                              )
                                          }
                                      />
                                  ))
                            : null}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default NoteColorList;
