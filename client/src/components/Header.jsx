import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import nighteCodingLogo from '../assets/logo/nighteCoding-logo.png';
import NewLogin from './Login/NewLogin';


export default function Header() {

  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  // for the light and dark mode
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  // for the LnD mode
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  //
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  //
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='flex items-center font-semibold dark:text-white group gap-1' >
        <img 
          src={nighteCodingLogo} 
          alt={'NighteCoding Logo'} 
          className='h-12 w-12 group-hover:border-2 group-hover:border-sky-800 group-hover:rounded-full group-hover:scale-105' 
        />
        <span className='text-base font-bold'>NighteCoding</span>
      </Link>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/search'} as={'div'}>
          <Link to='/search'>Posts</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact'} as={'div'}>
          <Link to='/contact'>Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-9 md:w-12 h-7 md:h-10 sm:inline mt-1.5 md:mt-0' color='gray' pill onClick={() => dispatch(toggleTheme())} >
          {theme === 'light' ? <FaMoon /> : <FaSun />  }
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <NewLogin />
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

    </Navbar>
  );

}
