import { useSelector } from 'react-redux';
//import { set } from 'mongoose';
import ArticlePageCreate from '../Articles/ArticlePageCreate';
import DashArticlesNew from './DashArticlesNew';


export default function DashArticles() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

      <ArticlePageCreate />

      {currentUser.isAdmin && (
        <DashArticlesNew />
      )}

      
    </div>
  );
  
}
