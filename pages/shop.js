/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from "mongoose";
import Head from 'next/head';
import { MdVerified, MdLocationOn } from 'react-icons/md';

const Shop = ({ products }) => {
    return (
        <>
            <Head>
                <title>EstateX - Premium Plots in Jaipur</title>
                <meta name="description" content="Find JDA approved, Nagarpalika approved, Housing Board, and RERA approved plots in Jaipur." />
            </Head>
            <div className="bg-theme-bg min-h-screen pt-24 pb-12">
                <section className="text-gray-800 body-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recommended Plots in Jaipur</h1>
                            <p className="text-gray-600">Curated especially for you - JDA, RERA & Housing Board Approved</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className="bg-white px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700">
                                {products.length} Properties
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((item) => {
                            return (
                                <Link legacyBehavior key={item._id} href={`/product/${item.slug}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                                        <div className="relative h-64 overflow-hidden">
                                            <img alt={item.title} className="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-500" src={item.img} />
                                            <div className="absolute top-4 left-4 bg-theme-orange text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                                                <MdVerified className="mr-1" /> Approved Plot
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 flex items-center">
                                                <MdLocationOn className="mr-1 text-theme-orange" /> JAIPUR
                                            </h3>
                                            <h2 className="text-gray-900 title-font text-xl font-bold mb-2 line-clamp-1">{item.title}</h2>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.desc}</p>
                                            
                                            <div className="mt-auto">
                                                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                                                    <span className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                                                    <span className={`text-sm font-semibold ${item.availableQty > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {item.availableQty > 0 ? `${item.availableQty} Units Available` : 'Sold Out'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                        
                        {products.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-xl text-gray-500">No properties available at the moment.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000
            })
        }
        let products = await Product.find()
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

export default Shop