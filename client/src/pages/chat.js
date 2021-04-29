import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

const Chat = () => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        console.log(socket)
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <Container>
            <Row>
                static vs {response}

            </Row>
        </Container>
    )
}

export default Chat