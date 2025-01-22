import React from "react";
import { User } from "../auth/auth"; // Adjust the path to where `auth.ts` is located

interface HomeProps {
    user: User; // Use the imported User type
    idToken: string | null; // ID token can be null
}

const Home: React.FC<HomeProps> = ({ user, idToken }) => {
    return (
        <div>
            <h1>Welcome, {user.email || "Guest"}!</h1>
            <p>ID Token: {idToken ? idToken : "No token available"}</p>
        </div>
    );
};

export default Home;
