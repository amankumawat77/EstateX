import { React, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
import { MdFavoriteBorder, MdFavorite, MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router'
import ProfileDD from '../src/layouts/header/ProfileDD'
import {ListItemButton} from "@mui/material";

const Navbar = ({ logout, user, cart, removeFromCart, clearCart }) => {
    const router = useRouter()
    useEffect(() => {
        Object.keys(cart).length !== 0 && setSidebar(true)
        let excluded = ['/checkout', '/order', '/orders', '/account', '/login', '/signup', '/forgot', '/shop']
        if (excluded.includes(router.pathname)) {
            setSidebar(false)
        }
    }, [])

    const ref = useRef()
    const [sidebar, setSidebar] = useState(false)
    const toggleCart = () => {
        setSidebar(!sidebar)
    }
    const navref = useRef()
    const toggleNav = () => {
        if (navref.current.classList.contains('-translate-x-full')) {
            navref.current.classList.remove('-translate-x-full')
            navref.current.classList.add('translate-x-0')
        }
        else if (!navref.current.classList.contains('translate-x-full')) {
            navref.current.classList.remove('translate-x-0')
            navref.current.classList.add('-translate-x-full')
        }
    }
    
    // Number of saved properties
    const savedCount = Object.keys(cart).length;

    return (
        <>
            <header className="text-gray-600 body-font fixed top-0 bg-white/95 backdrop-blur-sm z-50 w-full border-b border-gray-100 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto flex flex-wrap flex-col md:flex-row items-center h-20 px-4 mt-8 md:mt-0">
                    <Link legacyBehavior href={'/'}>
                        <a className="flex title-font font-bold items-center text-gray-900">
                            <span className="text-3xl text-theme-orange">Estate</span><span className="text-3xl">X</span>
                        </a>
                    </Link>
                    <nav className="hidden md:ml-10 md:flex flex-wrap items-center text-base justify-center flex-grow">
                        <li className='list-none'><Link legacyBehavior href={'/'}><a className="hover:text-theme-orange mx-4 font-medium transition-colors">Home</a></Link></li>
                        <li className='list-none'><Link legacyBehavior href={'/shop'}><a className="hover:text-theme-orange mx-4 font-medium transition-colors">Properties</a></Link></li>
                        <li className='list-none'><Link legacyBehavior href={'/about'}><a className="hover:text-theme-orange mx-4 font-medium transition-colors">About</a></Link></li>
                        <li className='list-none'><Link legacyBehavior href={'/contact'}><a className="hover:text-theme-orange mx-4 font-medium transition-colors">Contact</a></Link></li>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-theme-orange transition-colors">
                            {savedCount > 0 ? <MdFavorite className="text-2xl text-theme-orange" /> : <MdFavoriteBorder className="text-2xl" />}
                            {savedCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">{savedCount}</span>}
                        </button>
                        {user.value ? (
                            <ProfileDD logout={logout} />
                        ) : (
                            <Link legacyBehavior href={'/login'}><button className="bg-theme-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">Sign In</button></Link>
                        )}
                    </div>
                </div>
                
                {/* Saved Properties Drawer */}
                <div ref={ref} className={`sideCart z-50 top-0 p-8 transition-transform duration-300 ${sidebar ? 'translate-x-0' : 'translate-x-full'} bg-white w-full md:w-[400px] h-full fixed right-0 shadow-2xl border-l border-gray-100 flex flex-col overflow-y-auto`}>
                    <div className="w-full flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                        <h2 className='font-bold text-2xl text-gray-900 flex items-center'><MdFavorite className="text-theme-orange mr-2" /> Saved Properties</h2>
                        <button onClick={toggleCart} className="text-2xl text-gray-500 hover:text-theme-orange transition-colors"><AiOutlineClose /></button>
                    </div>
                    
                    <div className="flex-grow">
                        {savedCount === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                                <MdFavoriteBorder className="text-6xl mb-4 text-gray-300" />
                                <p className="text-lg">No saved properties yet!</p>
                                <button onClick={toggleCart} className="mt-6 border border-theme-orange text-theme-orange px-6 py-2 rounded-lg hover:bg-theme-orange hover:text-white transition-colors">Browse Properties</button>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                {Object.keys(cart).map((k) => (
                                    <div key={k} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex-grow pr-4">
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{cart[k].name}</h3>
                                            <p className="text-theme-orange font-semibold">₹{cart[k].price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <button onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name) }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <MdDelete className="text-xl" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {savedCount > 0 && (
                        <div className="pt-6 border-t border-gray-100 mt-6">
                            <button onClick={clearCart} className="w-full mb-3 py-3 text-gray-600 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Clear All</button>
                        </div>
                    )}
                </div>
            </header>
            
            {/* Mobile Nav Bottom Bar */}
            <div className="lg:hidden z-40 relative">
                <div className="bg-white md:hidden fixed bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-100">
                    <ul className="h-16 flex px-6 items-center justify-between text-gray-600">
                        <li onClick={toggleNav} className='text-2xl hover:text-theme-orange cursor-pointer'><GiHamburgerMenu /></li>
                        <Link legacyBehavior href={'/'}><li className='text-2xl hover:text-theme-orange cursor-pointer'><AiFillHome /></li></Link>
                        <li onClick={toggleCart} className='text-2xl relative hover:text-theme-orange cursor-pointer'>
                            {savedCount > 0 ? <MdFavorite className="text-theme-orange" /> : <MdFavoriteBorder />}
                            {savedCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full font-bold">{savedCount}</span>}
                        </li>
                        {!user.value && <Link legacyBehavior href={'/login'}><li className='text-2xl hover:text-theme-orange cursor-pointer'><FaUserCircle /></li></Link>}
                        {user.value && <ProfileDD logout={logout} />}
                    </ul>
                </div>
                
                {/* Mobile Menu Drawer */}
                <div ref={navref} className="Nav z-50 top-0 left-0 p-8 transform transition-transform duration-300 -translate-x-full bg-white w-[80%] h-full fixed shadow-2xl">
                    <div className="w-full flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                        <h2 className='font-bold text-2xl m-0 text-gray-900'>Menu</h2>
                        <button onClick={toggleNav} className="text-2xl text-gray-500 hover:text-theme-orange transition-colors"><AiOutlineClose /></button>
                    </div>
                    <nav className="flex flex-col space-y-2">
                        <Link legacyBehavior href={'/'}><ListItemButton onClick={toggleNav} className='rounded-lg text-lg font-medium hover:bg-orange-50 hover:text-theme-orange transition-colors'>Home</ListItemButton></Link>
                        <Link legacyBehavior href={'/shop'}><ListItemButton onClick={toggleNav} className='rounded-lg text-lg font-medium hover:bg-orange-50 hover:text-theme-orange transition-colors'>Properties</ListItemButton></Link>
                        <Link legacyBehavior href={'/about'}><ListItemButton onClick={toggleNav} className='rounded-lg text-lg font-medium hover:bg-orange-50 hover:text-theme-orange transition-colors'>About</ListItemButton></Link>
                        <Link legacyBehavior href={'/contact'}><ListItemButton onClick={toggleNav} className='rounded-lg text-lg font-medium hover:bg-orange-50 hover:text-theme-orange transition-colors'>Contact</ListItemButton></Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar