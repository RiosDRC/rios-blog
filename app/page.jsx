import BlogList from './components/BlogList'

export default function Home({ searchParams }) {

  return (
    <main className='mx-[15%] md:mx-[5%] mt-8 mb-14'>      
      <BlogList cat={searchParams.cat}/>
    </main>
  )
}
