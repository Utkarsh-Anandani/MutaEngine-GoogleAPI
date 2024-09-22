import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center justify-between px-8 py-4 bg-sky-500'>
        <div className='text-2xl font-semibold text-white'>COURSES</div>
        <div className='flex flex-row items-center justify-between w-[20vw]'>
          <div className='text-white text-xl font-semibold'>About</div>
          <div className='text-white text-xl font-semibold'>Contact</div>
          <div className='text-white text-xl font-semibold'>Profile</div>
        </div>
      </nav>
  )
}

export default Navbar
