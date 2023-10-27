import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

function useAuthentication() {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(config.role);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  useEffect(() => {
    if (token) {
      setAuth(true);
      fetchSelf(token);
    }
  }, [token]);

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

  const fetchSelf = async (storedToken: string) => {
    const response = await axios.get(`${config.api}/user/get-self`, {
      headers: {
        bearer: storedToken,
      }
    });    

    setRole(response.data.role)
    setUsername(response.data.username)
  }

  return { auth, role, username, token, login, register, logout };
}

export default useAuthentication;
