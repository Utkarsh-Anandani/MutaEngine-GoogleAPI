import React from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const ResetPass = () => {
    const [OTP, setOTP] = useState('');
    const [newPass, setNewPass] = useState('');
    const [redirect, setredirect] = useState(false);

    const URL = window.location.href

    const email = URL.split('/reset-password/')[1];

    const resetPassword = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://muta-engine-google-api-backend.vercel.app/reset-password/${email}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({ password: newPass, otp: OTP }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status === 200 || response.status === 201) {
            alert('Password changed Successfully')
            setredirect(true);
        }
        else {
            alert('Failed Try Again')
        }
    }

    if (redirect) {
        return <Navigate to={`/login`} />
    }

    return (
        <main className='w-screen h-screen flex justify-center items-center'>
            <div className='bg-white w-[30vw] h-[55vh] rounded-3xl shadow-xl flex flex-col items-center gap-14 py-10'>
                <h1 className='text-4xl text-sky-500 font-bold'>Forgot Password</h1>
                <form className='flex flex-col gap-5' onSubmit={resetPassword}>
                    <input className='border-black border-2 rounded-md w-[20vw] px-2 py-1' value={OTP} type="number" name='otp' placeholder='Enter OTP (6 digits)' onChange={
                        (e) => {
                            setOTP(e.target.value);
                        }
                    } />
                    <input autoComplete='true' className='border-black border-2 rounded-md w-[20vw] px-2 py-1' value={newPass} type="password" name='pass' placeholder='New Password' onChange={
                        (e) => {
                            setNewPass(e.target.value);
                        }
                    } />
                    <button className='bg-sky-500 text-white font-semibold text-lg rounded-lg w-[20vw] py-2' type="submit">Set new Password</button>
                </form>
                <div className='text-black text-md font-semibold'>
                    Didn't got OTP? <Link to={'/forgot-password'} className='text-sky-500 underline'>Resend</Link>
                </div>
            </div>
        </main>
    )
}

export default ResetPass
