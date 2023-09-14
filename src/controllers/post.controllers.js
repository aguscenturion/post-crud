import { PostModel } from '../models/Post.js';

export const ctrlShowView = async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    return res.render('posts.ejs', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).render('Internal Server Error');
  }
  res.render('posts.ejs');
};

export const ctrlGetPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    if (posts.length <= 0) return res.status(200).json({ message: 'No posts found' });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }
};
export const ctrlCreatePost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }
};
export const ctrlUpdatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findByPk(id);
    const updatedPost = await post.update(req.body);
    return res.status(202).json({
      message: 'Post successfully updated',
      updatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }
};
export const ctrlDelelePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findByPk(id);
    if (!post) return res.status(404).json({ message: 'No posts found' });
    post.destroy();
    return res.status(200).json({
      message: 'Post successfully deleted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }
};
