import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Head from 'next/head';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    useEffect(() => {
        if(localStorage.getItem('myuser')){
            router.push('/')
        }
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password }
        let res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setEmail('')
        setPassword('')
        if(response.succses){
            localStorage.setItem('myuser', JSON.stringify({token: response.token, email: response.email}))
            toast.success('Logged In Succesfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setTimeout(() => {
                router.push('/')
            }, 1000);
        }
        else{
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
                <title>{'EstateX - Sign In'}</title>
                <meta name="description" content={'Sign in to EstateX'} />
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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an account? 
                            <Link legacyBehavior href={'/signup'}><a className="font-medium text-theme-orange hover:text-orange-600 ml-1">Sign up</a></Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm transition-colors" placeholder="Enter your email" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-theme-orange focus:border-theme-orange focus:z-10 sm:text-sm transition-colors" placeholder="Enter your password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-theme-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-orange shadow-md transition-colors">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login