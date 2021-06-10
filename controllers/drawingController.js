const db = require('../models')

module.exports = {
  createDrawing: async function(req, res) {
    try {
      const { roomId, rightness, ...body } = req.body
      const corpseFound = await db.Corpse.exists({ roomId: roomId })

      
      const drawing = await db.Drawing.create(body)
      const side = rightness ? 'right' : 'left'
      
      console.log('corpseFound', corpseFound, 'rightness', rightness)
      
      if (corpseFound) {
        await db.Corpse.findOneAndUpdate({ roomId }, {[side]: drawing._id })
      } else {
        await db.Corpse.create({ roomId, [side]: drawing._id })
      }
      res.json(drawing)
    } catch(err) {
      res.status(500).send()
    }
  },
  getDrawings: function(req, res) {
    db.Drawing.find({})
      .sort({ date: -1 })
      .then(drawings => {
        res.json(drawings)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send()
      })
  },
  getDrawing: function(req, res) {
    const { id } = req.params
    db.Drawing.findById(id)
      .then(drawingData => {
        res.json(drawingData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send()
      })
  },
  updateDrawing: function(req, res) {
    const { id } = req.params
    db.Drawing.findByIdAndUpdate(id, req.body, { new: true })
      .then(drawingData => {
        res.json(drawingData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send()
      })
  },
  deleteDrawing: function(req, res) {
    const { id } = req.params
    db.Drawing.findByIdAndDelete(id)
      .then(drawingData => {
        res.json(drawingData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send()
      })
  },
}