import { collection, getDocs, query, orderBy, limit, updateDoc, deleteDoc, doc, getCountFromServer, getDoc, startAfter, addDoc, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { noteColorRef } from "./noteColorAPI";

const NOTE_STRING = "notes";

const notesRef = collection(db, NOTE_STRING);

const creatingNotesRef = collection(db, NOTE_STRING);

const updateOrDeleteRef = (id) => doc(db, NOTE_STRING, id);

const fetchTotalNotes = async () => {
    try {
        const totalNotes = await getCountFromServer(notesRef);
        return totalNotes;
    } catch (error) {
        console.log(error);
    }
}

export const fetchNoteList = async (params) => {
    try {
        const {
            limitNum,
            currentPage,
            lastItem,
            searchText
         } = params;

        const constraints = [
            orderBy("content", "desc"),
            limit(limitNum)
        ]
        
        if (lastItem.current && currentPage > 1) {
            constraints.push(
                startAfter(lastItem.current)
            );
        };

        if (searchText && searchText?.length) {
            constraints.push(
                where("content", '>=', searchText.toLowerCase()),
                where("content", '<=', searchText.toLowerCase() + '\uf8ff'),
            );
        }

        let q = query(notesRef, ...constraints);

        let documentSnapshots = await getDocs(q);

        const snapshotPromises = documentSnapshots.docs.map(async (doc) => {
            const noteColorSnapshot = await getDoc(noteColorRef(doc.data().colorId));

            const color = noteColorSnapshot.data();
            return {
                id: doc.id,
                color: color,
                ...doc.data(),
            };
        })

        const notes = await Promise.all([...snapshotPromises]);

        const totalNotes = await fetchTotalNotes();

        console.log({notes});

        return {
            data: notes,
            totalItems: totalNotes.data().count,
            lastItem: documentSnapshots.docs[documentSnapshots.docs.length - 1]
        };
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreateNote = async (body) => {
    try {
        await addDoc(creatingNotesRef, body);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const fetchUpdateNote = async (id, body) => {
    try {
        await updateDoc(updateOrDeleteRef(id), body);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const fetchDeleteNote = async (id) => {
    try {
        await deleteDoc(updateOrDeleteRef(id));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}