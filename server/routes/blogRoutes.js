const express = require('express');
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require('../controllers/blogController');

const router = express.Router();

// GET || All blogs
router.get('/all-blog', getAllBlogsController);

// POST || Create blog
router.post('/create-blog', createBlogController);

// PUT || Update blog
router.put('/update-blog/:id', updateBlogController);

// GET || Single Blog Details
router.get('/get-blog/:id', getBlogByIdController);

// DELETE || Delete blog
router.delete('/delete-blog/:id', deleteBlogController);

// GET || User Blogs
router.get('/user-blog/:id', userBlogController);

module.exports = router;
