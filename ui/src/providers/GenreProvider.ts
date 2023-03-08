import axios from "axios";
import { Genre, IGenreProvider } from "../models/Genre";

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



