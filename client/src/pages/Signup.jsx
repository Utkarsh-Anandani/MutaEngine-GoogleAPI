import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReCAPTCHA } from 'react-google-recaptcha';

const Signup = ({setToken, setUserDetails}) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [redirect, setredirect] = useState(false);
  const [captcha, setcaptcha] = useState(null);

  const signup = async (e) => {
    e.preventDefault();
    const response = await fetch('https://muta-engine-google-api-backend.vercel.app/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.status === 200 || response.status === 201) {
      const res = await response.json();
      setToken(res.token);
      setUserDetails(username)
      alert('Registeration Successful')
      setredirect(true);
    }
    else {
      alert('Registeration Failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <div className='bg-white w-[30vw] h-[70vh] rounded-3xl shadow-xl flex flex-col items-center gap-16 py-10'>
        <h1 className='text-4xl text-sky-500 font-bold'>Create an Account</h1>
        <form className='flex flex-col gap-5' onSubmit={signup}>
          <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' type="text" name='username' value={username} placeholder='Username' onChange={
            (e) => {
              setusername(e.target.value);
            }
          } />
          <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' type="email" name='email' value={email} placeholder='E-Mail' onChange={
            (e) => {
              setemail(e.target.value);
            }
          }/>
          <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' type="password" name='pass' value={password} placeholder='Password' onChange={
            (e) => {
              setpassword(e.target.value);
            }
          }/>
          <ReCAPTCHA 
          sitekey='6Lc0m0sqAAAAAKvaAWqZBUAiNtulJg2GGla50FAm'
          onChange={(val) => setcaptcha(val)}
          />
          <button className='bg-sky-500 text-white font-semibold text-lg rounded-lg w-[20vw] py-2' type="submit">Signup</button>
        </form>
        <div className='text-black text-md font-semibold'>
          Already have an Account? <Link to={'/login'} className='text-sky-500 underline'>Login</Link>
        </div>
      </div>
    </main>
  )
}

export default Signup
