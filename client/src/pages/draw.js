import React, { useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import DrawControls from '../components/draw-controls'
import AddDrawingForm from '../components/add-drawing-form'

const Draw = () => {
  const [form, setForm] = useState({
    title: 'New Drawing',
    body: '',
  })

  const [settings, setSettings] = useState({
    canvasWidth: 800,
    canvasHeight: 800,
    brushRadius: 12,
    brushColor: '#444'
  })

  const handleFormChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateSettings = (name, value) => {
    setSettings({
      ...settings,
      [name]: value
    })
  }

  return (
    <Container>
      <Row>
        <Col className="col-lg-9">
          <CanvasDraw  
            brushColor={settings.brushColor}
            brushRadius={settings.brushRadius}
            canvasWidth={settings.canvasWidth}
            canvasHeight={settings.canvasHeight}
          />
        </Col>
        <Col className="col-lg-3">
          <AddDrawingForm 
            form={form}
            handleFormChange={handleFormChange}
          />
          <DrawControls 
            settings={settings} 
            handleUpdateSettings={handleUpdateSettings} 
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Draw