import  { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Home from "./routes/Home.jsx"; // Example for a protected route
import { observeUser } from "./auth/auth.js";

const App = () => {
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState(null);

    useEffect(() => {
        // Observe user authentication state
        observeUser((userState) => {
            if (userState) {
                setUser(userState.user);
                setIdToken(userState.idToken);
                console.log("user id", userState.idToken);
            } else {
                setUser(null);
                setIdToken(null);
            }
        });
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
                        <Home user={user} idToken={idToken} />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        </Routes>
    );
};

export default App;
