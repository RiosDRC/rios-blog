import { notFound } from 'next/navigation'
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import axios from 'axios';
import moment from 'moment'
import API_BASE_URL from '@/app/apiConfig';

import CreateComment from './CreateComment';
import Desc from './Desc';
import PostOptions from './PostOptions';
import PostsPanel from './PostsPanel';
import CommentCard from './CommentCard';

export const dynamicParams = true;

export async function generateStaticParams() {
    const res = await axios(API_BASE_URL + '/posts');
    const posts = res.data
    return posts.map((post) => ({
        id: post.id.toString()
    }))
}

async function fetchPost(id) {
    const res = await axios(`${API_BASE_URL}/posts/${id}`)

    if (!res.data) {
        notFound();
    }
    res.data.desc = DOMPurify.sanitize(res.data.desc);
    return res.data
}

async function fetchComments(id) {
    const res = await axios(`${API_BASE_URL}/comments/${id}`)
    return res.data
}

export default async function Single({params}) {
    const post = await fetchPost(params.id)
    const comments = await fetchComments(params.id)

  return (
    <section className='px-[15%] md:px-[5%] flex lg:flex-col gap-8 mb-4'>
        <div className="flex-[3] flex flex-col">
            { post.img &&
                <Image
                    src={post.img}
                    alt=''
                    height={700}
                    width={1000}
                    quality={100}
                    style={{maxWidth: '100%', width: 'auto', height: '300px', objectFit: 'cover'}}
                    blurDataURL={post.img}
                    placeholder='blur'
                />
            }

            <div className="postOptions flex ss:flex-col w-full relative justify-between ss:items-start mt-[2rem]">
                <div className="creatorInfo flex gap-2">
                    { post.userImg &&
                        <Image
                            src={post.userImg}
                            alt=''
                            width={50}
                            height={50}
                            quality={100}
                            style={{objectFit: 'cover', width: '50px', height: '50px', borderRadius: '50%'}}
                        />
                    }
                    <div className="flex flex-col">
                        <h5 className='text-[17px] font-bold'>{post.username}</h5>
                        <p>{moment(post.date).fromNow()}</p>
                    </div>
                </div>

                <PostOptions post={post} />
            </div>

            <h2 className='mt-6 text-[42px]'>{post.title}</h2>
            <Desc element={post.desc} />

            <div className="flex flex-col gap-2 mt-4 p-2 rounded-md bg-lightBlue">
                <h2>Comments</h2>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <CommentCard comment={comment} post={post}/>
                    </div>
                ))}
                <CreateComment id={params.id}/>
            </div>
        </div>

        <div className="flex-[1] flex flex-col">
            <h2 className='text-teal text-[1.5rem] mb-4'>Posts you might also like</h2>
            <PostsPanel post={post} />
        </div>
    </section>
  )
}
