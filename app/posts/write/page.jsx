"use client"

import API_BASE_URL from "@/app/apiConfig"
import { AuthContext } from "@/app/context/authContext"
import axios from "axios"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Write({ searchParams }) {
  const { currentUser, setLoginView, tempPost, setTempPost } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(tempPost?.title || '')
  const [text, setText] = useState(tempPost?.desc || '')
  const [cat, setCat] = useState(tempPost?.cat || '')
  const [prevImg, setPrevImg] = useState(tempPost?.img || '')
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTempPost(null);
  }, [])

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post(API_BASE_URL + "/upload", formData)
      return res.data.sharedLink
    } catch {
      console.log(err)
    }
  }

  const handlePublish = async (action) => {
    if (title === '' || text === '' || cat === '') {
      alert('There is missing info!')
    } else {
      setIsUploading(true);
      const imgUrl = file ? await uploadImg() : prevImg;
      try {
          const res = searchParams?.edit ?
           await axios.put(`${API_BASE_URL}/posts/${searchParams.edit}`, {
              title,
              desc: text,
              img: imgUrl,
              cat,
              status: action
              }, {
              headers: {
                'Authorization': currentUser.token
              }
            })

          : await axios.post(API_BASE_URL + '/posts/', {
            title,
            desc: text,
            img: imgUrl,
            cat,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            status: action
            }, {
              headers: {
                'Authorization': currentUser.token
              }
            })

        console.log(res.data)
        router.push('/')

      } catch (err) {
        setIsUploading(false);
        console.log(err)
      }
    }
  }

  return (
    <section className='flex sm:flex-col gap-4 mx-[15%] md:mx-[5%] w-[70%] md:w-[90%] my-[4rem]'>
        <div className='flex-[5] flex flex-col gap-4 relative'>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder='Title'
              className='border-[1px] border-gray-300 p-2'
            />
            {/* <ReactQuill theme='snow' value={text} onChange={setText} className='h-[280px] sm:h-[unset] text-black'/> */}
            <textarea
              cols="30"
              rows="13"
              onChange={e => setText(e.target.value)}
              value={text}
              className="border-[1px] p-2"
              />
            <p className={`absolute text-[12px] ${text.length <= 1000 ? 'text-gray-500' : 'text-red-600'} bottom-3 left-1`}>Remaning characters: {1000 - text.length}</p>
        </div>

        <div className="flex-[2] flex xs:flex-col sm:flex-row flex-col gap-4 text-gray-700">
          <div className="flex flex-col sm:flex-[2] border-[1px] gap-2 border-gray-300 p-2 relative">
            <h2 className='text-[20px]'>Publish</h2>
            { currentUser &&
              <Link href='/posts/drafts' className='text-[12px] underline hover:text-teal'>Drafts</Link>
            }
            <h3 className='text-[12px]'><span className='font-bold'>Status:</span> Draft</h3>
            <h3 className='text-[12px]'><span className='font-bold'>Visibility:</span> Public</h3>
            <input className='hidden' type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
            <label htmlFor="file" className={`text-[12px] underline hover:text-teal cursor-pointer ${file && 'text-teal'}`}>Upload image</label>
            { currentUser && !isUploading ?
              <div className="flex items-center justify-between">
                <button
                  className='text-[12px] text-teal p-1 border-[1px] border-teal hover:scale-[1.1] duration-[.3s]'
                  onClick={() => handlePublish('draft')}
                >Save as a draft</button>
                <button
                  className='text-[12px] text-white bg-teal p-1 border-[1px] border-teal hover:scale-[1.1] duration-[.3s]'
                  onClick={() => handlePublish('published')}
                >{searchParams?.edit ? 'Update' : 'Publish'}</button>
              </div>
            :
              <button
                className="text-[12px] text-teal p-1 border-[1px] border-teal w-max hover:bg-teal hover:text-white disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800"
                onClick={() => setLoginView(true)}
                disabled={isUploading}
                >{ isUploading ? 'Loading...': 'Login'}</button>
            }
            {file || prevImg !== '' ? 
              <div className='absolute top-6 right-4 flex flex-col items-center'>
                <Image
                  className='border-[1px] border-teal shadow-lg rounded-md'
                  src={file ? URL.createObjectURL(file) : prevImg}
                  alt='Uploaded'
                  width={100}
                  height={100}
                  style={{height: '100px', width: '100px', objectFit: 'cover'}}
                />
                <button className='text-[12px] underline' onClick={() => {setFile(null), setPrevImg('')}}>Delete picture</button>
              </div>
            : ''}
          </div>

          <div className="flex flex-col sm:flex-[1] border-[1px] gap-1 border-gray-300 p-2 relative">
            <h2 className='text-[20px]'>Category</h2>
            <div className="cat">
                <input type="radio" checked={cat === "art"} value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
                <input type="radio" checked={cat === "science"} value="science" id="science" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
                <input type="radio" checked={cat === "technology"} value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
                <input type="radio" checked={cat === "cinema"} value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
                <input type="radio" checked={cat === "design"} value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
                <input type="radio" checked={cat === "food"} value="food" id="food" onChange={e=>setCat(e.target.value)}/>
                <label htmlFor="food">Food</label>
            </div>            
          </div>
        </div>
    </section>
  )
}
