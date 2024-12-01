import NewHero from '../components/Landing/NewHero';
import { NewProjects } from '../components/Landing/NewProjects';
import PostsSection from '../components/Landing/PostsSection';
import { Articles } from '../components/Landing/Articles';

export default function Home() {

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

      {/* POST SECTION */}
      <section className='bg-slate-100 dark:bg-slate-700'>
        <PostsSection />
      </section>

      {/* ARTICLES SECTION */}
      <section className='bg-slate-100 dark:bg-slate-700'>
        <Articles />
      </section>
    
    </main>
  );
}
