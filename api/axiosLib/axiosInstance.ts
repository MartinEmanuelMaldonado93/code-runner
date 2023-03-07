import Axios from "axios";
import { addBaseInterceptors } from "./axiosInterceptors";

if (!process.env.NEXT_PUBLIC_APP_RAPID_API_BASE_URL)
  throw Error("API_URL not defined");
if (!process.env.NEXT_PUBLIC_APP_RAPID_API_KEY)
  throw Error("API_KEY not defined");
if (!process.env.NEXT_PUBLIC_APP_RAPID_API_HOST)
  throw Error("API_HOST not defined");

export const judge0Instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_RAPID_API_BASE_URL,
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_APP_RAPID_API_HOST,
  },
  params: { base64_encoded: "true", fields: "*" },
});

addBaseInterceptors(judge0Instance);
