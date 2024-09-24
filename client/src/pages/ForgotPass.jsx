import React from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const ForgotPass = () => {
    const [redirect, setredirect] = useState(false);
    const [email, setemail] = useState('');

    const sendOTP = async (e) => {
        e.preventDefault();
        const response = await fetch('https://muta-engine-google-api-backend.vercel.app/forgot-password', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status === 200 || response.status === 201) {
            alert('OTP sent with email')
            setredirect(true);
        }
        else {
            alert('Email not registered')
        }
    }

    if (redirect) {
        return <Navigate to={`/reset-password/${email}`} />
    }

    return (
        <main className='w-screen h-screen flex justify-center items-center'>
            <div className='bg-white w-[30vw] h-[50vh] rounded-3xl shadow-xl flex flex-col items-center gap-14 py-10'>
                <h1 className='text-4xl text-sky-500 font-bold'>Forgot Password</h1>
                <form className='flex flex-col gap-5' onSubmit={sendOTP}>
                    <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' type="email" name='email' placeholder='E-Mail' onChange={
                        (e) => {
                            setemail(e.target.value);
                        }
                    } />
                    <button className='bg-sky-500 text-white font-semibold text-lg rounded-lg w-[20vw] py-2' type="submit">Send OTP</button>
                </form>
                <div className='text-black text-md font-semibold'>
                    Don't have an Account? <Link to={'/signup'} className='text-sky-500 underline'>SignUp</Link>
                </div>
            </div>
        </main>
    )
}

export default ForgotPass
