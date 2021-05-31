import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyALHBn_U7vbdMZujdVwW4ZoPGXavoXA5jk",
    authDomain: "cs-396-petsfind.firebaseapp.com",
    projectId: "cs-396-petsfind",
    storageBucket: "cs-396-petsfind.appspot.com",
    messagingSenderId: "806861551949",
    appId: "1:806861551949:web:8adc3fbb33177768fc9f04",
    measurementId: "G-LXERMVE8W2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
}
 