import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.jpg'

function Header() {
  const lowernav = [
    {name: 'home', link: '/'},
    {name: 'mission', link: '/mission'},
    {name: 'course', link: '/course'},
    {name: 'result', link: '/results'},
    {name: 'tesimonials', link: '/testimonials'},
    {name: 'media', link: '/media'},
    {name: 'about ipec', link: '/about'},
    {name: 'why ipec', link: '/why'},
    {name: 'registration form', link: '/registration'},
    {name: 'contact us', link: '/contact'}
  ]
  return (
    <div>
          <div className='h-[85px] bg-white flex items-center justify-between px-8'>
        <div className='h-[75px] w-auto'>
          <img src={Logo} alt="logo" className='h-[75px]' />
        </div>
        <div className='flex items-center gap-4 text-[12px]'>
          <div className='relative flex items-center gap-4 font-bold text-red-700'>
            <div className="duration-200 linear">RESGISTER FOR NTA</div>
            <div>VMC CENTERS</div>
            <span className='absolute w-[2px] h-[20px] text-red-700 bg-red-700 left-[58%] top-0'></span>
          </div>
          <div className='px-3 py-1 bg-yellow-400 text-[#1f1d5a] font-medium rounded'>ADMISSION TEST RESULT</div>
        </div>
      </div>

      {/* lower nav */}
      <div className='h-[35px] bg-[#E9ECF5] flex gap-6 items-center justify-center px-auto'>
        {lowernav.map(navItem => 
        <NavLink to={navItem.link} key={navItem.link} >
          <div className="text-sm text-[#1f1d5a] font-medium uppercase cursor-pointer">{navItem.name}</div>
        </NavLink>
        )}  
      </div>
    </div>
  )
}

export default Header