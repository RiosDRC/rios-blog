import DOMPurify from "isomorphic-dompurify"
import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({blogs}) {

  const Text = ({text}) =>{
    const clean = DOMPurify.sanitize(text.substr(0, 255) + '...')
    return (
      <div className='text-[18px] max-w-80% mb-5'
        dangerouslySetInnerHTML={{
          __html: clean
        }}
      ></div>
    )
  }

  return (
    <div className="home__blogList flex flex-col gap-[6rem]">
      {blogs.map((blog) => (
        <div key={blog.id} className='flex md:flex-col-reverse md:gap-8 md:items-center font-sans gap-[10%]'>
            <div className="cardText flex-[1] flex flex-col md:max-w-[80vw]">
                <h3 className='text-[2rem] font-[500] leading-[1.2] md:self-center'>{blog.title}</h3>
                <Text text={blog.desc}/>
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

      {blogs.length === 0 && (
        <h3 className='text-sans text-center text-[22px] my-[30vh]'>No posts here yet!</h3>
      )}
    </div>
  )
}
