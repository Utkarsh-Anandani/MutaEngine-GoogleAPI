import React from 'react'
import Navbar from '../components/Navbar'
import CourseList from '../components/CourseList'

const HomePage = ({token}) => {
  const jwtToken = token

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
        Login to see the full course List
      </div>}
    </main>
  )
}

export default HomePage
