import Link from 'next/link';
import React, { useState } from 'react';
import Head from 'next/head';
import config from '@/lib/config';
import useAuthentication from '@/lib/hooks/useAuthentication';
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import useBooks from '@/lib/hooks/useBooks';

const Books = () => {
    const { auth } = useAuthentication();
    const { books, isLoading } = useBooks();

    return (
        <>
            <Head>
                <title>Explore Books{config.titleWithSeparator}</title>
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
            <div className="w-full relative overflow-x-auto shadow-md sm:p-2 md:p-4 lg:p-8 mt-20">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-4 whitespace-nowrap">
                                Author
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book: any, index: number) => (

                            <tr key={book?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <motion.th layoutId={book?._id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link
                                        href={`/books/${book._id}`}
                                    >{book.title}</Link>
                                </motion.th>
                                <motion.td layoutId={book?.author} className="px-6 py-4 whitespace-nowrap">
                                    {book?.author}
                                </motion.td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Books;