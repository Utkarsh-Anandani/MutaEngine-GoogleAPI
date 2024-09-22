import React from 'react'
import Course from './Course'

const CourseList = () => {
  return (
    <div className='flex flex-row flex-wrap gap-8'>
      <Course name={'Course 1'} />
      <Course name={'Course 2'} />
      <Course name={'Course 3'} />
      <Course name={'Course 4'} />
      <Course name={'Course 5'} />
      <Course name={'Course 6'} />
      <Course name={'Course 7'} />
      <Course name={'Course 8'} />
    </div>
  )
}

export default CourseList
