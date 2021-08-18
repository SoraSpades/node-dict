// File containing Jisho-API related functions
const axios = require("axios")

const makeRequest = async (word, maxResults=5) => {
    try {
        const response = await axios.get(encodeURI("https://jisho.org/api/v1/search/words?keyword=" + word))
        console.log(response.data.data.slice(0, maxResults))
    } catch (e) {
        console.log(e)
    }
}

module.exports = { makeRequest }