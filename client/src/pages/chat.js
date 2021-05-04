import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import socketIOClient from "socket.io-client";
//import useSocket from 'use-socket.io-client';
import useMySocket from "../hooks/useMySocket"
import { useSox } from '../hooks/useSox'


const Chat = () => {
    const [response, setResponse] = useState("no one is there");
    const [name, setName] = useState("anonymous");
    const [renderInput, setRenderInput] = useState(false);
    const [renderDraw, setRenderDraw] = useState(false);
    // const [socket] = useMySocket(ENDPOINT, chatOpts)
    const socket = useSox()
    console.log(socket)
    useEffect(() => {
        if (socket) {
            socket.on("FromAPI", data => {
                setResponse(data);
                setRenderInput(true)
            });
            socket.on('flash', data => console.log('flash', data))


            return socket.disconnect()
        }
    }, [socket])


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
        socket.emit("connectionPlease", { name: name }, (data) => {
            console.log("connectionServed", data)
        })
    }

    return (
        <Container>
            <Row>
                Api says: {response}
            </Row>
            { renderInput && <Row>
                <input name="name" type="text" onChange={dispatchInputChange} value={name} />
                <button onClick={() => submitName()}>That's me</button>
            </Row>}
            {renderDraw && <Row>
                10 paces, then draw
            </Row>}
        </Container>
    )
}

export default Chat