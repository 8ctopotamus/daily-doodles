const router = require('express').Router()
const corpseController = require('../controllers/corpseController')
const drawingController = require('../controllers/drawingController')
const userController = require('../controllers/userController')

router.route('/api/corpses')
  .get(corpseController.find)
  
router.route('/api/drawings/:id')
  .get(drawingController.getDrawing)
  .put(drawingController.updateDrawing)
  .delete(drawingController.deleteDrawing)

router.route('/api/drawings')
  .get(drawingController.getDrawings)
  .post(drawingController.createDrawing)

router.route('/api/users/:id')
  .get(userController.getUser)
  .put(userController.updateUser)

module.exports = router