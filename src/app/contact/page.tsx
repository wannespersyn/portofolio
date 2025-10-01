import React from 'react'

const page = () => {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800'>
      <h1 className='text-4xl font-bold text-white md:text-6xl lg:text-7xl'>Contact</h1>
      <p className='mt-4 text-lg text-gray-300 md:text-xl lg:text-2xl max-w-2xl text-center px-4'>Feel free to reach out to me via email at <a href="mailto:wannes@example.com" className='text-blue-400 hover:underline'>wannes@example.com</a></p>
    </section>
  )
}

export default page