import axios from 'axios';

export const fetchArticleStats = async (timeRange) => {
    try {
        const { data } = await axios.get('/api/article/stats', {
            params: { timeRange },
        });
        return data;
    } catch (error) {
        console.error('Error fetching article stats:', error);
        throw error;
    }
};
