import axios from "axios";

const baseApi = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});


export default baseApi;
