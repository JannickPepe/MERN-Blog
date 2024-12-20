import Post from '../models/post.model.js';
import Comment from "../models/comment.model.js";
import { errorHandler } from '../utils/error.js';


export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  // Create our slug for the post title
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  // Have our newPost as new Post with everything from body, slug and userId
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  
  // If succeed it will save the newPost have if status okay it will be a json
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  } catch (error) {
    next(error);
  }
};


export const getposts = async (req, res, next) => {

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const postsGroupedByDay = await Post.aggregate([
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
      postsGroupedByDay.length > 0
        ? new Date(postsGroupedByDay[0]._id).toDateString()
        : 'N/A';

    // Find the post with the most comments
    const mostCommentedPost = await Comment.aggregate([
      {
        $group: {
          _id: '$postId', // Group by postId
          count: { $sum: 1 }, // Count the number of comments per post
        },
      },
      { $sort: { count: -1 } }, // Sort by count in descending order
      { $limit: 1 }, // Take the top result
    ]);

    let mostCommentedPostTitle = 'N/A';

    if (mostCommentedPost.length > 0) {
      const post = await Post.findById(mostCommentedPost[0]._id); // Fetch the post title
      mostCommentedPostTitle = post ? post.title : 'N/A';
    }    

    // Find the most used categories
    const categoriesGrouped = await Post.aggregate([
      {
        $group: {
          _id: '$category', // Group by category
          count: { $sum: 1 }, // Count the number of posts per category
        },
      },
      { $sort: { count: -1 } }, // Sort by count in descending order
    ]);

    // Find the least used categories
    const categoriesGroupedLeast = await Post.aggregate([
      {
        $group: {
          _id: '$category', // Group by category
          count: { $sum: 1 }, // Count the number of posts per category
        },
      },
      { $sort: { count: 1 } }, // Sort by count in descending order
    ]);

    // Identify the highest count
    const maxCount = categoriesGrouped.length > 0 ? categoriesGrouped[0].count : 0;

    // Find all categories with the highest count
    const mostUsedCategories = categoriesGrouped
      .filter((category) => category.count === maxCount)
      .map((category) => category._id || 'Not set');

    // Determine the minimum count
    const minCount =
    categoriesGroupedLeast.length > 0 ? categoriesGroupedLeast[0].count : 0;

    // Find all categories with the minimum count
    const leastUsedCategories = categoriesGroupedLeast
      .filter((category) => category.count === minCount)
      .map((category) => category._id || 'Not set');


    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
      mostCreatedDay,
      mostCommentedPostTitle,
      mostUsedCategories, 
      leastUsedCategories,
    });

  } catch (error) {
    next(error);
  }
};


export const deletepost = async (req, res, next) => {

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');

  } catch (error) {
    next(error);
  }
};


export const updatepost = async (req, res, next) => {

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);

  } catch (error) {
    next(error);
  }
};
