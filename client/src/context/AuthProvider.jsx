import React, {createContext, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = React.useState({});

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(user => {
            console.log("[From AuthProvider]", {user});
            if (user?.uid){
                setUser(user);
                localStorage.setItem("accessToken", user.accessToken);
                return;
            }
            //Reset the user info
            setUser({});
            localStorage.clear();
            navigate("/login");
            
        });

        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}