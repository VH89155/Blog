var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

// newsController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions',courseController.handleFormActions)
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.deleteForce);
router.get('/:slug', courseController.show);

module.exports = router;
