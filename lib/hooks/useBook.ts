import config from "../config";
import axios from 'axios'
import { useNotification } from "./useNotification";
import useAuthentication from "./useAuthentication";
import { useRouter } from "next/router";
import { useState } from "react";
import { Book } from "../types";

// Custom React hook for managing courses data
function useBook() {
  const { onSuccess, onError } = useNotification()
  const { token } = useAuthentication();
  const router = useRouter();
  const [book, setBook] = useState<Book>();

  const fetchBook = async (bookId: string) => {
    try {
      if (token) {
        const response = await axios.post(`${config.api}/book/get/${bookId}`, {}, {
          headers: {
            bearer: token,
          },
        });        
        setBook(response.data)
        return book;
      }
    } catch (error) {
      console.error('Error retrieving book:', error);
    }
  };

  const deleteBook = async (bookId: string) => {
    try {
      const response = await axios.delete(`${config.api}/book/delete/${bookId}`,
        {
          headers: {
            bearer: token,
          },
        }
      );
      onSuccess(`Succesfully deleted "${response.data.title}"`)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const createBook = async (title: string, description: string) => {
    try {
      await axios.post(`${config.api}/book/save`, { title, description }, {
        headers: {
          bearer: token,
        },
      });
      router.replace("/published-books");
    } catch (error) {
      console.error(error);
    }
  };

  const editBook = async (bookId: string, title: string, description: string) => {
    try {
      await axios.put(`${config.api}/book/update/${bookId}`, { title, description }, {
        headers: {
          bearer: token,
        },
      });
      router.replace("/published-books");
    } catch (error) {
      console.error(error);
    }
  };

  return { book, fetchBook, deleteBook, createBook, editBook };
}

export default useBook;