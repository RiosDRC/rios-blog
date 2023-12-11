"use client"

import { useEffect, useState } from 'react'
import BlogList from '../components/BlogList'
import axios from 'axios'
import API_BASE_URL from '../apiConfig'
import Loading from '../loading'

export default function CatContainer({cat}) {
    const [blogs, setblogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    async function getBlogs() {
        try {
          const res = await axios(API_BASE_URL + '/posts/?cat=' + cat)
          setIsLoading(false)
          setblogs(res.data)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
      getBlogs();
    }, [])

  return (<>
  {isLoading ?
    <Loading />
    :
    <BlogList blogs={blogs}/>
  }
  </>
  )
}
