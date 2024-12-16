import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
//import { set } from 'mongoose';
import ArticlePageCreate from '../Articles/ArticlePageCreate';


export default function DashArticles() {

  const { currentUser } = useSelector((state) => state.user);
  const [userArticles, setUserArticles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/article/getarticles?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserArticles(data.articles);
          if (data.articles.length < 9) {
            setShowMore(false);
          }
        }

      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchArticles();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userArticles.length;

    try {
      const res = await fetch(
        `/api/article/getarticles?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserArticles((prev) => [...prev, ...data.articles]);
        if (data.articles.length < 9) {
          setShowMore(false);
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteArticle = async () => {
    setShowModal(false);

    try {
      const res = await fetch(
        `/api/article/deletearticle/${articleIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserArticles((prev) =>
          prev.filter((article) => article._id !== articleIdToDelete)
        );
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <ArticlePageCreate />
      
      {currentUser.isAdmin && userArticles.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Article image</Table.HeadCell>
              <Table.HeadCell>Article title</Table.HeadCell>
              <Table.HeadCell>Article text</Table.HeadCell>
              <Table.HeadCell>Article link url</Table.HeadCell>
              <Table.HeadCell>Article likes</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userArticles.map((article) => (
              <Table.Body key={article} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/article/`}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/article/`}
                    >
                      {article.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{article.text}</Table.Cell>
                  <Table.Cell>{article.link}</Table.Cell>
                  <Table.Cell>{article.likes}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setArticleIdToDelete(article._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-article/${article._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no articles yet!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this article?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteArticle}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
  
}
