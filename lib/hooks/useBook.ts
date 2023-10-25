import { useContext, useEffect, useState } from "react";
import config from "../config";
import axios from 'axios'
import { useNotification } from "./useNotification";
import { Context } from "@/Context";
import handler from "@/pages/api/hello";
import { NextApiRequest, NextApiResponse } from "next";

// Custom React hook for managing courses data
function useAnime(token = '') {
  const { onSuccess, onError } = useNotification()

  const [recentData, setRecentData] = useState<[]>([]);

  const { setRecent } = useContext(Context);
  const { setPopular } = useContext(Context);
  const { setRecentPicks } = useContext(Context);
  const { setHistory } = useContext(Context);
  const { setList } = useContext(Context);
  const { setSearch } = useContext(Context);

  useEffect(() => {

  }, [])

  const getRecent = async (token: string) => {
    try {
      const req: NextApiRequest = {} as NextApiRequest; // You can provide the appropriate request object here
      const res: NextApiResponse = {
        status: (statusCode) => ({
          json: (data) => {
            setRecentData(data)

            // Handle the data returned by the handler function
            console.log(data); // Should print the response from the handler function
          },
        }),
      } as NextApiResponse;

      // Call the handler function directly
      handler(req, res);
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { recentData, getRecent };
}

export default useAnime;