import firebase from 'firebase';
const config = {
    
        apiKey: "AIzaSyDrtUpa4W3mHtQbgi7oM6l4Fb6O_zzQa1g",
        authDomain: "actime-63b15.firebaseapp.com",
        databaseURL: "https://actime-63b15.firebaseio.com",
        projectId: "actime-63b15",
        storageBucket: "actime-63b15.appspot.com",
        messagingSenderId: "233529530601",
        appId: "1:233529530601:web:ac805adb7aa17eb2e13878",
        measurementId: "G-388RRBBL2P"
      
};

const fire = firebase.initializeApp(config);
export default fire;