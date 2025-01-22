import React, { useState, FormEvent } from "react";
import { signIn, logOut } from "./auth";
import useAuthState from "./useAuthState";

interface User {
    email: string | null;
    [key: string]: unknown; // Add additional optional fields if needed
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const user = useAuthState(); // Get the user state from the custom hook

    const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const idToken = await signIn(email, password);
            console.log("ID Token:", idToken);
            alert("Signed in successfully!");
        } catch (error) {
            alert("Error signing in: " + (error as Error).message);
        }
    };

    const handleLogOut = async (): Promise<void> => {
        try {
            await logOut();
            alert("Signed out successfully!");
        } catch (error) {
            alert("Error signing out: " + (error as Error).message);
        }
    };

    return (
        <div>
            <h1>{user ? `Welcome, ${user.email}` : "Login"}</h1>

            {!user ? (
                <form onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign In</button>
                </form>
            ) : (
                <button onClick={handleLogOut}>Log Out</button>
            )}
        </div>
    );
};

export default Login;
