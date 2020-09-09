import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDXhYPGNSRtrA2WTLcX_vJwG1BHX0Ci2Ig",
    authDomain: "webapi-react.firebaseapp.com",
    databaseURL: "https://webapi-react.firebaseio.com",
    projectId: "webapi-react",
    storageBucket: "webapi-react.appspot.com",
    messagingSenderId: "162949073803",
    appId: "1:162949073803:web:163ee3a0faae090d34bd8e",
    measurementId: "G-DXE2SC3DZ4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;