import loading from './img/loading.svg'
import Image from 'next/image'

export default function Loading() {
  return (
    <main className="text-center">
        <h2 className="text-primary">Loading...</h2>
        <p>Hopefully not for too long :)</p>
        <Image className='mx-auto mt-[2rem] rotate-center'
        src={loading}
        height={100}
        width={100}
        alt='Loading...'/>
    </main>
  )
}
