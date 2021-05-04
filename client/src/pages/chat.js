import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import socketIOClient from "socket.io-client";
//import useSocket from 'use-socket.io-client';
import useMySocket from "../hooks/useMySocket"
const ENDPOINT = "http://127.0.0.1:3001";

const Chat = () => {
    const [response, setResponse] = useState("no one is there");
    const [name, setName] = useState("no one is there");
    const [renderInput, setRenderInput] = useState(false);
    const [renderDraw, setRenderDraw] = useState(false);
    const [socket] = useMySocket(ENDPOINT,
        {
            withCredentials: false,
        })
    socket.connect()
    console.log(socket)
    socket.on("FromAPI", data => {
        setResponse(data);
        setRenderInput(true)
    });


    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     console.log(socket)
    //     socket.on("FromAPI", data => {
    //         setResponse(data);
    //         setRenderInput(true)
    //     });
    //     socket.on()
    //     return () => socket.disconnect();
    // }, []);

    const dispatchInputChange = (e) => {
        const { name, value } = e.target
        if (name == "name") setName(value)
    }

    const submitName = () => {
        socket.emit("connectionPlease", { name: name })
    }

    return (
        <Container>
            <Row>
                Api says: {response}
            </Row>
            { renderInput && <Row>
                <input name="name" type="text" onChange={dispatchInputChange} />
                <button onClick={() => submitName()}>That's me</button>
            </Row>}
            { renderDraw && <Row>
                10 paces, then draw
            </Row>}
        </Container>
    )
}

export default Chat