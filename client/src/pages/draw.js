import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import CanvasDraw from 'react-canvas-draw'
import DrawControls from '../components/draw-controls'
import AddDrawingForm from '../components/add-drawing-form'

const Draw = () => {
  const [form, setForm] = useState({
    title: 'New Drawing',
    body: '',
  })

  const [settings, setSettings] = useState({
    canvasWidth: '100%',
    canvasHeight: 600,
    brushRadius: 12,
    brushColor: "#444",
    hideGrid: false,
  })

  const canvasRef = useRef()

  useEffect(() => {
    setSettings({
      ...settings,
      canvasHeight: canvasRef.current.canvas.drawing.width
    })
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
    console.log(form)
  }

  const undo = () => canvasRef.current.undo()

  const clear = () => canvasRef.current.clear()

  return (
    <Container>
      <Row>
        <Col className="col-lg-9">
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
        </Col>
      </Row>
    </Container>
  )
}

export default Draw