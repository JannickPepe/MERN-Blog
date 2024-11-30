import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import NewHero from '../components/Landing/NewHero';
import { NewProjects } from '../components/Landing/NewProjects';
import Articles from '../components/Landing/Articles';

export default function Home() {

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
    <main>

      {/* HERO SECTION */}
      <section className='bg-slate-100 dark:bg-slate-700'>
        <NewHero />
      </section>
    
     {/* PROJECTS SECTION */}
      <section className='bg-slate-100 dark:bg-slate-700'>
        <NewProjects/>
      </section>

      {/* POST / BLOG SECTION */}
      <section className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
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

      {/* ARTICLES SECTION */}
      <section className='bg-slate-100 dark:bg-slate-700'>
        <Articles />
      </section>
    
    </main>
  );
}
