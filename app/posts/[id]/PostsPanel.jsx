import API_BASE_URL from "@/app/apiConfig"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"


async function fetchPosts(cat) {
    const res = await axios(`${API_BASE_URL}/posts/?cat=${cat}`)
    return res.data
}

export default async function PostsPanel({post}) {
    const posts = await fetchPosts(post.cat)
    const filteredPost = posts.filter(element => element.id !== post.id).slice(0, 3)
  return (
    <div className='flex flex-col items-center justify-center gap-6'>
        {filteredPost.map((post) => (
            <div className="flex flex-col md:items-center md:justify-center" key={post.id}>
                { post.img &&
                    <Image
                        src={post.img}
                        alt=""
                        width={400}
                        height={400}
                        style={{width: '100%', height: 'auto', maxHeight: '300px', maxWidth: '400px', objectFit: 'cover'}}
                    />
                }    
                <h2 className="text-gray-700 text-[28px]">{post.title}</h2>
                <Link href={`/posts/${post.id}`} className="primaryButton">Read More</Link>
            </div>
        ))}
        {filteredPost.length === 0 &&
            <h3 className="text-[20px]">No similar posts so far.</h3>
        }
    </div>
  )
}
