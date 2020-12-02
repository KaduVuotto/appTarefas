import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyAldOhsHpXolxtvJ0rZ0l5w48kTkWLsSss",
    authDomain: "apptarefas-3ff47.firebaseapp.com",
    databaseURL: "https://apptarefas-3ff47.firebaseio.com",
    projectId: "apptarefas-3ff47",
    storageBucket: "apptarefas-3ff47.appspot.com",
    messagingSenderId: "796021827730",
    appId: "1:796021827730:web:b84bb360835d5a9939de4b"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;