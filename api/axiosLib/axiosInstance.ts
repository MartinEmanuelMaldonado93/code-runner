import Axios from "axios";
import { addBaseInterceptors } from "./axiosInterceptors";

export const judge0Instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_RAPID_API_HOST,
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_APP_RAPID_API_HOST,
  },
});

addBaseInterceptors(judge0Instance);
