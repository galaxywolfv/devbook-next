import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';
import { Book } from '../types';

function usePublishedBooks() {
    const { token } = useAuthentication();
    const [myPublishedBooks, setMyPublishedBooks] = useState<Book[]>([]);
    const [publishedBooks, setPublishedBooks] = useState<Book[]>([]);

    const fetchMyPublishedBooks = async () => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/publish/find`, {
                    headers: {
                        bearer: token,
                    },
                });
                setMyPublishedBooks(response.data)
                return response.data;
            }
        } catch (error) {
            console.error('Error retrieving published books:', error);
        }
    };
    const fetchPublishedBooks = async (username: string) => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/publish/find/${username}`, {
                    headers: {
                        bearer: token,
                    },
                });
                setPublishedBooks(response.data)
                return response.data;
            }
        } catch (error) {
            console.error('Error retrieving published books:', error);
        }
    };

    return { myPublishedBooks, publishedBooks, fetchMyPublishedBooks, fetchPublishedBooks };
}

export default usePublishedBooks;