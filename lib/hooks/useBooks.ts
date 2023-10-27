import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';
import { Book } from '../types';

function useBooks() {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthentication();
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/book/get-all`, {
                    headers: {
                        bearer: token,
                    },
                });
                setIsLoading(false);
                setBooks(response.data)
                return books;
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error retrieving books:', error);
            setIsLoading(false);
        }
    };

    return { books, fetchBooks, isLoading };
}

export default useBooks;
