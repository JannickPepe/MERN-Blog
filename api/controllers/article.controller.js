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
    const sortBy = req.query.sortBy || 'rank';

    const articles = await Article.find()
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

    const articlesGroupedByDay = await Article.aggregate([
      {
        $project: {
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const mostCreatedDay =
      articlesGroupedByDay.length > 0
        ? new Date(articlesGroupedByDay[0]._id).toDateString()
        : 'N/A';
        
    // Find the article(s) with the most likes
    const articlesWithMostLikes = await Article.aggregate([
      {
        $group: {
          _id: '$_id', // Group by article ID
          title: { $first: '$title' }, // Retain the title
          likes: { $first: '$likes' }, // Retain the likes
        },
      },
      { $sort: { likes: -1 } }, // Sort by likes in descending order
    ]);

    const maxLikes =
      articlesWithMostLikes.length > 0 ? articlesWithMostLikes[0].likes : 0;

    const mostLikedArticles = articlesWithMostLikes
      .filter((article) => article.likes === maxLikes)
      .map((article) => article.title);

    // Find the article(s) with the least likes
    const articlesWithLeastLikes = await Article.aggregate([
      {
        $group: {
          _id: '$_id', // Group by article ID
          title: { $first: '$title' }, // Retain the title
          likes: { $first: '$likes' }, // Retain the likes
        },
      },
      { $sort: { likes: 1 } }, // Sort by likes in ascending order
    ]);

    const minLikes =
      articlesWithLeastLikes.length > 0 ? articlesWithLeastLikes[0].likes : 0;

    const leastLikedArticles = articlesWithLeastLikes
      .filter((article) => article.likes === minLikes)
      .map((article) => article.title);

    res.status(200).json({
      articles,
      totalArticles,
      lastMonthArticles,
      mostCreatedDay,
      mostLikedArticles,
      leastLikedArticles,
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

    const totalLikes = await Article.aggregate([
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
    ]);

    const lastMonthArticlesLikes = await Article.aggregate([
      { $match: { updatedAt: { $gte: oneMonthAgo } } },
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
    ]);

    const likesGroupedByDay = await Article.aggregate([
      { $project: { updatedAt: 1, likes: 1 } },
      { $match: { updatedAt: { $gte: oneMonthAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          totalLikes: { $sum: '$likes' },
        },
      },
      { $sort: { totalLikes: -1 } },
    ]);

    const mostLikedDay =
      likesGroupedByDay.length > 0
        ? new Date(likesGroupedByDay[0]._id).toDateString()
        : 'N/A';

    res.status(200).json({
      totalLikes: totalLikes[0]?.totalLikes || 0,
      lastMonthArticlesLikes: lastMonthArticlesLikes[0]?.totalLikes || 0,
      mostLikedDay,
    });
  } catch (error) {
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


// Fetch statistics for articles and likes
export const getArticleStats = async (req, res) => {
    try {
        const { timeRange } = req.query;
        const now = new Date();
        let startDate;

        if (timeRange === '24h') {
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        } else if (timeRange === '7d') {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (timeRange === '30d') {
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else {
            return res.status(400).json({ message: 'Invalid time range' });
        }

        const articles = await Article.find({
            createdAt: { $gte: startDate },
        }).select('createdAt likes');

        // Group articles by date and aggregate stats
        const stats = articles.reduce((acc, article) => {
            const date = article.createdAt.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            if (!acc[date]) {
                acc[date] = { count: 0, likes: 0 };
            }
            acc[date].count += 1;
            acc[date].likes += article.likes;
            return acc;
        }, {});

        const result = Object.keys(stats).map((date) => ({
            date,
            count: stats[date].count,
            likes: stats[date].likes,
        }));

        res.status(200).json({ articles: result });
    } catch (error) {
        console.error('Error fetching article stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
