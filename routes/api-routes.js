const router = require('express').Router()
const drawingController = require('../controllers/drawingController')
const userController = require('../controllers/userController')

router.route('/api/drawings')
  .get(drawingController.getDrawings)
  .post(drawingController.createDrawing)

router.route('/api/drawings/:id')
  .put(drawingController.updateDrawing)
  .delete(drawingController.deleteDrawing)

router.route('/api/users/:id')
  .get(userController.getUser)
  .put(userController.updateUser)

module.exports = router