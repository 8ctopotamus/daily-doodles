import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

const Chat = () => {
    const [response, setResponse] = useState("no one is there");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        console.log(socket)
        socket.on("FromAPI", data => {
            setResponse(data);
        });
        return () => socket.disconnect();
    }, []);

    return (
        <Container>
            <Row>
                Hello Api: {response}

            </Row>
        </Container>
    )
}

export default Chat