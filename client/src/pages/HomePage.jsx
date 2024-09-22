import React from 'react'
import Navbar from '../components/Navbar'
import CourseList from '../components/CourseList'

const HomePage = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log(value, parts)
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const jwtToken = getCookie('token');
  console.log('JWT Token:', jwtToken);

  return (
    <main className='max-w-[100vw] min-h-[100vh]'>
      <Navbar />
      <div className='max-w-[100vw] pl-16 py-10'>
        <h1 className='text-black text-4xl font-bold mb-6'>List of Couses offered in 2024</h1>
        <CourseList />
      </div>
    </main>
  )
}

export default HomePage
