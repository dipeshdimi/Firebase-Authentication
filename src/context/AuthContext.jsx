import { createContext, useEffect, useState } from "react";
import { myAuth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [curUser, setCurUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(myAuth, (user) => {
            setCurUser(user);
        });
        
        return () => {
            unsub();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ curUser }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthContextProvider.propTypes = {
    children: PropTypes.object
};