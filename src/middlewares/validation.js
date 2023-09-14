import { PostModel } from '../models/Post.js';

export const validationPost = (req, res, next) => {
  const { title, content, link } = req.body;
  try {
    if (title === '' || content === '' || link === '') {
      return res.status(400).json({
        message: 'none of the fields must be empty'
      });
    }
    if (!title || !content || !content) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }

  next();
};

export const validationUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, link } = req.body;
  try {
    const post = await PostModel.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (title === '') {
      return res.status(400).json({
        message: 'none of the fields must be empty'
      });
    }

    if (content === '') {
      return res.status(400).json({
        message: 'none of the fields must be empty'
      });
    }

    if (link === '') {
      return res.status(400).json({
        message: 'none of the fields must be empty'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error: ' + error.message
    });
  }

  next();
};
