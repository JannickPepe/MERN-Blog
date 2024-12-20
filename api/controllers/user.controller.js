import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

// test the API in Postman ect
export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

// updateUser
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    // Only letters and numbers for username in the match method
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }

  // create a request with try and catch
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        // have each input to be updated if changed
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      // have the updated changed to be true and send back the new information
      { new: true }
    );
    // take everything from rest and insert it into updatedUser for the backend
    const { password, ...rest } = updatedUser._doc;
    // respond with status 200 as a json with rest data
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};

// deleteUser
export const deleteUser = async (req, res, next) => {

  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');

  } catch (error) {
    next(error);
  }
};

// signout
export const signout = (req, res, next) => {

  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');

  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Calculate the day with the most user creations
    const allUsers = await User.find({}, { createdAt: 1 }); // Fetch all user creation dates
    const userCreationCounts = allUsers.reduce((acc, user) => {
      const date = new Date(user.createdAt).toDateString(); // Group by day
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const mostCreatedDayEntry = Object.entries(userCreationCounts).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ['', 0] // Default to empty day and 0 count
    );

    const mostCreatedDay = mostCreatedDayEntry[0]; // Extract the date

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
      mostCreatedDay, // Include the most created day
    });
  } catch (error) {
    next(error);
  }
};

// getUser
export const getUser = async (req, res, next) => {

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};
