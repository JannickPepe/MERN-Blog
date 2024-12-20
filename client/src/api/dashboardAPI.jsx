// For the Admin Stats Boxes
import { useQuery } from '@tanstack/react-query';

const fetchUsersData = async ({ queryKey }) => {
    const [, { limit }] = queryKey; // Destructure to access limit
    const res = await fetch(`/api/user/getusers?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

export const useUsersData = (limit = 5) =>
    useQuery({
        queryKey: ['users', { limit }],
        queryFn: fetchUsersData,
    });

const fetchPostsData = async ({ queryKey }) => {
    const [, { limit }] = queryKey;
    const res = await fetch(`/api/post/getposts?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
};

export const usePostsData = (limit = 5) =>
    useQuery({
        queryKey: ['posts', { limit }],
        queryFn: fetchPostsData,
    });

const fetchArticlesLikesData = async ({ queryKey }) => {
    const [, { currentUser }] = queryKey;
    const res = await fetch('/api/article/articlestats', {
        headers: { Authorization: `Bearer ${currentUser.token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch article likes stats");
    return res.json();
};

export const useArticlesLikesData = (currentUser) =>
    useQuery({
        queryKey: ['articlesLikes', { currentUser }],
        queryFn: fetchArticlesLikesData,
        enabled: !!currentUser, // Only run if currentUser exists
    });

const fetchArticlesData = async ({ queryKey }) => {
    const [, { limit }] = queryKey;
    const res = await fetch(`/api/article/getarticles?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch articles");
    return res.json();
};

export const useArticlesData = (limit = 5) =>
    useQuery({
        queryKey: ['articles', { limit }],
        queryFn: fetchArticlesData,
    });

const fetchCommentsData = async ({ queryKey }) => {
    const [, { limit }] = queryKey;
    const res = await fetch(`/api/comment/getcomments?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
};

export const useCommentsData = (limit = 5) =>
    useQuery({
    queryKey: ['comments', { limit }],
    queryFn: fetchCommentsData,
});
