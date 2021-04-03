import React, { useRef, useEffect } from 'react'
import CanvasDraw from 'react-canvas-draw'

const DrawingCard = ({ title, date, drawing, body }) => {
  const canvasRef = useRef()
  
  useEffect(() => {
    canvasRef.current.loadSaveData(drawing)
  }, [])
  
  return (
    <div className="card">
      <CanvasDraw ref={canvasRef} disabled={true} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <small>{ date.split('T')[0] }</small>
        <p className="card-text">{body}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  )
}

export default DrawingCard