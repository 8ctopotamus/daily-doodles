import React, { useRef, useState } from 'react'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import CanvasDraw from 'react-canvas-draw'
import DrawControls from '../components/draw-controls'

const Draw = () => {
  const [settings, setSettings] = useState({
    brushRadius: 12,
    brushColor: "#444",
    hideGrid: false,
  })

  const canvasRef = useRef()
  const height = canvasRef?.current?.canvas.drawing.width || 400
  
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
            ref={canvasRef}
            canvasWidth={'100%'}
            canvasHeight={height}
            brushRadius={settings.brushRadius}
            brushColor={settings.brushColor}
            hideGrid={settings.hideGrid}
          />
        </Col>
        <Col className="col-lg-3">
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