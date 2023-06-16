import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getDoc, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { NoteContext } from "../../context/NoteContext";
import { fetchCreateNote, fetchDeleteNote, fetchTotalNotes, notesRef } from "../../apiClients/noteAPI";
import { LIMIT_PER_PAGE } from "../../constants";
import { noteColorRef } from "../../apiClients/noteColorAPI";

const useNoteList = () => {
    const { 
        notes, 
        setNotes, 
        setSelectedNote, 
        currentPage, 
        setCurrentPage, 
        searchText, 
        isLoading, 
        setLoading,
        setShowingNoteColorList
    } = useContext(NoteContext);

    const [totalNotes, setTotalNotes] = useState(0);
    const [isOpenUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => setOpenUpdateModal(true);
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);
    const targetItem = useRef(null);

    const handleGetTotalNotes = async () => {
        const _totalNotes = await fetchTotalNotes();

        setTotalNotes(_totalNotes.data().count);
    }

    const handleGetNoteListRealTime = async () => {
        setLoading(true);

        const constraints = [
            orderBy("createdAt", "desc")
        ];

        // Search
        if (searchText && searchText?.length) {
            constraints.push(
                where("keywords", 'array-contains', searchText.toLowerCase()),
            );
        };

        // Pagination
        if (currentPage - 1) {
            constraints.push(
                startAfter(targetItem.current)
            );
        };
        
        constraints.push(
            limit(LIMIT_PER_PAGE)
        );

        const q = query(notesRef, ...constraints);

        const unsub = onSnapshot(
            q,
            { includeMetadataChanges: true },
            async (querySnapshot) => {
                const promises = querySnapshot.docs.map(async (doc) => {
                    const noteColorSnapshot = await getDoc(noteColorRef(doc.data().colorId));

                    const color = noteColorSnapshot.data();
                    return ({
                        id: doc.id,
                        color: color,
                        ...doc.data(),
                    });
                });

                const resultNotes = await Promise.all(promises);

                targetItem.current = querySnapshot.docs[(currentPage * LIMIT_PER_PAGE) - 1];
                setNotes(resultNotes);
                setLoading(false);
            }
        )

        return () => unsub();
    };

    const handlePagination = (event, value) => {
        if (value) {
            setShowingNoteColorList(false);
            setCurrentPage(value);
        }
    }

    const handleDeleteNoteList = async (id) => {
        await fetchDeleteNote(id);
        setShowingNoteColorList(false);
    };

    const filterNotes = useMemo(() => {
        return notes?.filter(note => !note?.isCreating);
    }, [notes])

    const creatingNotes = useMemo(() => {
        return notes?.filter(note => note?.isCreating).sort((a, b) =>
            moment(b.createdAt.toDate()).diff(
                moment(a.createdAt.toDate())
            )
        )
    }, [notes])

    const handleCreatingNotes = async (body) => {
        const result  = await fetchCreateNote(body);

        setShowingNoteColorList(false);

        if (result && currentPage > 1) {
            setCurrentPage(1);
        }
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleGetNoteListRealTime();
        }, 300);

        return () => clearTimeout(debounce);
    }, [currentPage, searchText])

    useEffect(() => {
        handleGetTotalNotes();
    }, [notes])

    return {
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
    }
}

export default useNoteList;