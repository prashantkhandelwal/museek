import { Genre } from "../../models/interfaces/Genre";

export interface IGenreProvider {
    getGenres(): Promise<Genre>;
}