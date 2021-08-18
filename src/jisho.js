// File containing Jisho-API related functions
const axios = require("axios")

/**
 * Make a request to the Jisho API
 * @param {String} word - Word to search
 * @param {Number} maxResults - Max results to show, default 5
 * @returns First results up to the number specified
 */
const makeRequest = async (word, maxResults=5) => {
    try {
        const response = await axios.get(encodeURI("https://jisho.org/api/v1/search/words?keyword=" + word))
        console.log(response.data.data.slice(0, maxResults))
    } catch (e) {
        console.log(e)
    }
}

module.exports = { makeRequest }