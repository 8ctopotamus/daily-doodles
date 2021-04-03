import axios from 'axios'

export default {
  getDrawings: function() {
    return axios('/api/drawings')
  }
}