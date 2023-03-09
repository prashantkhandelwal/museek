import axios from "axios";
import { Genre } from "../models/interfaces/Genre";
import { IGenreProvider } from "./contracts/IGenreProvider";

export default class GenreProvider implements IGenreProvider {
    getGenres(): Promise<Genre> {
        let url = "http://localhost:9999/genre";
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }
}



