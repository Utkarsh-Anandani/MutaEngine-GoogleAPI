import React from 'react'

const Course = ({name}) => {
  return (
    <div className='w-[300px] h-[200px] rounded-xl shadow-2xl'>
      <div className='w-full h-[60%] bg-slate-400 rounded-t-xl flex items-center justify-center text-xl text-white font-semibold'>{name}</div>
      <div className='px-4 py-3 flex items-center justify-between'>
        <div>
            <div className='text-xl font-semibold'>{name}</div>
            <div>&#8377; 2400</div>
        </div>
        <div className='bg-sky-500 rounded-lg px-2 py-1 text-white font-semibold text-sm cursor-pointer'>Buy Now</div>
      </div>
    </div>
  )
}

export default Course
