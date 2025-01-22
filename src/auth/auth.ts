import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export interface User {
    email: string | null; // Email can be null
    [key: string]: unknown; // Add additional fields if necessary
}

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUUS8i7_xvPwluhr5_I7BF3GwIRXFQMqI",
    authDomain: "itinera-e5cc7.firebaseapp.com",
    projectId: "itinera-e5cc7",
    storageBucket: "itinera-e5cc7.firebasestorage.app",
    messagingSenderId: "1057498758814",
    appId: "1:1057498758814:web:3156cb4ab023dabf23c58f",
    measurementId: "G-2KWGR9G2LK",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

/**
 * Sign in the user with email and password.
 * @param email - User's email.
 * @param password - User's password.
 * @returns Promise<string> - Resolves with the ID token.
 */
export const signIn = async (email: string, password: string): Promise<string> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        console.log("User signed in:", userCredential.user);
        return idToken;
    } catch (error) {
        console.error("Error during sign-in:", (error as Error).message);
        throw error;
    }
};

/**
 * Sign out the currently logged-in user.
 */
export const logOut = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error during sign-out:", (error as Error).message);
    }
};

/**
 * Observe the user's authentication state and set the ID token.
 * @param onUserChanged - Callback for handling user state changes.
 */
export const observeUser = (
    onUserChanged: (userState: { user: User; idToken?: string } | null) => void
): (() => void) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            const idToken = await firebaseUser.getIdToken();
            const customUser: User = {
                email: firebaseUser.email, // Map Firebase's user to the custom User interface
            };
            onUserChanged({ user: customUser, idToken });
        } else {
            onUserChanged(null);
        }
    });
};

export default auth;
