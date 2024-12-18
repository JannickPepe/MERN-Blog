import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletearticle, getarticles, getArticleStats, updatearticle, updateArticleRanks } from '../controllers/article.controller.js';
import { getArticleLikesStats } from '../controllers/article.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getarticles', getarticles)
router.delete('/deletearticle/:articleId/:userId', verifyToken, deletearticle)
router.put('/updatearticle/:articleId/:userId', verifyToken, updatearticle)
router.get('/articlestats', verifyToken, getArticleLikesStats);
router.put('/update-rank', verifyToken, updateArticleRanks);
router.get("/stats", getArticleStats);

export default router;