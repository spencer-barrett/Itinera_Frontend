import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./routes/Home"; // Ensure Home has the correct props
import { observeUser } from "./auth/auth";

interface User {
    email: string | null;
    [key: string]: unknown;
}

interface UserState {
    user: User;
    idToken?: string;
}

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = observeUser((userState: UserState | null) => {
            if (userState) {
                setUser(userState.user);
                setIdToken(userState.idToken || null);
                console.log("user id", userState.idToken);
            } else {
                setUser(null);
                setIdToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected route */}
            <Route
                path="/"
                element={
                    user ? (
                        <Home user={user} idToken={idToken} /> // Ensure props are passed correctly
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    );
};

export default App;
