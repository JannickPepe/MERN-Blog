import Article from '../models/article.model.js';

export const likeArticle = async (req, res) => {
    try {
        // Now that verifyToken sets req.user = { id: '...', isAdmin: ... }
        const userId = req.user.id; 
        const { articleId } = req.params;
    
        const article = await Article.findById(articleId);
    
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
    
        // Check if user already liked the article
        const alreadyLiked = article.likedByUsers.includes(userId);
    
        if (alreadyLiked) {
            // User unlikes the article
            article.likedByUsers = article.likedByUsers.filter(id => id !== userId);
            article.likes = Math.max(0, article.likes - 1);
            await article.save();
            return res.status(200).json({ likes: article.likes, liked: false });
        } else {
            // User likes the article
            article.likedByUsers.push(userId);
            article.likes += 1;
            await article.save();
            return res.status(200).json({ likes: article.likes, liked: true });
        }
    
        } catch (error) {
        console.error('Error in likeArticle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};