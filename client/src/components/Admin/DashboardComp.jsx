import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup, } from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { GrArticle } from 'react-icons/gr';
import { useUsersData, usePostsData, useArticlesLikesData, useArticlesData, useCommentsData, } from '../../api/dashboardAPI';
import MostData from './TotalCommentsFull';
import MostDataPosts from './TotalPostsFull';
import MostDataArticles from './TotalArticlesFull';

const NewArticleChart = React.lazy(() => import('./NewArticleGraph'));
const ArticleLineChart = React.lazy(() => import('./ArticleLineChart'));

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);

  // React Query Hooks
  const { data: userData } = useUsersData();
  const { data: postData } = usePostsData();
  const { data: articlesLikesData } = useArticlesLikesData(currentUser);
  const { data: articleData } = useArticlesData();
  const { data: commentData } = useCommentsData();

  // Safely access data with optional chaining
  const users = userData?.users || [];
  const totalUsers = userData?.totalUsers || 0;
  const lastMonthUsers = userData?.lastMonthUsers || 0;
  const mostCreatedUsersDay = userData?.mostCreatedDay || 'N/A';

  const posts = postData?.posts || [];
  const totalPosts = postData?.totalPosts || 0;
  const lastMonthPosts = postData?.lastMonthPosts || 0;
  const mostCreatedPostsDay = postData?.mostCreatedDay || 'N/A';
  const mostUsedCategories = postData?.mostUsedCategories || [];
  const leastUsedCategories = postData?.leastUsedCategories || [];

  const totalArticleLikes = articlesLikesData?.totalLikes || 0;
  const lastMonthArticlesLikes = articlesLikesData?.lastMonthArticlesLikes || 0;
  const mostLikedDay = articlesLikesData?.mostLikedDay || 'N/A';
  const mostLikedArticles = articleData?.mostLikedArticles || [];
  const leastLikedArticles = articleData?.leastLikedArticles || [];

  const articles = articleData?.articles || [];
  const totalArticles = articleData?.totalArticles || 0;
  const lastMonthArticles = articleData?.lastMonthArticles || 0;
  const mostCreatedArticlesDay = articleData?.mostCreatedDay || 'N/A';

  const comments = commentData?.comments || [];
  const totalComments = commentData?.totalComments || 0;
  const lastMonthComments = commentData?.lastMonthComments || 0;
  const mostCommentedDay = commentData?.mostCommentedDay || 'N/A';
  const mostCommentedPostTitle = postData?.mostCommentedPostTitle || 'N/A';
  const mostLikedComments = commentData?.mostLikedComments || [];
  
  return (
    <div className='p-3 md:mx-auto'>

      <section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-6 md:px-2 gap-4 mx-auto'>
        {/*Stats Box for Users Created */}
        <div className="flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 rounded-md shadow-md">
          <div className="flex justify-between gap-3">
            <div>
              <h3 className="text-gray-500 dark:text-slate-500 text-md uppercase font-semibold">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="text-teal-600 rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <p className="text-gray-500">Last month</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 lg:-mt-2">Most created on: <span className='underline'>{mostCreatedUsersDay}</span></p>
        </div>
        
        {/*Stats Box for Comments Created */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 rounded-md shadow-md'>
          <div className='flex justify-between gap-3'>
            <div>
              <h3 className='text-gray-500 dark:text-slate-500 text-md uppercase font-semibold'>Total Comments</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='text-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <p className='text-gray-500'>Last month</p>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 lg:-mt-2">
            Most created on: <span className='underline'>{mostCommentedDay}</span>
          </p>
          <div className='relative'>
            <MostData
              mostCommentedPostTitle={mostCommentedPostTitle}
              mostUsedCategories={mostUsedCategories}
              mostLikedComments={mostLikedComments}
            />
          </div>
        </div>

        {/*Stats Box for Posts Created */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 rounded-md shadow-md'>
          <div className='flex justify-between gap-3'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-slate-500 text-md uppercase font-semibold'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='text-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <p className='text-gray-500'>Last month</p>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 lg:-mt-2">
            Most created on: <span className='underline'>{mostCreatedPostsDay}</span>
          </p>
          <div className='relative'>
            <MostDataPosts
              mostUsedCategories={mostUsedCategories}
              leastUsedCategories={leastUsedCategories}
            />
          </div>
        </div>

        {/*Stats Box for Article Created */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 rounded-md shadow-md'>
          <div className='flex justify-between gap-3'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-slate-500 text-md uppercase font-semibold'>Total Articles</h3>
              <p className='text-2xl'>{totalArticles}</p>
            </div>
            <GrArticle className='text-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthArticles}
            </span>
            <p className='text-gray-500'>Last month</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 lg:-mt-2">Most created on: <span className='underline'>{mostCreatedArticlesDay}</span></p>
        </div>

        {/*Stats Box for Article Likes */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 rounded-md shadow-md'>
          <div className='flex justify-between gap-3'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-slate-500 text-md uppercase font-semibold'>Total Article Likes</h3>
              <p className='text-2xl'>{totalArticleLikes}</p>
            </div>
            <BiLike className='text-teal-600 rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthArticlesLikes}
            </span>
            <p className='text-gray-500'>Last month</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 lg:-mt-2">Most liked on: <span className='underline'>{mostLikedDay}</span></p>
          <MostDataArticles
            mostLikedArticles={mostLikedArticles}
            leastLikedArticles={leastLikedArticles}
          />
        </div>
      </section>

      <section className='flex flex-wrap gap-4 py-3 mx-auto justify-center md:px-2'>
        <div className='flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800'>
          {/* Add a Suspense fallback for lazy-loaded components */}
          <div className='md:flex justify-center items-center gap-4 md:gap-8 bg-slate-200 dark:bg-inherit w-full mx-auto md:py-8 md:px-6 rounded-md'>
              <Suspense fallback={<p>Loading graph...</p>}>
                <NewArticleChart />
              </Suspense>
              <Suspense fallback={<p>Loading graph...</p>}>
                <ArticleLineChart />
              </Suspense>
            </div>
        </div>

        <div className='flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800 my-8'>
          <div className='flex justify-between bg-slate-200 dark:bg-inherit p-3 text-sm font-semibold'>
            <h1 className='text-lg font-semibold p-2'>Recent users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=users'}>See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white hover:bg-zinc-500 hover:text-zinc-200 dark:border-gray-700 dark:bg-gray-800 transition-colors'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 py-4 bg-zinc-300 px-6'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-lg font-semibold py-2'>Recent comments</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=comments'}>See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white hover:bg-zinc-500 hover:text-zinc-200 dark:border-gray-700 dark:bg-gray-800 transition-colors'>
                    <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 py-4 bg-zinc-300  md:px-6 overflow-x-auto'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-lg font-semibold py-2'>Recent posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white hover:bg-zinc-500 hover:text-zinc-200 dark:border-gray-700 dark:bg-gray-800 transition-colors'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        loading="lazy"
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 py-4 md:px-6 overflow-x-auto'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='p-2 text-lg font-semibold'>Recent articles</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=articles'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head className='bg-zinc-600'>
              <Table.HeadCell>Article image</Table.HeadCell>
              <Table.HeadCell>Article Title</Table.HeadCell>
              <Table.HeadCell>Article Text</Table.HeadCell>
              <Table.HeadCell>Article link url</Table.HeadCell>
            </Table.Head>
            {articles &&
              articles.map((article) => (
                <Table.Body key={article._id} className='divide-y'>
                  <Table.Row className='hover:bg-zinc-500 hover:text-zinc-200 dark:border-gray-700 dark:bg-gray-800 transition-colors'>
                    <Table.Cell>
                      <img
                        src={article.image}
                        alt='user'
                        loading="lazy"
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-1/2'>{article.title}</Table.Cell>
                    <Table.Cell className='w-1/2'>{article.text}</Table.Cell>
                    <Table.Cell className='w-1/2'>{article.link}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </section>
    </div>
  );
}
