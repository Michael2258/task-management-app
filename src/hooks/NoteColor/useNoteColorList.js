import { useContext, useEffect, useState } from "react";
import { fetchNoteColors } from "../../apiClients/noteColorAPI";
import { NoteContext } from "../../context/NoteContext";
import { Timestamp } from "firebase/firestore";

const useNoteColorList = () => {
    const [noteColors, setNoteColors] = useState([]);
    const [isShowingNoteColorList, setShowingNoteColorList] = useState(false);

    const { setNotes, isLoading } = useContext(NoteContext);

    const handleGetNoteColors = async () => {
        try {
            const result = await fetchNoteColors();

            if (result) {
                setNoteColors(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCreateNoteButton = () => {
        setShowingNoteColorList((current) => !current);
    };

    const handleCreateNewNote = (noteColorId, colorCode , colorType ) => {
        setNotes(currentNotes => [...currentNotes, {
            colorId: noteColorId,
            color: {
                colorCode,
                type: colorType
            },
            content: "",
            isCreating: true,
            createdAt: Timestamp.fromDate(new Date()),
            isStarred: false
        }])
    }

    useEffect(() => {
        handleGetNoteColors();
    }, []);

    useEffect(() => {
        if (isLoading) setShowingNoteColorList(false);
    }, [isLoading])
    
    return {
        noteColors,
        isShowingNoteColorList,
        toggleCreateNoteButton,
        handleCreateNewNote,
        isLoading
    }
}

export default useNoteColorList;