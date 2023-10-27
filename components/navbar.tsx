import Link from 'next/link';
import React from 'react';
import useAuthentication from '@/lib/hooks/useAuthentication';
import { useRouter } from 'next/router';
import { Role } from '@/lib/types';

const Navbar = () => {
    const { auth, role, logout } = useAuthentication();
    const router = useRouter();

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center select-none">
                        <img src="\android-chrome-512x512.png" className="h-8 mr-3 rounded" alt="devbook logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">devbook</span>
                    </a>
                    <div className="flex md:order-2">
                        {role === Role.author && router.pathname !== '/books/publish' && (
                            <Link href="/books/publish" className='mr-2'>
                                <div className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-semibold text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish Book</div>
                            </Link>
                        )}
                        {auth ? (
                            <Link onClick={logout} href="/">
                                <div className="text-white bg-red-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-semibold text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</div>
                            </Link>
                        ) : (
                            <Link href="/auth/login">
                                <div className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-semibold text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</div>
                            </Link>
                        )}
                        {auth &&
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        }
                    </div>
                    {auth &&
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link href="/" passHref>
                                        <div
                                            className={`block rounded md:p-0 text-lg font-semibold
                                  ${router.pathname === '/' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-700 dark:hover:text-blue-700'
                                                }`}
                                        >
                                            Home
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/books" passHref>
                                        <div
                                            className={`block rounded md:p-0 text-lg font-semibold
                                  ${router.pathname === '/books' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-700 dark:hover:text-blue-700'
                                                }`}
                                        >
                                            Explore
                                        </div>
                                    </Link>
                                </li>
                                {role === Role.author && (
                                    <li>
                                        <Link href="/published-books" passHref>
                                            <div
                                                className={`block rounded md:p-0 text-lg font-semibold
                                  ${router.pathname === '/published-books' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-700 dark:hover:text-blue-700'
                                                    }`}
                                            >
                                                Published Books
                                            </div>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link href="/reading-list" passHref>
                                        <div
                                            className={`block rounded md:p-0 text-lg font-semibold
                                  ${router.pathname === '/reading-list' ? 'text-blue-700' : 'text-gray-900 hover:text-blue-700 dark:hover:text-blue-700'
                                                }`}
                                        >
                                            Reading List
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav >
        </>
    )
}
export default Navbar;