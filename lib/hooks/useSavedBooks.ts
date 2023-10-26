import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useAuthentication from './useAuthentication';

function useSavedBooks() {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthentication();

    const fetchMySavedBooks = async () => {
        try {
            if (token) {
                const response = await axios.get(`${config.api}/user/list/find`, {
                    headers: {
                        bearer: token,
                    },
                });                
                return response.data;
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error retrieving list:', error);
            setIsLoading(false);
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
            setIsLoading(false);
        } catch (error) {
            console.error('Error retrieving list:', error);
            setIsLoading(false);
        }
    };

    return { fetchMySavedBooks, fetchSavedBooks, isLoading };
}

export default useSavedBooks;