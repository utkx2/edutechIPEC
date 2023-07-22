import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const optionsArr = [
    'E-brochures',
    'Sample Papers',
    'Registration Form',
    'Enrollment Forms',
    'Application Forms',
    'Instructions to Fill OMR',
    'JEE Advanced Solution',
    'JEE Mains Solution',
  ];
  const lowernav = [
    { name: 'home', link: '/', dropdown: false },
    { name: 'mission', link: '/mission', dropdown: false },
    { name: 'course', link: '/course', dropdown: false },
    { name: 'result', link: '/results', dropdown: false },
    { name: 'testimonials', link: '/testimonials', dropdown: false },
    { name: 'media', link: '/media', dropdown: false },
    { name: 'about ipec', link: '/about', dropdown: false },
    { name: 'why ipec', link: '/why', dropdown: false },
    { name: 'Download', link: '/#', dropdown: true, options: optionsArr },
    { name: 'Careers', link: '/careers', dropdown: false },
    { name: 'registration form', link: '/registration', dropdown: false },
    { name: 'contact us', link: '/contact', dropdown: false },
  ];

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const auth = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <div className='h-[85px] bg-white flex items-center justify-between px-8'>
        <div className='h-[75px] w-auto'>
          <img src={Logo} alt='logo' className='h-[75px]' />
        </div>
        <div className='flex items-center gap-4 text-[12px]'>
          <div className='relative flex items-center gap-4 font-bold text-red-700'>
            <div className='duration-200 linear'>REGISTER FOR NTA</div>
            <div>VMC CENTERS</div>
            <span className='absolute w-[2px] h-[20px] text-red-700 bg-red-700 left-[58%] top-0'></span>
          </div>
          <div className='px-3 py-1 bg-yellow-400 text-[#1f1d5a] font-medium rounded'>
            ADMISSION TEST RESULT
          </div>
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

      {/* lower nav */}
      <div className='h-[35px] bg-[#E9ECF5] flex gap-6 items-center justify-center px-auto'>
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
                        {downloadOption}
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
  );
}

export default Header;