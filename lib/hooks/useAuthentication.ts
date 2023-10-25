import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../config";
import { useNotification } from "./useNotification";

function useAuthentication() {
  const router = useRouter();
  const { onSuccess } = useNotification()

  const login = async (code: string) => {
    try {
      // setToken("")
      onSuccess("Authentication successful")
    } catch (error) {
      console.log(error)
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      await router.push("/");
    } catch (error) {
      console.log(error)
    }
  };


  return { login, logout };
}

export default useAuthentication;
