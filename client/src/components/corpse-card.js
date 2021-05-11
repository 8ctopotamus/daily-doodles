import React, { useRef, useEffect } from 'react'
import CanvasDraw from 'react-canvas-draw'
import Row from './row'
import Col from './col'

const Drawing = ({ title, date, drawing, body }) => {
  const canvasRef = useRef()

  useEffect(() => {
    canvasRef.current.loadSaveData(drawing)
  }, [])

  return <CanvasDraw ref={canvasRef} disabled={true} style={{ padding: '0px' }} />
}

const CorpseCard = ({ _id, left, right, roomId }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Artist #{roomId}</h5>
        {/* <small>{ date.split('T')[0] }</small> */}
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        <Row>
          {[right, left].map(drawing => <Drawing {...drawing} key={drawing._id} />)}
        </Row>
      </div>
    </div>
  )
}

export default CorpseCard