import Comment from '../models/comment.model.js';

//
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

//
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);

  } catch (error) {
    next(error);
  }
};

//
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);

  } catch (error) {
    next(error);
  }
};

//
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to edit this comment')
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);

  } catch (error) {
    next(error);
  }
};

//
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to delete this comment')
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');

  } catch (error) {
    next(error);
  }
};

//
export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all comments'));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;

    // Fetch paginated comments
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Total number of comments
    const totalComments = await Comment.countDocuments();

    // Comments in the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Group comments by day to find the most active day
    const commentsGroupedByDay = await Comment.aggregate([
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

    // Convert the date format for the most commented day
    const mostCommentedDay =
      commentsGroupedByDay.length > 0
        ? new Date(commentsGroupedByDay[0]._id).toDateString()
        : 'N/A';

    // Find the comment(s) with the most likes
    const commentsWithMostLikes = await Comment.aggregate([
      {
        $group: {
          _id: '$_id', // Group by comment ID
          content: { $first: '$content' }, // Retain the content
          numberOfLikes: { $first: '$numberOfLikes' }, // Retain the number of likes
        },
      },
      { $sort: { numberOfLikes: -1 } }, // Sort by number of likes
    ]);

    // Determine the maximum number of likes
    const maxLikes =
      commentsWithMostLikes.length > 0 ? commentsWithMostLikes[0].numberOfLikes : 0;

    // Filter to include only comments with the maximum number of likes
    const mostLikedComments = commentsWithMostLikes.filter(
      (comment) => comment.numberOfLikes === maxLikes
    );

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
      mostCommentedDay,
      mostLikedComments, // Include comments with the most likes
    });
  } catch (error) {
    next(error);
  }
};