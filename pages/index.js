/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MdVerified, MdLocationCity, MdSecurity } from 'react-icons/md'
import { AiTwotoneStar } from 'react-icons/ai'
import Product from '../models/Product';
import mongoose from "mongoose";

export default function Home({ products }) {
  return (
    <div className="bg-theme-bg">
      <Head>
        <title>EstateX - Buy Premium Plots in Jaipur</title>
        <meta name="description" content="Find JDA approved, Nagarpalika approved, Housing Board, and RERA approved plots in Jaipur and nearby colonies." />
      </Head>
      
      {/* Hero Section */}
      <div className='relative w-full h-[600px] mt-20 flex items-center justify-center overflow-hidden'>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" alt="Luxury Real Estate" className="absolute inset-0 w-full h-full object-cover" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Your Perfect Plot in Jaipur
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
            JDA Approved | Housing Board | RERA Registered | Nagarpalika Approved
          </p>
          
          <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <input type="text" placeholder="Enter Locality / Project / Society" className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-orange" />
            <Link legacyBehavior href="/shop">
              <button className="bg-theme-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap">
                Search Properties
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="text-gray-800 body-font max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended Properties</h2>
          <p className="text-gray-600">Curated especially for you</p>
          <div className="h-1 w-20 bg-theme-orange rounded mt-4 mx-auto md:mx-0"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 && <div className='col-span-full py-10'><p className='text-center text-xl text-gray-500'>No properties available at the moment.</p></div>}
          
          {products.slice(0, 4).map((item) => (
            <Link legacyBehavior key={item._id} href={`/product/${item.slug}`}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="relative h-48">
                  <img alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={item.img} />
                  <div className="absolute top-2 left-2 bg-theme-orange text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
                    FEATURED
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-gray-900 font-bold text-lg mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.desc}</p>
                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {products.length > 0 && (
          <div className="mt-10 text-center">
            <Link legacyBehavior href="/shop">
              <button className="border-2 border-theme-orange text-theme-orange px-8 py-2 rounded-lg font-semibold hover:bg-theme-orange hover:text-white transition-colors">
                View All Properties
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white body-font border-t border-gray-200">
        <div className="max-w-7xl px-5 py-24 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EstateX</h2>
            <p className="text-gray-600">Your trusted partner in Jaipur real estate</p>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-100 bg-gray-50 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-orange-100 text-theme-orange mb-6 text-3xl">
                  <MdVerified />
                </div>
                <h2 className="text-xl text-gray-900 font-bold mb-3">100% Verified Plots</h2>
                <p className="leading-relaxed text-gray-600">All our listings are JDA, RERA, or Nagarpalika approved to ensure your investment is safe.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-100 bg-gray-50 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-orange-100 text-theme-orange mb-6 text-3xl">
                  <MdLocationCity />
                </div>
                <h2 className="text-xl text-gray-900 font-bold mb-3">Prime Locations</h2>
                <p className="leading-relaxed text-gray-600">We deal exclusively in Jaipur and premium nearby colonies with high growth potential.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-100 bg-gray-50 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-orange-100 text-theme-orange mb-6 text-3xl">
                  <MdSecurity />
                </div>
                <h2 className="text-xl text-gray-900 font-bold mb-3">Secure Transactions</h2>
                <p className="leading-relaxed text-gray-600">Complete transparency and legal assistance throughout your buying journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      })
    }
    let products = await Product.find().limit(4)
    return {
      props: { products: JSON.parse(JSON.stringify(products)) }
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return {
      props: { products: [] }
    }
  }
}