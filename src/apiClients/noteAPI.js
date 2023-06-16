import { collection, getDocs, query, orderBy, limit, updateDoc, deleteDoc, doc, getCountFromServer, getDoc, startAfter, addDoc, where, endBefore } from "firebase/firestore";
import { db } from "../firebase-config";
import { noteColorRef } from "./noteColorAPI";
import { LIMIT_PER_PAGE } from "../constants";

const NOTE_STRING = "notes";

export const notesRef = collection(db, NOTE_STRING);

const creatingNotesRef = collection(db, NOTE_STRING);

const updateOrDeleteRef = (id) => doc(db, NOTE_STRING, id);

export const fetchTotalNotes = async () => {
    try {
        const totalNotes = await getCountFromServer(notesRef);
        return totalNotes;
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