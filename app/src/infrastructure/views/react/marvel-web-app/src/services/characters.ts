import { API_HOST } from "../config"
import { Comic, MarvelCharacter } from "./types";

export const getCharacters = async () => {
    try {
        const response = await fetch(`http://${API_HOST}/api/characters`)

        if (!response.ok) {
            return new Error(`Failed to fetch characters ${response.statusText}`)
        }
        const characters = await response.json();
        return characters as Array<MarvelCharacter>
    } catch (error) {
        console.log(error)
    }
}

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