import React from 'react'
import Navbar from '../components/Navbar'
import CourseList from '../components/CourseList'
import { useEffect } from 'react'

const HomePage = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log(value, parts)
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const jwtToken = getCookie('token');
  console.log('JWT Token:', jwtToken, document.cookie);

  useEffect(() => {
    async function verifyToken(token) {
      
    }
  }, [])
  

  return (
    <main className='max-w-[100vw] min-h-[100vh]'>
      <Navbar />
      {jwtToken ? <div>
        <div className='max-w-[100vw] pl-16 py-10'>
          <h1 className='text-black text-4xl font-bold mb-6'>List of Couses offered in 2024</h1>
          <CourseList />
        </div>
      </div> : 
      <div className='text-5xl text-black text-center font-bold mt-8'>
        Login to see the course List
      </div>}
    </main>
  )
}

export default HomePage
