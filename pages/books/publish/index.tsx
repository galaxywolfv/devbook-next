import Head from "next/head";
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import useBook from "@/lib/hooks/useBook";
import { Book, Role } from "@/lib/types";
import config from "@/lib/config";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Navbar from "@/components/navbar";

/**
 * The create book page component.
 *
 * @component
 * @returns {JSX.Element} The rendered book page.
 */
const PublishBook = () => {
    const { auth, role } = useAuthentication();

    const [book, setBook] = useState<Partial<Book>>({
        title: '',
        description: ''
    });

    const { createBook } = useBook();

    const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (auth && role === Role.author && book.title && book.description) {
            await createBook(book.title, book.description);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const title: any = value;

        setBook((prevBook) => ({
            ...prevBook,
            [name]: title
        }));
    };
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const description: any = value;

        setBook((prevBook) => ({
            ...prevBook,
            [name]: description
        }));
    };

    return (
        <>
            <Head>
                <title>Publish Book{config.titleWithSeparator}</title>
                <meta name="description" content="Writing. Fun, Intuitive." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <Navbar />
            
            <div className="w-full flex justify-center mt-20">
                <div className="w-full max-w-5xl relative overflow-x-auto shadow-md p-4 lg:p-8">
                    <form className="w-full" onSubmit={handleCreateBook}>
                        <div className="mb-6">
                            <label htmlFor="book-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                id="book-name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Title"
                                required
                                name="title"
                                value={book.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description"
                            name="description"
                            value={book.description}
                            onChange={handleTextAreaChange}
                        ></textarea>

                        <button className="w-full text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-semibold text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish Book</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default PublishBook;
