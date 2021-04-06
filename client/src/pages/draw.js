import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineClear, AiOutlineUndo, AiFillSave, AiOutlineDownload } from 'react-icons/ai'
import Button from '../components/button'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import CanvasDraw from 'react-canvas-draw'
import DrawControls from '../components/draw-controls'
import AddDrawingForm from '../components/add-drawing-form'
import API from '../utils/API'

const Draw = () => {
  const history = useHistory()
  const canvasRef = useRef()

  const [form, setForm] = useState({
    title: 'New Drawing',
    body: '',
  })

  const [settings, setSettings] = useState({
    canvasWidth: 800,
    canvasHeight: 800,
    brushRadius: 12,
    brushColor: "#444",
    hideGrid: false,
  })


  useEffect(() => {
    // setSettings({
    //   ...settings,
    //   canvasHeight: canvasRef.current.canvas.drawing.width
    // })
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleUpdateSettings = (name, value) => {
    setSettings({
      ...settings,
      [name]: value
    })
  }

  const save = () => {
    API.saveDrawing({
      ...form, 
      drawing: canvasRef.current.getSaveData()
    })
      .then(res => history.push('/'))
      .catch(err => console.log(err))
  }

  const undo = () => canvasRef.current.undo()

  const clear = () => canvasRef.current.clear()

  return (
    <Container>
      <Row>
        <Col className="col-lg-9 d-flex justify-content-center">
          <CanvasDraw 
            ref={canvasRef}
            canvasWidth={settings.canvasWidth}
            canvasHeight={settings.canvasHeight}
            brushRadius={settings.brushRadius}
            brushColor={settings.brushColor}
            hideGrid={settings.hideGrid}
          />
        </Col>
        <Col className="col-lg-3">
          <AddDrawingForm
            form={form}
            handleInputChange={handleInputChange}
          />
          <br/>
          <DrawControls 
            settings={settings} 
            handleUpdateSettings={handleUpdateSettings}
            save={save}
            undo={undo}
            clear={clear}
          />
          <div className="d-grid gap-2">
            <Button 
              onClick={undo}
              className="btn-light"
            >
              <AiOutlineUndo/> Undo
            </Button>
            <Button 
              onClick={clear}
              className="btn-light"
            >
              <AiOutlineClear/> Clear
            </Button>
            <Button 
              onClick={save}
              className="btn-primary"
            >
              <AiFillSave/> Save
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Draw