// File containing Jisho-API related functions
const axios = require("axios")

/**
 * Make a request to the Jisho API
 * @param {String} word - Word to search
 * @param {Number} maxResults - Max results to show, default 5
 * @returns {Promise<Array>} First results up to the number specified
 */
const makeRequest = async (word, maxResults=5) => {
    try {
        const response = await axios.get(encodeURI("https://jisho.org/api/v1/search/words?keyword=" + word))
        const filteredResponse = response.data.data.filter(object => object.senses[0].parts_of_speech[0] != "Wikipedia definition")
        return filteredResponse.slice(0, maxResults)
    } catch (e) {
        console.log(e)
    }
}

/**
 * @typedef {Object} parsedResult
 * @property {String} japanese - Japanese word (with kanji)
 * @property {String} japaneseReading - Japanese reading (Hiragana)
 * @property {String[]} definitions - English definitions
 * @property {String} [jlpt] - Japanese level by the JLPT standard
 * @property {String} [wordType] - Type of the word
 */
/**
 * Transforms the result from an API in a more friendly, one-leveled object
 * @param {Object} result - Result from an API call
 * @returns {parsedResult} Transformed Object
 */
const parseResult = (result) => {
    const parsedResult = {
        japanese        : result.japanese[0].word,
        japaneseReading : result.japanese[0].reading,
        definitions     : [],
    }
    if (result.jlpt[0]) parsedResult.jlpt = "JLPT " + result.jlpt[0].split("-")[1].toUpperCase()
    if (result.senses[0].parts_of_speech[0]) parsedResult.wordType = result.senses[0].parts_of_speech[0] 
    result.senses.forEach(sense => {
        const joinedSense = sense.english_definitions.join(", ")
        const capitalizedSense = joinedSense.charAt(0).toUpperCase() + joinedSense.slice(1)
        parsedResult.definitions.push(capitalizedSense)
    });
    return parsedResult
}

module.exports = { makeRequest, parseResult }