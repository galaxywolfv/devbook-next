import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';
import { useNotification } from './useNotification';
import { Book } from '../types';

function useSavedBooks() {
    const { token } = useAuthentication();
    const { onSuccess, onError } = useNotification()
    const [mySavedBooks, setMySavedBooks] = useState<Book[]>([]);

    const fetchMySavedBooks = async () => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/list/find`, {
                    headers: {
                        bearer: token,
                    },
                });
                setMySavedBooks(response.data);
                return response.data;
            }
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    };

    const fetchSavedBooks = async (username: string) => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/list/find/${username}`, {
                    headers: {
                        bearer: token,
                    },
                });
                return response.data;
            }
        } catch (error) {
            console.error('Error retrieving list:', error);
        }
    };
    const updateList = async (book: Book) => {
        try {
            const bookId: string = book._id;
            const title: string = book.title;
            // Get the user's list of saved books
            const listResponse = await axios.get(`${config.api}/user/list/find`, {
                headers: {
                    bearer: token,
                },
            });
            const myBooks: Book[] = listResponse.data;

            // Check if the book with the specified ID is in the user's list
            const bookInList: Book | undefined = myBooks.find(book => book._id === bookId);

            if (bookInList) {
                // If the book is in the list, delete it
                await axios.delete(`${config.api}/user/list/delete/${bookId}`, {
                    headers: {
                        bearer: token,
                    },
                });
                onSuccess(`Successfully removed "${bookInList.title}" from Saved Books`);
            } else {
                // If the book is not in the list, add it
                const response = await axios.get(`${config.api}/user/list/save/${bookId}`, {
                    headers: {
                        bearer: token,
                    },
                });
                onSuccess(`Successfully added "${title}" to Saved Books`);
            }
        } catch (error) {
            console.error(error);
            onError("Something went wrong");
        }
    }



    return { mySavedBooks, fetchMySavedBooks, fetchSavedBooks, updateList };
}

export default useSavedBooks;