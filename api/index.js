import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import likearticleRoutes from './routes/likearticle.route.js';
import articleRoutes from './routes/article.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// setup env
dotenv.config();

// Connection to env file for Mongo
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

//
const __dirname = path.resolve();

// Cretae app into an express application
const app = express();

app.use(express.json());
// Parse Cookie header and populate req.cookies (verifyUser.js) with an object key'ed by the cookie names.
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/article', likearticleRoutes);

// For our build
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

});
