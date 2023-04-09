import axios from "axios";
import { Albums } from "../models/interfaces/Albums";
import { IAlbumsProvider } from "./contracts/IAlbumsProvider";

export default class AlbumsProvider implements IAlbumsProvider {
    getArtistAlbums(artistId: string | undefined): Promise<Albums> {
        let url = "https://musicbrainz.org/ws/2/release?artist=" + artistId;
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }
}