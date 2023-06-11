import { useContext, useEffect, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import { fetchUpdateNote } from "../../apiClients/noteAPI";
import { Timestamp } from "firebase/firestore";

const useUpdateNoteModal = (handleClose) => {
    const { selectedNote, setSelectedNote, setCurrentPage } = useContext(NoteContext);

    const [updatingContent, setUpdatingContent] = useState("");
    const [isStarred, setIsStarred] = useState(false);
    
    const handleCloseUpdateNoteModal = () => {
        handleClose();
        setSelectedNote({});
        setUpdatingContent("");
        setIsStarred(false);
    };

    const handleUpdateNote = async () => {
        const body = {
            colorId: selectedNote?.colorId,
            isStarred,
            content: updatingContent,
            createdAt: Timestamp.fromDate(new Date())
        };

        const result = await fetchUpdateNote(selectedNote?.id, body);

        if (result) {
            handleCloseUpdateNoteModal();
            setCurrentPage(1);
        };
    }

    useEffect(() => {
        if (selectedNote) {
            setIsStarred(selectedNote?.isStarred || false);
            setUpdatingContent(selectedNote?.content);
        }
    }, [selectedNote]);


    return {
        updatingContent,
        isStarred,
        handleCloseUpdateNoteModal,
        selectedNote,
        setIsStarred,
        setUpdatingContent,
        handleUpdateNote
    }
}

export default useUpdateNoteModal;