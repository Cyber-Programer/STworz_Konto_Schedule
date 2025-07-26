export const addToken = (key, value) => {
    localStorage.setItem(key, value)
}

export const removeToken = (tokenName) => {
    localStorage.removeItem(tokenName)
}