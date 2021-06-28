import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {seedDatabase} from '../seed';

const config = {
    apiKey: "AIzaSyAWNFJc9ov9L38kTOBWNcpjzt-m_3SsQo0",
    authDomain: "instagram-clone-de204.firebaseapp.com",
    projectId: "instagram-clone-de204",
    storageBucket: "instagram-clone-de204.appspot.com",
    messagingSenderId: "282285015125",
    appId: "1:282285015125:web:2c420592a5cc53275954dc"
};

const firebase = Firebase.initializeApp(config);
// seedDatabase(firebase);
const { FieldValue } = Firebase.firestore;

export {firebase, FieldValue};