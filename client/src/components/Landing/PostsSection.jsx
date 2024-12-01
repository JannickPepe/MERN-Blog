import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PostCard from '../Posts/PostCard';

const PostsSection = () => {

    const [posts, setPosts] = useState([]);

    //
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getPosts');
            const data = await res.json();
            setPosts(data.posts);
        };

        fetchPosts();
    }, []);

    return (
        <section className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-10'>
            <div className="text-center pb-2">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    NighteCoding&apos;s exciting <span className="text-sky-600 dark:text-indigo-500">Posts</span>
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">Our posts are a perfect match for an evening coffee</p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">With redirect link to the full post</p>
            </div>

            {posts && posts.length > 0 && (
                <div className='flex flex-col gap-6'>
                    <h2 className='text-2xl font-semibold text-center'>
                        Recent Posts
                    </h2>

                    <div className='flex flex-wrap justify-center items-center gap-4'>
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>

                    <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center' >
                        View all posts
                    </Link>
                </div>
            )}
        </section>
    )
}

export default PostsSection
