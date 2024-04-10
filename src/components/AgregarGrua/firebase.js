import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCK7kOBiegbUMIpP24oZ1F-UPew08slLco",
    authDomain: "url-imagenes.firebaseapp.com",
    projectId: "url-imagenes",
    storageBucket: "url-imagenes.appspot.com",
    messagingSenderId: "807996917896",
    appId: "1:807996917896:web:fcda1d7ef04aef548c773d",
    measurementId: "G-EF51NLBKV3"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
