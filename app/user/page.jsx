"use client"

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Image from 'next/image'
import axios from 'axios'
import API_BASE_URL from '../apiConfig'
import { notFound } from 'next/navigation'
import { toast } from 'react-toastify'

export default function User() {
    const { currentUser, setCurrentUser, notify } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [inputs, setinputs] = useState({
        username: '',
        email: '',
        old_password: '',
        new_password: '',
        conf_password: '',
        img: ''
    })

    if (!currentUser) notFound();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file)
            const res = await axios.post(API_BASE_URL + '/upload', formData)
            return res.data.sharedLink
        } catch(err) {
            setIsUploading(false)
            console.log(err)
        }
    }

    const handleChange = e => {
        setinputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (inputs.old_password !== '') {
            setIsUploading(true);
            const img = file ? await upload() : inputs.img;
            try {
                const res = await axios.put(API_BASE_URL + '/users/updateInfo', {
                        ...inputs,
                        new_password: inputs.new_password !== '' ? inputs.new_password : inputs.old_password,
                        img
                    }, {
                        headers: {
                            'Authorization': currentUser.token
                        }
                    }
                )
                setIsUploading(false)
                notify('Info updated successfully!')
                if (res.status === 200) {
                    setCurrentUser({
                        ...currentUser,
                        img,
                        email: inputs.email,
                        username: inputs.username
                    })
                }
            } catch (err) {
                console.log(err)
                toast.error(err.response.data)
                setIsUploading(false)
            }
        }
    }

    useEffect(() => {
        if (currentUser) {
            setinputs({
                username: currentUser?.username,
                email: currentUser?.email,
                old_password: '',
                new_password: '',
                conf_password: '',
                img: currentUser?.img
            })
        }
    }, [currentUser])
  return (
    <main className='mx-[15%] md:mx-[5%] mt-1 mb-4 w-[70%] md:w-[90%] flex flex-col items-center'>
        <h1 className='mb-2 text-[24px]'>User Info</h1>

        <div className="flex sm:flex-col-reverse gap-4 w-full">
            <form onSubmit={handleSubmit}
            className="flex-[1] flex flex-col items-center gap-2 p-2 border-[1px] border-gray-400"
            >
                <span>Username</span>
                <input
                    className='border-b-[1px] border-teal p-1 mb-4'
                    type="text"
                    name='username'
                    value={inputs.username}
                    onChange={handleChange}
                    required
                />
                <span>Email</span>
                <input
                    className='border-b-[1px] border-teal p-1 mb-4'
                    type="email"
                    name='email'
                    value={inputs.email}
                    onChange={handleChange}
                    required
                />
                <span>Current Password</span>
                <input
                    className='border-b-[1px] border-teal p-1 mb-4'
                    type="password"
                    name='old_password'
                    value={inputs.old_password}
                    onChange={handleChange}
                    required
                />
                <span>New Password</span>
                <input
                    className='border-b-[1px] border-teal p-1 mb-4'
                    type="password"
                    name='new_password'
                    value={inputs.new_password}
                    onChange={handleChange}
                />
                <span>Confirm Password</span>
                <input
                    className='border-b-[1px] border-teal p-1 mb-4'
                    type="password"
                    name='conf_password'
                    value={inputs.conf_password}
                    onChange={handleChange}
                />
                <button
                    disabled={isUploading || inputs.new_password !== inputs.conf_password}
                    className='authButton'
                >{isUploading ? 'Updating Info...' : 'Save Changes'}</button>
            </form>

            <div className="flex-[1] flex flex-col gap-4 items-center justify-center p-4 border-[1px] border-gray-400 relative">
                <div className="flex w-full justify-between absolute top-1 p-4">
                    <p
                        className='underline hover:text-teal cursor-pointer'
                        onClick={() => {setFile(null), setinputs(prev => ({...prev, img: currentUser.img}))}}
                    >Reset</p>
                    <p
                        className='underline hover:text-teal cursor-pointer'
                        onClick={() => {setFile(null), setinputs(prev => ({...prev, img: ''}))}}
                    >Clear</p>
                </div>

                <div className="border-[1px] border-teal w-[250px] h-[250px] rounded-full overflow-hidden shadow-md bg-lightBlue">
                    { !file && inputs?.img ?
                        <Image
                            src={inputs.img}
                            alt=''
                            width={250}
                            height={250}
                            quality={100}
                            style={{width: '250px', height: '250px', objectFit: 'cover'}}
                        />
                    :''}
                    { file &&
                        <Image
                            src={URL.createObjectURL(file)}
                            alt=''
                            width={250}
                            height={250}
                            quality={100}
                            style={{width: '250px', height: '250px', objectFit: 'cover'}}
                        />
                    }
                </div>
                <input type="file" id='file' onChange={e => setFile(e.target.files[0])} className='hidden'/>
                <label htmlFor="file" className='cursor-pointer hover:text-teal'>Upload Image</label>
            </div>
        </div>
    </main>
  )
}
