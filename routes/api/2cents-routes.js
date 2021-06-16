const router = require('express').Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../../controllers/cents-controller');

// Set up GET all and POST at /api/posts
router
  .route('/')
  .get(getAllPosts)
  .post(createPost);

// Set up GET one, PUT, and DELETE at /api/posts/:id
router
  .route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;