import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './components/NotificationContext';
import Footer from './components/Footer';
import Header from './components/Header';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About/About'));
const SignIn = React.lazy(() => import('./pages/login/SignIn'));
const SignUp = React.lazy(() => import('./pages/login/SignUp'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Projects = React.lazy(() => import('./pages/Projects/Projects'));
const CreatePost = React.lazy(() => import('./pages/Posts/CreatePost'));
const UpdatePost = React.lazy(() => import('./pages/Posts/UpdatePost'));
const PostPage = React.lazy(() => import('./pages/Posts/PostPage'));
const CreateArticle = React.lazy(() => import('./pages/Articles/CreateArticle'));
const UpdateArticle = React.lazy(() => import('./pages/Articles/UpdateArticle'));
const Articles = React.lazy(() => import('./pages/Articles/Articles'));
const Search = React.lazy(() => import('./pages/Posts/Search'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));

// Preload 
Home.preload = () => import('./pages/Home');
Search.preload = () => import('./pages/Posts/Search');
Projects.preload = () => import('./pages/Projects/Projects');
Articles.preload = () => import('./pages/Articles/Articles');
SignIn.preload = () => import('./pages/login/SignIn');
SignUp.preload = () => import('./pages/login/SignUp');

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/search" element={<Search />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/update-article/:articleId" element={<UpdateArticle />} />
            </Route>

            <Route path="/articles" element={<Articles />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/post/:postSlug" element={<PostPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </NotificationProvider>
  );
}
