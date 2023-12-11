"use client"

import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useRouter } from 'next/navigation';

export default function Register() {
  const { setLoginView } = useContext(AuthContext);
  const router = useRouter();
  const [inputs, setInputs ] = useState({
    username: '',
    email: '',
    password: '',
    conf_password: ''
  })

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(API_BASE_URL + '/auth/register', inputs)
      router.push('/')
      toast(res.data)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data)
    }
  }

  return (
    <div className='mx-[15%] md:mx-[2%] w-[70%] md:w-[96%] py-[4.3rem] px-2'>
      <div className='xxs:p-4 p-8 mx-auto bg-lightBlue max-w-[350px]'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center p-4 w-full bg-white">
          <h1 className='text-teal text-[24px]'>Register</h1>
          <input
            className='p-2 border-b-[1px] border-gray-500'
            type="text"
            required
            value={inputs.username}
            name='username'
            onChange={handleChange}
            placeholder='Enter username'
          />
          <input
            className='p-2 border-b-[1px] border-gray-500'
            type="email"
            required
            value={inputs.email}
            name='email'
            onChange={handleChange}
            placeholder='Enter email'
          />
          <input
            className='p-2 border-b-[1px] border-gray-500'
            type="password"
            required
            value={inputs.password}
            name='password'
            onChange={handleChange}
            placeholder='Enter password'
          />
          <input
            className='p-2 border-b-[1px] border-gray-500'
            type="password"
            required
            value={inputs.conf_password}
            name='conf_password'
            onChange={handleChange}
            placeholder='Confirm password'
          />
          <button
            className="authButton"
            disabled={inputs.password === '' || inputs.password !== inputs.conf_password}
          >Register</button>
          <p>You already have an account?</p>
          <span
            className='underline text-teal hover:text-black cursor-pointer mt-[-10px]'
            onClick={() => setLoginView(true)}
          >Log In</span>
        </form>
      </div>
    </div>
  )
}
