import axios from 'axios'
import API_BASE_URL from '../apiConfig';
import BlogList from '../components/BlogList'

export async function generateStaticParams() {
    const categories = ['art', 'technology', 'science', 'cinema', 'design', 'food']
    return categories.map(cat => ({
        cat: cat
    }))
}

async function getBlogs(cat) {
  try {
    const res = await axios(API_BASE_URL + '/posts/?cat=' + cat)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default async function Categories({params}) {
  const blogs = await getBlogs(params.cat);
  
  return (
    <main className='mx-[15%] md:mx-[5%] mt-8 mb-14'>      
      <BlogList blogs={blogs} />
    </main>
  )
}