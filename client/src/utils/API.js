import axios from 'axios'

export default {
  getDrawings: function() {
    return axios('/api/drawings')
  },
  saveDrawing: function(data) {
    return axios.post('/api/drawings', data)
  },
  findAllTheCorpses: function() {
    return axios.get('/api/corpses')
  }
}