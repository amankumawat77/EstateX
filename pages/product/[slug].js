import { useRouter } from 'next/router'
import { useState } from 'react'
import Product from '../../models/Product'
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Error from 'next/error'
import { MdLocationOn, MdVerified, MdOutlineShare, MdFavoriteBorder, MdOutlineDateRange } from 'react-icons/md';
import { BiPhoneCall } from 'react-icons/bi';

const Post = ({ product, error }) => {
    const router = useRouter()
    
    const requestTour = () => {
        toast.success('Tour request sent to the agent! They will contact you shortly.', {
            position: "top-center",
            autoClose: 3000,
        });
    }

    const saveProperty = () => {
        toast.info('Property saved to your favorites.', {
            position: "top-center",
            autoClose: 3000,
        });
    }

    if (error) {
        return <Error statusCode={error} />
    }

    return (
        <div className="bg-theme-bg min-h-screen pt-24 pb-20">
            <Head>
                <title>{`EstateX - ${product.title}`}</title>
                <meta name="description" content={`Buy ${product.title} - Premium plots in Jaipur`} />
            </Head>
            <ToastContainer />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="text-sm text-gray-500 mb-4 md:mb-0">
                        <span className="hover:text-theme-orange cursor-pointer" onClick={() => router.push('/')}>Home</span> 
                        <span className="mx-2">{'>'}</span> 
                        <span className="hover:text-theme-orange cursor-pointer" onClick={() => router.push('/shop')}>Properties</span> 
                        <span className="mx-2">{'>'}</span> 
                        <span className="text-gray-900 font-medium line-clamp-1">{product.title}</span>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={saveProperty} className="flex items-center text-gray-600 hover:text-theme-orange transition-colors">
                            <MdFavoriteBorder className="text-xl mr-1" /> <span className="font-medium">Save</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-theme-orange transition-colors">
                            <MdOutlineShare className="text-xl mr-1" /> <span className="font-medium">Share</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery (Placeholder for single image) */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md relative h-[400px] md:h-[500px]">
                            <img alt={product.title} className="w-full h-full object-cover" src={product.img} />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow flex items-center font-bold text-gray-800">
                                <MdVerified className="text-green-500 mr-2 text-xl" /> Verified Listing
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6 text-sm md:text-base">
                                <span className="flex items-center"><MdLocationOn className="text-theme-orange mr-1" /> Premium Location, Jaipur</span>
                                <span className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold">
                                    {product.availableQty > 0 ? `${product.availableQty} Units Available` : 'Sold Out'}
                                </span>
                            </div>
                            
                            <hr className="border-gray-100 my-6" />
                            
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {product.desc}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 sticky top-28">
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Asking Price</p>
                            <div className="text-4xl font-bold text-gray-900 mb-6">
                                ₹{product.price.toLocaleString('en-IN')}
                            </div>
                            
                            {product.availableQty > 0 ? (
                                <div className="space-y-4">
                                    <button onClick={requestTour} className="w-full bg-theme-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-md flex justify-center items-center">
                                        <MdOutlineDateRange className="mr-2 text-xl" /> Request a Site Tour
                                    </button>
                                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-md flex justify-center items-center">
                                        <BiPhoneCall className="mr-2 text-xl" /> Contact Agent
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold text-lg border border-red-100">
                                    Currently Out of Stock
                                </div>
                            )}

                            <hr className="border-gray-100 my-6" />

                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-2">Need help with legal verification?</p>
                                <a href="#" className="text-theme-orange font-semibold hover:underline">Speak to our legal advisor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        let product = await Product.findOne({ slug: context.query.slug })
        if (product == null) {
            return {
                props: { error: 404 }
            }
        }
        return {
            props: { error: null, product: JSON.parse(JSON.stringify(product)) }
        }
    } catch (error) {
        console.error("Database connection failed:", error.message);
        return {
            props: { error: 500 }
        }
    }
}

export default Post