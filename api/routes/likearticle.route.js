import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { likeArticle } from '../controllers/like.controller.js'; // Import the controller function

const router = express.Router();

// Like article route
router.put('/likearticle/:articleId', verifyToken, likeArticle);

export default router;
