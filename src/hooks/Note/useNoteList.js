import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { fetchCreateNote, fetchDeleteNote, fetchNoteList } from "../../apiClients/noteAPI";
import { NoteContext } from "../../context/NoteContext";
import { LIMIT_PER_PAGE } from "../../constants";

const useNoteList = () => {
    const { notes, setNotes, setSelectedNote, currentPage, setCurrentPage, searchText, isLoading, setLoading } = useContext(NoteContext);
    const [totalNotes, setTotalNotes] = useState(0);

    const lastItem = useRef(null);

    const handleGetNoteList = async () => {
        setLoading(true);
        const result = await fetchNoteList({
            orderByField: "createdAt",
            limitNum: LIMIT_PER_PAGE,
            currentPage: currentPage,
            lastItem,
            searchText
        });

        lastItem.current = result.lastItem;

        setTotalNotes(result?.totalItems);
        setNotes(result?.data);
        setLoading(false);
    };

    const handlePagination = (event, value) => {
        if (value) {
            console.log({value});
            setCurrentPage(value);
        }
    }

    const handleDeleteNoteList = async (id) => {
        const result = await fetchDeleteNote(id);
        if (result) await handleGetNoteList();
    };

    const filterNotes = useMemo(() => {
        return notes?.filter(note => !note?.isCreating);
    }, [notes])

    const creatingNotes = useMemo(() => {
        return notes?.filter(note => note?.isCreating);
    }, [notes])

    const handleCreatingNotes = async (body) => {
        const result  = await fetchCreateNote(body);
        if (result) await handleGetNoteList();
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleGetNoteList();
        }, 200)

        return () => clearTimeout(debounce);
    }, [currentPage, searchText]);

    return {
        notes,
        handleDeleteNoteList,
        filterNotes,
        creatingNotes,
        handleCreatingNotes,
        setSelectedNote,
        currentPage,
        handlePagination,
        totalNotes,
        isLoading
    }
}

export default useNoteList;