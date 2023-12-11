import Image from 'next/image'
import Logo from '../img/logo.png'

 export default function Footer () {
  return (
    <div className='flex items-center xxs:gap-6 md:mx-[5%] mx-[15%] w-[70%] md:w-[90%] p-4 justify-between bg-lightBlue'>
        <Image 
            src={Logo}
            alt='Logo'
            width={150}
            height={70}
            style={{width: '150px', height: 'auto'}}
            sizes='(max-width: 350px) 50px, '
        />
        <p className='text-[13px]'>Made with 🖤 in <span className='font-bold'>Next.js</span></p>
    </div>
  )
}
