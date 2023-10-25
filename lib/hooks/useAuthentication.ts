import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

function useAuthentication() {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuth(true);
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${config.api}/user/login`, { username, password });

      const userToken = response.data;

      localStorage.setItem('token', userToken);
      setAuth(true);
      setToken(userToken);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${config.api}/user/save`, { username, password });

      const userToken = response.data;

      localStorage.setItem('token', userToken);
      setAuth(true);
      setToken(userToken);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setAuth(false);
    setToken('');
  };

  return { auth, token, login, register, logout };
}

export default useAuthentication;
