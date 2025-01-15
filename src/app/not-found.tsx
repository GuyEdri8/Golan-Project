import Image from 'next/image'

export const metadata = {
    title: "Page Not found"
}
export default function NotFound() {
  return (
    <div className='px-2 w-full'>
        <div className='mx-auto py-4 flex flex-col justify-center items-center'>
        <h2 className='text-2xl'>Page Not Found</h2>
            <Image
            className='m-0 rounded-xl'
            src={'/images/not-found-1024x1024.png'}
            width={300}
            height={300}
            sizes='300px'
            alt='Page not Found'
            title='Page not Found'
            priority={true}
            />
        </div>
    </div>
  )
}