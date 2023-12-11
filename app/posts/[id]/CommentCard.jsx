"use client"

import React, { useContext, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Edit from '../../img/edit.png'
import Delete from '../../img/delete.png'
import axios from 'axios'
import API_BASE_URL from '@/app/apiConfig'
import { AuthContext } from '@/app/context/authContext'

export default function CommentCard({comment, post}) {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(comment.comment)


    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${API_BASE_URL}/comments/${post.id}/${comment.id}`, {
                    headers: {
                        'Authorization': currentUser.token
                    }
                })
                router.refresh();
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/comments/update/${comment.id}`, {
                comment: text
            },
            {
                headers: {
                    'Authorization': currentUser.token
                }
            })
            router.refresh();
            setIsEditing(false);
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="flex flex-col w-full p-2 bg-white relative">
        <h4 className='text-[14px] font-bold'>{comment.username}</h4>
        {!isEditing && (
            <p className='text-[15px]'>{comment.comment}</p>
        )}
        {isEditing && (
            <form onSubmit={handleEdit} className='w-full flex gap-1'>
                <input className='flex-1 border-[1px] border-teal p-1' type="text" value={text} onChange={e => setText(e.target.value)} required/>
                <button className='postButton'>Save</button>
            </form>
        )}
        <p className='text-[13px] text-gray-700'>{moment(comment.date).fromNow()}</p>
        { currentUser?.username === comment?.username ?
            <div className="flex gap-1 top-1 right-1 absolute">
                <Image
                    className='cursor-pointer hover:scale-[1.2] duration-[0.3s]'
                    src={Edit}
                    alt='edit'
                    width={50}
                    height={50}
                    style={{width: '20px', height: '20px', objectFit: 'cover'}}
                    quality={100}
                    onClick={() => setIsEditing(prev => !prev)}
                />
                <Image
                    onClick={handleDelete}
                    className='cursor-pointer hover:scale-[1.2] duration-[0.3s]'
                    src={Delete}
                    alt='edit'
                    width={50}
                    height={50}
                    style={{width: '20px', height: '20px', objectFit: 'cover'}}
                    quality={100}
                />
            </div>
        : ''}
    </div>
  )
}
