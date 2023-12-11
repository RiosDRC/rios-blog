"use client"

import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Link from 'next/link';

export default function Login () {
    const { setLoginView, login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({username: '', password: ''})

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(inputs)
        setInputs({username: '', password: ''})
    }
  return (
    <section className='absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#ffffffaa] shadow-lg' onClick={() => setLoginView(false)}>
        <div onClick={e => e.stopPropagation()}
        className='absolute bottom-[50%] right-[50%] translate-y-2/4 translate-x-2/4 w-[350px] bg-lightBlue p-[2rem]'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 bg-white p-[2rem]'
                >
                <h2 className='text-teal text-[26px] self-center'>Login</h2>
                <input type="text"
                placeholder='Enter username'
                    className='p-2 border-b-[1px] border-gray-400'
                    required
                    name='username'
                    value={inputs.username}
                    onChange={handleChange}
                    />
                <input type="password"
                    placeholder='Enter password'
                    className='p-2 border-b-[1px] border-gray-400'
                    required
                    name='password'
                    value={inputs.password}
                    onChange={handleChange}
                    />
                <button className='authButton self-center'>Login</button>
                <p>You do not have an account?</p>
                <Link href='/register' onClick={() => setLoginView(false)} className='underline text-blue-700 self-center mt-[-1rem]'>Register</Link>
            </form>

            <h1 onClick={() => setLoginView(false)} className='absolute right-1 top-1 cursor-pointer'>Exit</h1>
        </div>
    </section>
  )
}
