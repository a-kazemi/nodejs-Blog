const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();
router.get('/', viewController.getHome);
router.get('/post/:url', viewController.getSinglePost);

module.exports = router;
