import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';

function usePublishedBooks() {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthentication();

    const fetchMyPublishedBooks = async () => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/publish/find`, {
                    headers: {
                        bearer: token,
                    },
                });                
                return response.data;
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error retrieving published books:', error);
            setIsLoading(false);
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
                return response.data;
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error retrieving published books:', error);
            setIsLoading(false);
        }
    };

    return { fetchMyPublishedBooks, fetchPublishedBooks, isLoading };
}

export default usePublishedBooks;