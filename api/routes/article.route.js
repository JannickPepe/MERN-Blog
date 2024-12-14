import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletearticle, getarticles, updatearticle } from '../controllers/article.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getarticles', getarticles)
router.delete('/deletearticle/:articleId/:userId', verifyToken, deletearticle)
router.put('/updatearticle/:articleId/:userId', verifyToken, updatearticle)


export default router;