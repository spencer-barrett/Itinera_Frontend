import  { useState, useEffect } from "react";
import { signIn, logOut, observeUser } from "./auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Observe user authentication state
        observeUser((userState) => {
            setUser(userState?.user || null);
        });
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const idToken = await signIn(email, password);
            console.log("ID Token:", idToken);
            alert("Signed in successfully!");
        } catch (error) {
            alert("Error signing in: " + error.message);
        }
    };

    const handleLogOut = async () => {
        await logOut();
        alert("Signed out successfully!");
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
