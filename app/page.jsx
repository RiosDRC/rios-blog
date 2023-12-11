import API_BASE_URL from './apiConfig'
import BlogList from './components/BlogList'
import axios from 'axios'

async function getBlogs() {
  try {
    const res = await axios(API_BASE_URL + '/posts')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <main className='mx-[15%] md:mx-[5%] mt-8 mb-14'>      
      <BlogList blogs={blogs} />
    </main>
  )
}
