import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import { useSox } from '../hooks/useSox'
import Draw from "../pages/draw"

const Chat = () => {
    const [response, setResponse] = useState("no one is there");
    const [name, setName] = useState("anonymous");
    const [rightness, setRightness] = useState(false);
    const [alone, setAlone] = useState("alone");
    const [conn, setConn] = useState(null)
    const [renderInput, setRenderInput] = useState(false);
    const [renderDraw, setRenderDraw] = useState(false);
    const [ligaments, setLigaments] = useState([])

    const socket = useSox()
    useEffect(() => {
        if (socket) {
            socket.on("FromAPI", data => {
                setResponse(data);
                setRenderInput(true)
            });
            socket.on('notalone', function ({ connection }) {
                console.log('na', connection)
                console.log(this.id)
                const other = this.id == connection.rightyId ? connection.lefty : connection.righty
                setAlone(`your corpsing with ${other}`)
                socket.emit('ligamentsPlease', { roomId: connection.roomId })
            })
            socket.on('newLigaments', ({ ligaments }) => setLigaments(ligaments))
            // return socket.disconnect()
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
        socket.emit("connectionPlease", { name: name }, ({ connection }) => {
            console.log("connectionServed", connection)
            if (connection.lonely) {
                setAlone(`you are all alone in ${connection.roomId}`)
                setResponse(`ok ${connection.righty}`)
                setRightness(true)
            } else {
                setAlone(`your corpsing with ${connection.righty}`)
                setResponse(`ok ${connection.lefty}`)
                setRightness(false)
            }
            setConn(connection)
            setRenderInput(false)
            setRenderDraw(true)
        })
    }

    return (
        <Container>
            <Row>
                Api says: {response}
            </Row>
            {renderInput && <Row>
                <input name="name" type="text" onChange={dispatchInputChange} value={name} />
                <button onClick={() => submitName()}>That's me</button>
            </Row>}
            {renderDraw && ligaments.length > 0 && <Row>
                <p>
                    10 paces, then draw
                    </p>
                <p>
                    {alone}
                </p>
                <Draw 
                    canvasHeight={800} 
                    canvasWidth={800} 
                    defaultTitle={conn.roomId + (rightness ? "R" : "L")} 
                    ligaments={ligaments}
                    rightness={rightness}
                />
            </Row>}
        </Container>
    )
}

export default Chat