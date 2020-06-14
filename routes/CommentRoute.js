const express = require('express');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router.route('/').post(commentController.newComment);

module.exports = router;
