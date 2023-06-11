import { createContext, useState } from "react";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState({});
    const [searchText, setSearchText] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setLoading] = useState(false);

    return (
        <NoteContext.Provider
            value={{
                notes,
                setNotes,
                selectedNote,
                setSelectedNote,
                searchText,
                setSearchText,
                currentPage,
                setCurrentPage,
                isLoading,
                setLoading,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

export default NoteProvider;
