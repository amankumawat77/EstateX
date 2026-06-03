import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const About = () => {
  return (
    <div className="bg-theme-bg min-h-screen pt-24 pb-12">
      <Head>
        <title>{'EstateX - About Us'}</title>
        <meta name="description" content={'About EstateX - Real Estate in Jaipur'} />
      </Head>
      <div className="max-w-4xl mx-auto md:mt-10 mt-5 rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100">
        <div className="md:p-16 p-8 flex justify-center items-center flex-col text-center">
            <Link legacyBehavior href={'/'}>
                <a className="flex title-font font-bold items-center text-gray-900 cursor-pointer mb-6">
                    <span className="text-5xl text-theme-orange">Estate</span><span className="text-5xl">X</span>
                </a>
            </Link>
            <h1 className='text-4xl font-sans font-extrabold text-gray-900 mb-6'>Welcome to EstateX</h1>
            <p className='text-lg text-gray-600 md:px-12 leading-relaxed mb-8'>
                EstateX is your premier destination for finding the perfect plot of land in Jaipur and surrounding colonies. We specialize in dealing exclusively with JDA approved, Nagarpalika approved, Housing Board plots, and RERA approved lands, ensuring complete peace of mind for our buyers.
                <br /><br />
                Whether you're looking to build your dream home or make a smart investment, our curated selection of properties offers unmatched potential. Let us help you find the right foundation for your future.
            </p>
            <Link legacyBehavior href="/shop">
                <button className="text-white bg-theme-orange border-0 py-3 px-8 focus:outline-none hover:bg-orange-600 rounded-lg text-lg font-semibold shadow-md transition-colors">
                    Explore Properties
                </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default About