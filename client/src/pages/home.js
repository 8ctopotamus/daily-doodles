import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import Row from '../components/row'
import Col from '../components/col'
import DrawingCard from '../components/drawing-card'

const Home = () => {
  const [drawings, setDrawings] = useState([])
  console.log(drawings)  

  useEffect(() => {
    API.getDrawings()
      .then(response => setDrawings(response.data))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <Container>
      <Row>
        { drawings.map(drawing => (
          <Col className="col-md-4" key={drawing._id}>
            <DrawingCard {...drawing} />
          </Col>
        )) }
      </Row>
    </Container>
  )
}

export default Home