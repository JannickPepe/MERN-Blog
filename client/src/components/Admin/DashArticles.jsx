import { memo, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

// Lazy load components
const ArticlePageCreate = lazy(() => import('../Articles/ArticlePageCreate'));
const DashArticlesNew = lazy(() => import('./DashArticlesNew'));

// Memoized component for optimization
const DashArticles = memo(() => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* Add suspense for lazy-loaded components */}
      <Suspense fallback={<p>Loading Article Page...</p>}>
        <ArticlePageCreate />
      </Suspense>

      {currentUser.isAdmin && (
        <Suspense fallback={<p>Admin Article Table...</p>}>
          <DashArticlesNew />
        </Suspense>
      )}
    </div>
  );
});

export default DashArticles;
// Add displayName
DashArticles.displayName = 'Articles Admin Page';
