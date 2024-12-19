import axios from 'axios';

export const fetchArticleStats = async (timeRange) => {
    try {
        const { data } = await axios.get('/api/article/stats', {
            params: { timeRange },
        });
        return data; // Includes { articles: [{ date, count, likes }] }
        
    } catch (error) {
        console.error('Error fetching article stats:', error);
        throw error;
    }
};
