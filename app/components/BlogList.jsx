"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import API_BASE_URL from '../apiConfig'
import axios from 'axios'
import Link from 'next/link'
import Loading from '../loading'

export default function BlogCard(cat) {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const category = typeof cat.cat !== 'undefined' ? '/?cat=' + cat.cat : ''

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true)
        const res = await axios(API_BASE_URL + '/posts' + category)
        setIsLoading(false)
        if (res.data.length === 0) {
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
        }
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [cat])

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home__blogList flex flex-col gap-[6rem]">
      {blogs.map((blog) => (
        <div key={blog.id} className='flex md:flex-col-reverse md:gap-8 md:items-center font-sans gap-[10%]'>
            <div className="cardText flex-[1] flex flex-col md:max-w-[80vw]">
                <h3 className='text-[2rem] font-[500] leading-[1.2] md:self-center'>{blog.title}</h3>
                <p className='text-[18px] max-w-80% mb-5'>{getText(blog.desc.substr(0, 355))}...</p>
                <Link href={`/posts/${blog.id}`}><button className='primaryButton md:self-center'>Read More</button></Link>
            </div>

            <div className="cardImage flex-[1] max-w-[400px] md:max-w-[90vw] max-h-[400px] relative">
                {blog.img && (
                  <Image
                    src={blog.img}
                    alt=''
                    style={{height: 'auto', width: '400px', maxHeight: '400px', objectFit: 'cover'}}
                    width={400}
                    height={400}
                    blurDataURL={blog.img}
                    placeholder='blur'
                    className='shadow-imageBox'
                  />
                )}
            </div>
        </div>
      ))}
      {isLoading && (
        <Loading />
      )}
      {isEmpty && (
        <h3 className='text-sans text-center text-[22px] my-[30vh]'>No posts here yet!</h3>
      )}
    </div>
  )
}
