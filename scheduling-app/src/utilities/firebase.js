// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBomVi4SydN8q65Gh2tUjzXLY-rAk1byjM",
    authDomain: "scheduling-app-aff00.firebaseapp.com",
    databaseURL: "https://scheduling-app-aff00-default-rtdb.firebaseio.com",
    projectId: "scheduling-app-aff00",
    storageBucket: "scheduling-app-aff00.appspot.com",
    messagingSenderId: "712035720896",
    appId: "1:712035720896:web:fedd60e5b653389ea01725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
            .then(() => setResult(makeResult()))
            .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};
