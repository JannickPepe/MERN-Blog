import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { likeArticle } from '../controllers/like.controller.js'; 
import { getArticleStats } from '../controllers/article.controller.js';

const router = express.Router();

// Like article route
router.put('/likearticle/:articleId', verifyToken, likeArticle);
// Stats endpoint
router.get('/stats', verifyToken, getArticleStats);

export default router;
