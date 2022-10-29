var express = require('express');
var router = express.Router();

const meController = require('../app/controllers/MeController');

// newsController.index
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);


module.exports = router;
