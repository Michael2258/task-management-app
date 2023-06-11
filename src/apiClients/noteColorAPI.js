import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase-config";

const NOTE_COLOR_STRING = "noteColors";

export const noteColorRef = (id) => doc(db,  NOTE_COLOR_STRING, id);

const allNoteColorRef = collection(db, NOTE_COLOR_STRING);

export const fetchNoteColors = async () => {
    try {
        const noteColors = [];

        const snapshot = await getDocs(allNoteColorRef);

        snapshot.forEach(query => {
            noteColors.push({
                id: query.id,
                ...query.data()
            });
        })

        return noteColors;
    } catch (error) {
        console.log(error);
    }
}