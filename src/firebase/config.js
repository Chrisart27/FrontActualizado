import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDwu1HXqQ0h2yTDcjI3nSN3uUuX2t-rrhc",
    authDomain: "gruapp-2e790.firebaseapp.com",
    projectId: "gruapp-2e790",
    storageBucket: "gruapp-2e790.appspot.com",
    messagingSenderId: "80626650800",
    appId: "1:80626650800:web:ca8730a3b0f60e027cb575"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);