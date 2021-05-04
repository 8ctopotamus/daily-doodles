
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useMySocket = (...args) => {
    const { current: socket } = useRef(io(...args))//this is not persisting at all
    //const [socket, setSocket] = useState(null)
    useEffect(() => {
        //setSocket(io(...args))
        return () => {
            socket && socket.removeAllListeners();
            socket && socket.close();
        };
    }, [socket]);

    return [socket];
};

export default useMySocket;