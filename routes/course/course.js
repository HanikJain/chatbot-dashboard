const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course');



router.post('/api/add-course', courseController);

module.exports = router;