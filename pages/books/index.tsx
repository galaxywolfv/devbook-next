import Link from 'next/link';
import Head from 'next/head';
import config from '@/lib/config';
import useAuthentication from '@/lib/hooks/useAuthentication';
import Navbar from '@/components/navbar';
import useBooks from '@/lib/hooks/useBooks';
import { Book, Role } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import useBook from '@/lib/hooks/useBook';
import useSavedBooks from '@/lib/hooks/useSavedBooks';

const Books = () => {
    const { auth, role, username } = useAuthentication();
    const { books, fetchBooks } = useBooks();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const { deleteBook } = useBook();
    const { updateList } = useSavedBooks();

    const [selectedBook, setSelectedBook] = React.useState<Book>();

    const toggleModal = (book: Book) => {
        if (book) {
            setSelectedBook(book);
            setShowModal(!showModal);
        }
    };

    const handleDeleteBook = async (bookId: string, author: string) => {
        if (auth && ((role === Role.admin) || (role === Role.author && username === author))) {
            await deleteBook(bookId);
            await fetchBooks();
        }
    };

    const addToList = async (book: Book) => {
        if (auth) {
            await updateList(book);
        }
    };

    useEffect(() => {
        if (auth) {
            fetchBooks();
        }
    }, [auth]);

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
                            {books.map((book: Book) => {
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
                                            {role === Role.author && username === author &&
                                                <Link href={`/books/edit/${book._id}`}>
                                                    <button className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </Link>
                                            }
                                            {((role === Role.admin) || (role == Role.author && username === author)) &&

                                                <button onClick={() => toggleModal(book)} className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                                    </svg>
                                                </button>
                                            }
                                            <button onClick={() => addToList(book)} className="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                </svg>
                                            </button>

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                        {showModal && (
                            <div
                                id="popup-modal"
                                tabIndex={-1}
                                className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center  backdrop-blur-[6px]`}
                            >
                                <div className="relative w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button
                                            type="button"
                                            onClick={() => { if (selectedBook) { toggleModal(selectedBook) } }}
                                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                            data-modal-hide="popup-modal"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <div className="p-6 text-center">
                                            <svg
                                                aria-hidden="true"
                                                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Are you sure you want to delete {selectedBook?.title || "this book"}?
                                            </h3>
                                            <button
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                                onClick={() => {
                                                    if (selectedBook) {
                                                        toggleModal(selectedBook)
                                                        handleDeleteBook(selectedBook?._id.toString(), selectedBook?.author)
                                                    }
                                                }}
                                            >
                                                Yes, I&apos;m sure
                                            </button>
                                            <button
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                onClick={() => { if (selectedBook) { toggleModal(selectedBook) } }}
                                            >
                                                No, cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </table>
                </div>
            </div>

        </>
    )
}
export default Books;