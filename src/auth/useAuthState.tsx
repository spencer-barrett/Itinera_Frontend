import { useState, useEffect } from "react";
import { observeUser } from "./auth";

interface User {
    email: string | null;
    [key: string]: unknown; // Add additional optional fields if needed
}

const useAuthState = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = observeUser((userState) => {
            setUser(userState?.user || null);
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default useAuthState;
