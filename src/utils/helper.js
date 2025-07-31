import baseApi from "../api/baseApi"
import { ENDPOINTS } from "../api/endPoints"

export const addToken = (key, value) => {
    localStorage.setItem(key, value)
}

export const removeToken = (tokenName) => {
    localStorage.removeItem(tokenName)
}

export const getToken = (key) => {
    return localStorage.getItem(key)
}

export const tokenCheck = async () => {
    const token = import.meta.env.VITE_ACCESS_TOKEN_KEY
    console.log(token)
    try {
        const res = await baseApi.post(ENDPOINTS.TOKEN_VERIFY, {
            token: `${getToken(token)}`
        })
        if (res.status === 200) return true;
    } catch (error) {
        return error
    }
}