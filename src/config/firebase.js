import firebase from 'firebase';
import secret from './config';
const config = {
    
        apiKey: secret.firekey,
        authDomain: "se-leelulila.firebaseapp.com",
        databaseURL: "https://se-leelulila.firebaseio.com",
        projectId: "se-leelulila",
        storageBucket: "se-leelulila.appspot.com",
        messagingSenderId: "235698378552",
        appId: "1:235698378552:web:aaa99f9ed59f661b0c93cd",
        measurementId: "G-3S562X2KHV"
      
};

const fire = firebase.initializeApp(config);
export default fire;