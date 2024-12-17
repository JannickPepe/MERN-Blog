import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About/About';
import SignIn from './pages/login/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects/Projects';
import SignUp from './pages/login/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/Posts/CreatePost';
import UpdatePost from './pages/Posts/UpdatePost';
import PostPage from './pages/Posts/PostPage';
import CreateArticle from './pages/Articles/CreateArticle';
import UpdateArticle from './pages/Articles/UpdateArticle';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Posts/Search';
import Contact from './pages/Contact/Contact';
import Articles from './pages/Articles/Articles';
import { NotificationProvider } from './components/NotificationContext';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <NotificationProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/search' element={<Search />} />

          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
            <Route path='/create-article' element={<CreateArticle />} />
            <Route path='/update-article/:articleId' element={<UpdateArticle />} />
          </Route>

          <Route path='/articles' element={<Articles />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Routes>
      </NotificationProvider>
    
      <Footer />
    </BrowserRouter>
  );
}
