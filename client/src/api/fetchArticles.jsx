// src/api/articleApi.js
const API_BASE_URL = '/api/article';

export const fetchArticles = async (startIndex, limit) => {
    try {
        const res = await fetch(`${API_BASE_URL}/getarticles?startIndex=${startIndex}&limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch articles');
        return await res.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const toggleArticleLike = async (articleId, token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/likearticle/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error('Failed to toggle like');
        return await res.json();
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
};
