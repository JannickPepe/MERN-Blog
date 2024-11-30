import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsTwitter, BsGithub, BsLinkedin} from 'react-icons/bs';
import nighteCodingLogo from '../assets/logo/nighteCoding-logo.png';

export default function FooterCom() {

  return (
    <footer>
      <div className="bg-gray-800 py-4 text-gray-400">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="px-4 w-full xl:w-1/5">
              <Link href="/" className="flex items-center">
                <img src={nighteCodingLogo} alt={'NighteCoding Logo'} className='h-20 w-20' />
                <span className='text-xl font-bold'>NighteCoding</span>
              </Link>
              <p className="text-justify lg:ml-2.5">
                NighteCoding is a community for Tech and IT people in every league and range.
                Here realtime projects are being shown, with real life use cases, blogs can be read and news articles can also be found.
              </p>
            </div>

            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Pages</h2>
              </div>
              <ul className="leading-8">
                <li><a href="/search" className="hover:text-blue-400">Posts</a></li>
                <li><a href="projects" className="hover:text-blue-400">Projects</a></li>
                <li><a href="about" className="hover:text-blue-400">About</a></li>
                <li><a href="contact" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Blog</h2>
              </div>
              <ul className="leading-8">
                <li><a href="#" className="hover:text-blue-400">Getting Started With HTML and CSS</a></li>
                <li><a href="#" className="hover:text-blue-400">What Is Flex And When to Use It?</a></li>
                <li><a href="#" className="hover:text-blue-400">How TailwindCSS Can Help Your Productivity?</a></li>
                <li><a href="#" className="hover:text-blue-400">5 Tips to Make Responsive Website</a></li>
                <li><a href="#" className="hover:text-blue-400">See More</a></li>
              </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Connect With Us</h2>
              </div>
              <div className='flex gap-2 justify-start'>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <BsTwitter />
                </a>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <BsLinkedin />
                </a>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <BsGithub />
                </a>
              </div>
          
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-4 bg-slate-900 py-2">
          <div className="-mx-4 flex flex-wrap justify-between">
            <Footer.Copyright
              href='#'
              by="NigtheCoding"
              className='text-white mx-auto'
              year={new Date().getFullYear()}
            />
          </div>
        </div>
      </div>
  </footer>
  );
}


