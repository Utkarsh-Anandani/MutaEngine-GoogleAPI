import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleLoginComponent from '../components/GoogleLoginComponent';

const Login = () => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch('https://muta-engine-google-api-backend-4pvxsmryo.vercel.app/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.status === 200 || response.status === 201) {
      alert('Logged in Successfully')
      setredirect(true);
    }
    else {
      alert('Login Failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='bg-white w-[30vw] h-[70vh] rounded-3xl shadow-xl flex flex-col items-center gap-10 py-10'>
        <h1 className='text-4xl text-sky-500 font-bold mb-4'>Login to your Account</h1>
        <form className='flex flex-col gap-5' onSubmit={login}>
          <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' value={email} type="email" name='email' placeholder='E-Mail' onChange={
            (e) => {
              setemail(e.target.value);
            }
          }/>
          <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' value={password} type="password" name='pass' placeholder='Password' onChange={
            (e) => {
              setpassword(e.target.value);
            }
          }/>
          <button className='bg-sky-500 text-white font-semibold text-lg rounded-lg w-[20vw] py-2' type="submit">Login</button>
        </form>
        <div className='flex flex-col gap-2 font-semibold items-center'>
          <p>or</p>
          <GoogleLoginComponent />
        </div>
        <div className='text-black text-md font-semibold'>
          Don't have an Account? <Link to={'/signup'} className='text-sky-500 underline'>SignUp</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
