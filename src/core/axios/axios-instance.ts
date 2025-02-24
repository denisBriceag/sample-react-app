import axios from "axios";
import { API_BASE } from "../constants/api-base.ts";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
