import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const UseUpload = async (file, folder) => {
    try {
        const storageRef = ref(storage, `${folder}/${crypto.randomUUID()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        return null;
    }
};