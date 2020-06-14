const express = require('express');
const postController = require('./../controllers/postController');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.newPost);

router
  .route('/:id')
  .get(postController.getPost)
  .delete(postController.deletePost)
  .patch(postController.updatePost);
router.route('/rate/:id').post(postController.addRating);
module.exports = router;
