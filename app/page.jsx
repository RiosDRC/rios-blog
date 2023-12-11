"use client"
import { useEffect, useState } from 'react'
import API_BASE_URL from './apiConfig'
import BlogList from './components/BlogList'
import axios from 'axios'


export default function Home() {
  const [blogs, setBlogs] = useState([])
  
  async function getBlogs() {
    try {
      const res = await axios(API_BASE_URL + '/posts')
      setBlogs(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogs();
  }, [])
  return (
    <main className='mx-[15%] md:mx-[5%] mt-8 mb-14'>      
      <BlogList blogs={blogs} />
    </main>
  )
}
