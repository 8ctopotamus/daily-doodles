// Hook (use-auth.js)//  ADAPTED FROM https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from "react";
import io from "socket.io-client";

const soxContext = createContext();
const ENDPOINT = "http://127.0.0.1:3001";
const chatOpts = {
    withCredentials: false,
}
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideSox({ children }) {
    const sox = useProvideSox();
    return <soxContext.Provider value={sox}>{children}</soxContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useSox = () => {
    return useContext(soxContext);
};

// Provider hook that creates auth object and handles state
function useProvideSox() {
    const [sox, setSox] = useState(null);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (sox) sox.connect()
    }, [load])
    useEffect(() => {
        setSox(io(ENDPOINT, chatOpts))
        setLoad(true)
        return () => {
            sox && sox.removeAllListeners();
            sox && sox.close();
        };
    }, []);

    return sox

}