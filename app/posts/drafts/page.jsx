"use client"

import API_BASE_URL from '@/app/apiConfig'
import { AuthContext } from '@/app/context/authContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import Edit from '../../img/edit.png'
import Delete from '../../img/delete.png'
import Loading from '@/app/loading'

export default function Drafts() {
    const { currentUser, setTempPost } = useContext(AuthContext);
    const router = useRouter();
    const [drafts, setDrafts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function loadDrafts() {
        try {
            const res = await axios(API_BASE_URL + '/posts/drafts', {
                headers: {
                    'Authorization': currentUser?.token
                }
            })
            setIsLoading(false)
            setDrafts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    function handleEdit(post) {
        setTempPost(post)
        router.push('/posts/write?edit=' + post.id)
    }

    async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this post?')) {        
            try {
                await axios.delete(API_BASE_URL + '/posts/' + id, {
                    headers: {
                        'Authorization': currentUser.token
                    }
                })

                loadDrafts();
            } catch (err) {
                console.log(err)
            }
        }
    }
    
    useEffect(() => {
        if (!currentUser) {
            router.push('/posts/write')
        } else {
            loadDrafts();
        }
    }, [currentUser]);

  return (
    <section className='w-[70%] md:w-[90%] mx-[15%] md:mx-[5%] my-4 flex flex-col'>
        <h1 className='text-[32px] text-gray-600 self-center'>Drafts</h1>
        <div className="flex gap-2 flex-wrap justify-center w-full">
            { drafts.map(post => (
                <div
                    className="flex-[45%] flex flex-col justify-center gap-1 items-center xxs:min-w-[290px] min-w-[350px] max-w-[500px] p-4 border-[1px] border-teal shadow-xl relative"
                    key={post.id}
                >
                    {post.img && 
                        <Image
                            className='xxs: w-[250px] xxs:h-[200px]'
                            src={post.img}
                            alt=''
                            height={300}
                            width={300}
                        />
                    }
                    <h3 className='self-center text-[20px]'>{post.title}</h3>
                    <p>{getText(post.desc).substr(0, 200)}...</p>
                    
                    <div className="flex gap-1 absolute top-1 right-1">
                        <Image
                            onClick={() => handleEdit(post)}
                            className='hover:scale-[1.1] duration-[.2s] cursor-pointer' 
                            src={Edit}
                            alt=''
                            height={30}
                            width={30}
                            style={{ width: '25px', height: '25px'}}
                        />
                        <Image
                            onClick={() => handleDelete(post.id)}
                            className='hover:scale-[1.1] duration-[.2s] cursor-pointer' 
                            src={Delete}
                            alt=''
                            height={30}
                            width={30}
                            style={{ width: '25px', height: '25px'}}
                        />
                    </div>
                </div>
            ))}
        </div>

        { !isLoading && drafts.length === 0 ?
            <div className='flex flex-col items-center gap-2 my-[20vh]'>
                <h3 className='text-[24px]'>There are no drafts yet!</h3>
                <p>Do you want to start writing?</p>
                <Link href={"/posts/write"} className='text-teal underline'>Click here</Link>
            </div>
        : ''}

        {isLoading && (
            <Loading />
        )}
    </section>
  )
}
