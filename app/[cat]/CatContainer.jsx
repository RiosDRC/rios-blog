"use client"

import { useEffect, useState } from 'react'
import BlogList from '../components/BlogList'
import axios from 'axios'
import API_BASE_URL from '../apiConfig'

export default function CatContainer({cat}) {
    const [blogs, setblogs] = useState([])
    async function getBlogs() {
        try {
          const res = await axios(API_BASE_URL + '/posts/?cat=' + cat)
          setblogs(res.data)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
      getBlogs();
    }, [])

  return (
    <BlogList blogs={blogs}/>
  )
}
