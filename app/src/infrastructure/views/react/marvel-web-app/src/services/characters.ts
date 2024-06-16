import { API_HOST } from "../config"
import { Comic, MarvelCharacter } from "./types";

/**
 * Retrieves a list of Marvel characters based on the provided query string.
 *
 * @param {string} query - The query string to search for characters by name. Defaults to an empty string.
 * @return {Promise<Array<MarvelCharacter>>} A promise that resolves to an array of Marvel characters matching the query.
 * If an error occurs during the fetch request, an Error object is returned.
 */
export const getCharacters = async (query: string = '') => {
    try {
        const queryParam = query ? `?q=${query}` : ''
        const response = await fetch(`http://${API_HOST}/api/characters${queryParam}`)

        if (!response.ok) {
            return new Error(`Failed to fetch characters ${response.statusText}`)
        }
        const characters = await response.json();
        return characters as Array<MarvelCharacter>
    } catch (error) {
        console.log(error)
    }
}

/**
 * Retrieves the comics associated with a Marvel character by its ID.
 *
 * @param {string} id - The ID of the character.
 * @return {Promise<Array<Comic> | Error>} A promise that resolves to an array of comics associated with the character, or rejects with an error if the fetch request fails.
 */
export const getCharacterComics = async (id: string) => {
    try {
        const response = await fetch(`http://${API_HOST}/api/characters/${id}/comics`)
        if (!response.ok) {
            return new Error(`Failed to fetch character ${response.statusText}`)
        }
        const character = await response.json();
        return character as Array<Comic>
    } catch (error) {
        console.log(error)
    }
}