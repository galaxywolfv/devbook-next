import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import config from '@/lib/config';
import useAuthentication from '@/lib/hooks/useAuthentication';
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import { Book } from '@/lib/types';
import useSavedBooks from '@/lib/hooks/useSavedBooks';

const MyReadingList = () => {
    const { auth } = useAuthentication();
    const { mySavedBooks, fetchMySavedBooks } = useSavedBooks();
    const { updateList } = useSavedBooks();

    const addToList = async (book: Book) => {
        if (auth) {
            await updateList(book);
            await fetchMySavedBooks();
        }
    };

    useEffect(() => {
        if (auth) {
            fetchMySavedBooks();
        }
    }, [auth]);

    return (
        <>
            <Head>
                <title>My List{config.titleWithSeparator}</title>
                <meta name="description" content="Limitless Entertainment." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Navbar></Navbar>
            <div className="w-full flex justify-center">
                <div className="max-w-5xl w-full relative overflow-x-auto shadow-md sm:p-2 mt-20">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-4 whitespace-nowrap text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {auth &&
                                (
                                    mySavedBooks.map((book: Book) => {
                                        const { _id, title, author, description } = book;

                                        return (
                                            <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {title}
                                                </th>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/published-books/${author}`}>{author}</Link>

                                                </td>
                                                <td className="flex items-center justify-end px-3 py-2 space-x-3">
                                                    <button onClick={() => addToList(book)} className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                                        </svg>

                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>)
}
export default MyReadingList;