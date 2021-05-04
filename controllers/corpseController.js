const db = require('../models')

module.exports = {
  find: function(req, res) {
    db.Corpse.find({ 
      left: { $exists: true },
      right: { $exists: true }
    })
    .populate('left')
    .populate('right')
    .sort({ date: -1 })
    .then(corpseData => {
      res.json(corpseData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send()
    })
  },
}