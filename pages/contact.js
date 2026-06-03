import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md'

const Contact = () => {
    return (
        <div className="bg-theme-bg min-h-screen pt-24 pb-12">
            <Head>
                <title>{'EstateX - Contact Us'}</title>
                <meta name="description" content={'Contact EstateX'} />
            </Head>
            <div className="max-w-5xl mx-auto md:mt-10 mt-5 rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100 p-8 md:p-16">
                <div className="flex flex-col items-center text-center mb-12">
                    <Link legacyBehavior href={'/'}>
                        <a className="flex title-font font-bold items-center text-gray-900 cursor-pointer mb-6">
                            <span className="text-5xl text-theme-orange">Estate</span><span className="text-5xl">X</span>
                        </a>
                    </Link>
                    <h1 className='md:text-4xl text-3xl font-sans font-extrabold text-gray-900 mb-4'>Let's talk about your future!</h1>
                    <p className='text-lg text-gray-600 max-w-2xl'>
                        If you have any questions regarding our available lands, plotting details, or want to schedule a site tour, feel free to call, email, or WhatsApp our expert real estate agents.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-orange-100 text-theme-orange rounded-full flex items-center justify-center mb-6">
                            <MdLocationOn className="text-3xl" />
                        </div>
                        <h3 className='font-bold text-xl text-gray-900 mb-4'>Corporate Office</h3>
                        <p className="text-gray-600">EstateX Real Estate Solutions</p>
                        <p className="text-gray-600">123 Real Estate Tower, Tonk Road</p>
                        <p className="text-gray-600">Jaipur, Rajasthan 302015</p>
                    </div>
                    
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-orange-100 text-theme-orange rounded-full flex items-center justify-center mb-6">
                            <MdPhone className="text-3xl" />
                        </div>
                        <h3 className='font-bold text-xl text-gray-900 mb-4'>Customer Support</h3>
                        <p className="text-gray-600 flex items-center mb-2"><MdPhone className="text-theme-orange mr-2" /> +91 98765 43210</p>
                        <p className="text-gray-600 flex items-center mb-2"><MdEmail className="text-theme-orange mr-2" /> care@estatex.com</p>
                        <p className="text-gray-600 font-medium mt-2">Mon-Sat: 9 AM - 6 PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact