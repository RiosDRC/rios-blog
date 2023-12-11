import CatContainer from './CatContainer';

export async function generateStaticParams() {
    const categories = ['art', 'technology', 'science', 'cinema', 'design', 'food']
    return categories.map(cat => ({
        cat: cat
    }))
}

export default async function Categories({params}) {
  const cat = params.cat
  
  return (
    <main className='mx-[15%] md:mx-[5%] mt-8 mb-14'>      
      <CatContainer cat={cat}/>
    </main>
  )
}