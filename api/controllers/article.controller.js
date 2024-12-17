import Article from '../models/article.model.js';
import { errorHandler } from '../utils/error.js';
import { validateArticleData } from '../utils/validation.js';


//
export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create an article'));
  }

  const errors = validateArticleData(req.body);
  if (errors.length > 0) {
    return next(errorHandler(400, errors.join(' ')));
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

//
export const getarticles = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order === 'desc' ? -1 : 1; 
    const sortBy = req.query.sortBy || 'rank'; // Default to rank if not provided

    const articles = await Article.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.articleId && { _id: req.query.articleId }),
    })
    .sort({ [sortBy]: order })
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

//
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

//
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

//
export const getArticleLikesStats = async (req, res, next) => {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Aggregate the total likes and likes from the last month
    const totalLikes = await Article.aggregate([
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } },
    ]);

    const lastMonthArticlesLikes = await Article.aggregate([
      { $match: { updatedAt: { $gte: oneMonthAgo } } },
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } },
    ]);

    res.status(200).json({
      totalLikes: totalLikes[0]?.totalLikes || 0,
      lastMonthArticlesLikes: lastMonthArticlesLikes[0]?.totalLikes || 0,
    });
  } catch (error) {
    console.error("Error in getArticleLikesStats:", error);
    next(error);
  }
};

//
export const updateArticleRanks = async (req, res) => {
  try {
    const { updatedArticles } = req.body;

    if (!updatedArticles || !Array.isArray(updatedArticles)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
    }

    for (const article of updatedArticles) {
      if (!article._id || article.rank === undefined) {
        return res.status(400).json({ message: 'Each updated article must have _id and rank.' });
      }
      await Article.findByIdAndUpdate(article._id, { rank: article.rank });
    }

    return res.status(200).json({ message: 'Ranks updated successfully.' });
  } catch (error) {
    console.error('Error updating ranks:', error);
    res.status(500).json({ message: 'Internal Server Error while updating ranks.' });
  }
};