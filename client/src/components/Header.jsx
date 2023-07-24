import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New state for mobile menu

  const optionsArr = [
    // ... (your options array)
    'E-brochures',
    'Sample Papers',
    'Syllabus',

  ];

  const lowernav = [
    // ... (your navigation items)
    { name: 'home', link: '/', dropdown: false },
    { name: 'mission', link: '/mission', dropdown: false },
    { name: 'course', link: '/course', dropdown: false },
    { name: 'result', link: '/results', dropdown: false },
    { name: 'testimonials', link: '/testimonials', dropdown: false },
    { name: 'media', link: '/media', dropdown: false },
    { name: 'about ipec', link: '/about', dropdown: false },
    { name: 'why ipec', link: '/why', dropdown: false },
    { name: 'Download', link: '/download', dropdown: false },
    { name: 'Careers', link: '/careers', dropdown: false },
    { name: 'registration form', link: '/registration', dropdown: false },
    { name: 'contact us', link: '/contact', dropdown: false },
  ];

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const auth = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div>
        <div className='h-[85px] bg-white flex items-center justify-between px-8'>
          {/* Hamburger Icon (Moved to the left side) */}
          <div className='lg:hidden'>
            <button
              className='text-[#1f1d5a] font-bold text-xl focus:outline-none'
              onClick={handleMobileMenuToggle}
            >
              ☰
            </button>
          </div>
          <div className='h-[75px] w-auto'>
            <img src={Logo} alt='logo' className='h-[75px]' />
          </div>
          <div className='flex items-center gap-4 text-[12px]'>
            {auth ? (
              <>
                <div
                  className='text-white bg-[#1f1d5a] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={logout}
                >
                  Logout
                </div>
                {auth.userRole === 'admin' ? (
                  <Link
                    to='/dashboard/users'
                    className='text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Dashboard
                  </Link>
                ) : (
                  <></>
                )}
                {auth.userRole === 'student' ? (
                  <Link
                    to='/exam'
                    className='text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Exams
                  </Link>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Link
                to='/login'
                className='text-white bg-[#1f1d5a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className='w-full py-4 bg-white lg:hidden'>
            {lowernav.map((navItem) =>
              navItem.dropdown ? (
                <div
                  onClick={handleDropdown}
                  key={navItem.name}
                  className='relative text-sm text-[#1f1d5a] font-medium uppercase cursor-pointer py-2 px-4' // Add padding here
                >
                  {navItem.name}
                  {openDropdown && (
                    <div className='absolute left-0 px-2 py-2 bg-white top-[138%] z-10'>
                      <div>
                        {navItem.options.map((downloadOption) => (
                          <Link to={'/download'}
                            key={downloadOption}
                            className='hover:bg-[#1f1d5a] hover:text-white whitespace-nowrap my-2 py-1.5 px-4 rounded text-[#1f1d5a]'
                          >
                            {downloadOption}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to={navItem.link} key={navItem.link}>
                  <div className='text-sm text-[#1f1d5a] font-medium uppercase cursor-pointer py-2 px-4'>
                    {navItem.name}
                  </div>
                </NavLink>
              )
            )}
          </div>
        )}

        {/* Desktop Menu */}
        <div className='hidden lg:flex h-[35px] bg-[#E9ECF5] gap-6 items-center justify-center px-auto'>
          {lowernav.map((navItem) =>
            navItem.dropdown ? (
              <div
                onClick={handleDropdown}
                key={navItem.name}
                className='relative text-sm text-[#1f1d5a] font-medium uppercase cursor-pointer'
              >
                {navItem.name}
                {openDropdown && (
                  <div className='absolute left-0 px-2 py-2 bg-white top-[138%] z-10'>
                    <div>
                      {navItem.options.map((downloadOption) => (
                        <div
                          key={downloadOption}
                          className='hover:bg-[#1f1d5a] hover:text-white whitespace-nowrap my-2 py-1.5 px-4 rounded  text-[#1f1d5a]'
                        >
                          <Link to={'/download'}>
                            {downloadOption}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to={navItem.link} key={navItem.link}>
                <div className='text-sm text-[#1f1d5a] font-medium uppercase cursor-pointer'>
                  {navItem.name}
                </div>
              </NavLink>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
