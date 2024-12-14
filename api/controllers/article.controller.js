import Article from '../models/article.model.js';
import { errorHandler } from '../utils/error.js';


export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create an article'));
  }

  if (!req.body.title || !req.body.text || !req.body.link || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }


  // Have our newPost as new Post with everything from body, slug and userId
  const newArticle = new Article({
    ...req.body,
    userId: req.user.id,
  });
  
  // If succeed it will save the newPost have if status okay it will be a json
  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);

  } catch (error) {
    next(error);
  }
};


export const getarticles = async (req, res, next) => {

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const articles = await Article.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.articleId && { _id: req.query.articleId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalArticles = await Article.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthArticles = await Article.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      articles,
      totalArticles,
      lastMonthArticles,
    });

  } catch (error) {
    next(error);
  }
};


export const deletearticle = async (req, res, next) => {

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this article'));
  }

  try {
    await Article.findByIdAndDelete(req.params.articleId);
    res.status(200).json('The article has been deleted');

  } catch (error) {
    next(error);
  }
};


export const updatearticle = async (req, res, next) => {

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this article'));
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          text: req.body.text,
          link: req.body.link,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);

  } catch (error) {
    next(error);
  }
};
