import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import Container from '../components/container'
import CorpseCard from '../components/corpse-card'

const Home = () => {
  const [corpses, setCorpses] = useState([])

  useEffect(() => {
    API.findAllTheCorpses()
      .then(response => setCorpses(response.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Container>
      { corpses.map(corpse => <CorpseCard {...corpse} key={corpse._id} />) }
    </Container>
  )
}

export default Home