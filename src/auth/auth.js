// auth.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBUUS8i7_xvPwluhr5_I7BF3GwIRXFQMqI",

    authDomain: "itinera-e5cc7.firebaseapp.com",

    projectId: "itinera-e5cc7",

    storageBucket: "itinera-e5cc7.firebasestorage.app",

    messagingSenderId: "1057498758814",

    appId: "1:1057498758814:web:3156cb4ab023dabf23c58f",

    measurementId: "G-2KWGR9G2LK"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Sign in the user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<string>} - Resolves with the ID token.
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        console.log("User signed in:", userCredential.user);
        return idToken; // Return the ID token for API requests
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        throw error; // Propagate the error for handling in the calling code
    }
};

/**
 * Sign out the currently logged-in user.
 */
export const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error during sign-out:", error.message);
    }
};

/**
 * Observe the user's authentication state and set the ID token.
 * @param {function} onUserChanged - Callback for handling user state changes.
 */
export const observeUser = (onUserChanged) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.getIdToken().then((idToken) => {
                console.log("User logged in:", user);
                onUserChanged({ user, idToken });
            });
        } else {
            console.log("No user logged in");
            onUserChanged(null);
        }
    });
};

export default auth;
