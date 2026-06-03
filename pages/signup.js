import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem('myuser')){
            router.push('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, email, password }
        let res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setName('')
        setEmail('')
        setPassword('')
        if (response.succses) {
            toast.success('Your Account Created Succesfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push('/login')
            }, 1000);
        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="bg-theme-bg min-h-screen pt-24">
            <Head>
                <title>{'EstateX - Sign Up'}</title>
                <meta name="description" content={'Create an account on EstateX'} />
            </Head>
            <ToastContainer />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                    <div>
                        <div className="text-center flex justify-center">
                            <Link legacyBehavior href={'/'}>
                                <a className="flex title-font font-bold items-center text-gray-900 cursor-pointer">
                                    <span className="text-4xl text-theme-orange">Estate</span><span className="text-4xl">X</span>
                                </a>
                            </Link>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account? 
                            <Link legacyBehavior href={'/login'}><a className="font-medium text-theme-orange hover:text-orange-600 ml-1">Log in</a></Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm transition-colors" placeholder="Enter your full name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm transition-colors" placeholder="Enter your email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm transition-colors" placeholder="Create a password" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-theme-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-orange shadow-md transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup