import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ token, userDetails }) => {
  return (
    <nav className='flex flex-row items-center justify-between px-8 py-4 bg-sky-500'>
      <div className='text-2xl font-semibold text-white'>COURSES</div>
      <div className='flex flex-row items-center justify-between w-[20vw]'>
        <div className='text-white text-xl font-semibold'>About</div>
        <div className='text-white text-xl font-semibold'>Contact</div>
        {token ? <div>
          <Link to={'/login'}><div className='text-white text-xl font-semibold'>Signin</div></Link>
          <Link to={'/signup'}><div className='text-white text-xl font-semibold'>Signup</div></Link>
        </div>
          :
          <div className='text-white text-xl font-semibold'>{userDetails}</div>
        }
      </div>
    </nav>
  )
}

export default Navbar
