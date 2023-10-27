import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import config from '@/lib/config';
import useAuthentication from '@/lib/hooks/useAuthentication';
import Navbar from '@/components/navbar';
import useBooks from '@/lib/hooks/useBooks';
import { motion } from 'framer-motion';
import { Book } from '@/lib/types';
import usePublishedBooks from '@/lib/hooks/usePublishedBooks';
import { useRouter } from 'next/router';

const PublishedBooks = () => {
    const { auth } = useAuthentication();
    const { fetchPublishedBooks } = usePublishedBooks();
    const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);

    const router = useRouter();
    const username = router.query.id;

    useEffect(() => {
        if (auth) {
            const fetchData = async () => {
                if (username) {
                    try {
                        const books = await fetchPublishedBooks(username.toString());
                        setPublishedBooks(books);
                    } catch (error) {
                        console.error('Error retrieving published books:', error);
                    }
                }
            };

            fetchData();
        }
    }, [auth, username]);

    return (
        <>
            <Head>
                <title>{username}'s Published Books{config.titleWithSeparator}</title>
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
                            </tr>
                        </thead>
                        <tbody>
                            {auth &&
                                (
                                    publishedBooks.map((book: Book) => {
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
                                                    {author}
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
export default PublishedBooks;