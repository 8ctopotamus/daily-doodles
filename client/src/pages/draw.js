import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import DrawControls from '../components/draw-controls'
import AddDrawingForm from '../components/add-drawing-form'
import Button from '../components/button'
import API from '../utils/API'

const Draw = ({ 
  canvasWidth = 800, 
  canvasHeight = 800, 
  defaultTitle = 'New Drawing', 
  ligaments = [], 
  rightness = true
}) => {
  const history = useHistory()

  const [form, setForm] = useState({
    title: defaultTitle,
    body: '',
  })

  const [settings, setSettings] = useState({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    brushRadius: 12,
    brushColor: '#444'
  })

  const canvasRef = useRef()

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

  const save = () => {
    const postData = {
      ...form,
      drawing: canvasRef.current.getSaveData()
    }
    API.saveDrawing(postData)
      .then(response => history.push('/'))
      .catch(err => console.log(err))
  }

  const undo = () => {
    canvasRef.current.undo()
  }

  const clear = () => {
    canvasRef.current.clear()
  }

  return (
    <Container>
      <Row>
        <Col className="col-lg-9">
          <div style={{width: 'auto', position: 'relative', display: 'inline-block'}}>
            {ligaments.map(l => (
              <div style={{
                position: 'absolute',
                top: `${l}%`,
                [rightness ? 'right' : 'left']: 0,
                background: 'black',
                height: 10,
                width: 10,
              }}></div>
            ))}
            <CanvasDraw
              ref={canvasRef}
              brushColor={settings.brushColor}
              brushRadius={settings.brushRadius}
              canvasWidth={settings.canvasWidth}
              canvasHeight={settings.canvasHeight}
            />
          </div>
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
          <div className="d-grid gap-2">
            <Button onClick={undo} className="btn-light">Undo</Button>
            <Button onClick={clear} className="btn-light">Clear</Button>
            <Button onClick={save} className="btn-primary">Save</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Draw