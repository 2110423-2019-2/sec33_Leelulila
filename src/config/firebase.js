import firebase from 'firebase';
const config = {
    
        apiKey: "AIzaSyB2TQKuQo1cOqHj6cx3sspul8kAODAm4x0",
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