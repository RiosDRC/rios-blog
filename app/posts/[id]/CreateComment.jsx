"use client"

import API_BASE_URL from '@/app/apiConfig';
import { AuthContext } from '@/app/context/authContext';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function CreateComment({id}) {
    const router = useRouter();
    const { currentUser, setLoginView } = useContext(AuthContext);
    const [input, setInput] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/comments/${id}`,
                {
                    comment: input,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    headers: {
                        'Authorization': currentUser.token
                    }
                }
            )
            router.refresh();
            setInput('');
        } catch(err) {
            console.log(err)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-[3px] w-full'>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} required className='flex-[1] ss:w-[70%] px-2'/>
        {currentUser ?
            <button className='postButton'>Post</button>
            : <span className="postButton" onClick={() => setLoginView(true)}>Login</span>
        }
    </form>
  )
}
