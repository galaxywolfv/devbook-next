import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { useNotification } from "./useNotification";

function useAuthentication() {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(config.role);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  const { onSuccess, onError } = useNotification()

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
      onSuccess(`Welcome back, ${username}.`);
    } catch (error) {
      console.error(error);
      onError(`Invalid Credentials`);
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
      onSuccess(`Welcome to devbook, ${username}.`);
    } catch (error) {
      console.error(error);
      onError(`Uername already taken`);
    }
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setAuth(false);
    setToken('');
    onSuccess(`You've been successfully logged out.`);
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
