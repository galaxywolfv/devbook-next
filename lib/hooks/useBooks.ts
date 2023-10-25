import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';

function useBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthentication();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (token) {
                    const response = await axios.get(`${config.api}/book/get-all`, {
                        headers: {
                            bearer: token,
                        },
                    });
                    setBooks(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error retrieving books:', error);
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [token]);

    return { books, isLoading };
}

export default useBooks;
