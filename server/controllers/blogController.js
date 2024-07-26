
const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const UserRegister = require("../models/userModel");

// Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserRegister.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const newBlog = new Blog({ title, description, image, user });
    await newBlog.save();


    existingUser.blogs.push(newBlog);
    await existingUser.save();

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, image }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the blog and populate the user field
    const blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    // Update the user's blog list
    const user = await UserRegister.findById(blog.user._id);
    if (user) {
      user.blogs.pull(blog._id);
      await user.save();
    }

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error during delete operation:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user");

    if (!blogs.length) {
      return res.status(200).json({ message: "No blogs found" });
    }

    res.set('Cache-Control', 'no-store'); // Prevent caching
    res.status(200).json({ message: "All blogs", blogs });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Blog By ID
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog found", blog });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Received userId:', userId); // Log userId
    const user = await UserRegister.findById(userId).populate("blogs");

    if (!user) {
      console.log('User not found or has no blogs');
      return res.status(404).json({ message: "User not found or has no blogs" });
    }

    console.log('User blogs:', user.blogs); // Log fetched blogs
    res.status(200).json({ message: "User blogs fetched successfully", blogs: user.blogs });
  } catch (error) {
    console.error('Server Error:', error); // Log error
    res.status(500).json({ message: "Server Error", error });
  }
};

