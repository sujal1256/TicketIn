import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL
console.log(BASE_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
