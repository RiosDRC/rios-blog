"use client"

import { AuthContext } from "@/app/context/authContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"
import API_BASE_URL from "@/app/apiConfig"

import Like from '../../img/like.png'
import Edit from '../../img/edit.png'
import Delete from '../../img/delete.png'
import Link from "next/link"

export default function Likes({post}) {
    const router = useRouter();
    const { currentUser, setTempPost } = useContext(AuthContext);
    const [likes, setLikes] = useState({});
    const [isLiking, setIsLiking] = useState(false);

    const fetchLikes = async () => {
        const res = await axios(`${API_BASE_URL}/posts/likes/${post.id}/${currentUser ? currentUser.id : 0}`)
        setLikes(res.data)
    }

    const handleLike = async () => {
        if (!isLiking) {
            setIsLiking(true)
            try {
                const res = await axios.put(`${API_BASE_URL}/posts/likes/${post.id}`, {}, {
                    headers: {
                        'Authorization': currentUser.id
                    }
                })
                if (res.status === 200) {
                    fetchLikes();
                }
            } catch (err) {
                console.log(err)
            }
            setIsLiking(false)
        }
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const res = await axios.delete(`${API_BASE_URL}/posts/${post.id}`, {
                    headers: {
                        'Authorization': currentUser.token
                    }
                })
                if (res.status === 200) router.push('/')
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        fetchLikes();
    }, [])
    
  return (
    <div className="flex flex-col items-end ss:mt-2">
        { currentUser && currentUser.username === post.username ?
            <div className="flex gap-2 ss:absolute top-0 right-0">
                <Link href={`/posts/write?edit=${post.id}`} onClick={() => setTempPost(post)}>
                    <Image
                        className='hover:scale-[1.2] duration-[0.3s] cursor-pointer'
                        src={Edit}
                        alt=''
                        height={20}
                        width={20}
                        style={{width: 'auto', height: '25px'}}
                        quality={100}
                    />
                </Link>
                <Image
                    className='hover:scale-[1.2] duration-[0.3s] cursor-pointer'
                    src={Delete}
                    alt=''
                    height={20}
                    width={20}
                    style={{width: 'auto', height: '25px'}}
                    quality={100}
                    onClick={handleDelete}
                />
            </div>
        : ''}

        <div className="flex gap-1">
            {currentUser &&
                <Image
                    className={`hover:scale-[1.2] duration-[0.3s] cursor-pointer ${!likes.liked && 'sepia'}`}
                    src={Like}
                    alt=''
                    width={50}
                    height={50}
                    style={{width: 'auto', height: '25px'}}
                    quality={100}
                    onClick={handleLike}
                />
            }
            <p>{likes.count} {likes.count === 1 ? 'person likes' : 'people like'} this post.</p>
        </div>
    </div>
  )
}
