import React from 'react'
import Link from 'next/link'
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 body-font">
            <div className="max-w-7xl px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex flex-col justify-center items-center md:items-start">
                    <Link legacyBehavior href={'/'}>
                        <a className="flex title-font font-bold items-center text-white mb-4 md:mb-0">
                            <span className="text-3xl text-theme-orange">Estate</span><span className="text-3xl">X</span>
                        </a>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">Your trusted partner for JDA, Nagarpalika & Housing Board approved plots in Jaipur.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3 uppercase">Quick Links</h2>
                        <nav className="list-none mb-10 space-y-2">
                            <li><Link legacyBehavior href="/"><a className="text-gray-400 hover:text-theme-orange transition-colors">Home</a></Link></li>
                            <li><Link legacyBehavior href="/shop"><a className="text-gray-400 hover:text-theme-orange transition-colors">Properties</a></Link></li>
                            <li><Link legacyBehavior href="/about"><a className="text-gray-400 hover:text-theme-orange transition-colors">About Us</a></Link></li>
                            <li><Link legacyBehavior href="/contact"><a className="text-gray-400 hover:text-theme-orange transition-colors">Contact Us</a></Link></li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3 uppercase">Legal</h2>
                        <nav className="list-none mb-10 space-y-2">
                            <li><a className="text-gray-400 hover:text-theme-orange transition-colors cursor-pointer">Privacy Policy</a></li>
                            <li><a className="text-gray-400 hover:text-theme-orange transition-colors cursor-pointer">Terms & Conditions</a></li>
                            <li><a className="text-gray-400 hover:text-theme-orange transition-colors cursor-pointer">RERA Disclaimer</a></li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-bold text-white tracking-widest text-sm mb-3 uppercase">Contact</h2>
                        <nav className="list-none mb-10 space-y-4">
                            <li className="flex items-start justify-center md:justify-start">
                                <MdLocationOn className="text-theme-orange mt-1 mr-2 text-xl" />
                                <span className="text-gray-400">123 Real Estate Tower, Tonk Road, Jaipur, Rajasthan 302015</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <MdPhone className="text-theme-orange mr-2 text-xl" />
                                <span className="text-gray-400">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <MdEmail className="text-theme-orange mr-2 text-xl" />
                                <span className="text-gray-400">contact@estatex.com</span>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-950">
                <div className="max-w-7xl mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2026 EstateX — All Rights Reserved</p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a className="text-gray-500 hover:text-theme-orange cursor-pointer">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-theme-orange cursor-pointer">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-theme-orange cursor-pointer">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer