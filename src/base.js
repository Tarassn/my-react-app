import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAT1_4y2bLM7HRm8lmcf3rN-muyfYDXVnQ",
    authDomain: "my-react-app-b12e6.firebaseapp.com",
    databaseURL: "https://my-react-app-b12e6.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;