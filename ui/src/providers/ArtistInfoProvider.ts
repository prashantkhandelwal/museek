import axios from "axios";
import { ArtistInfoResponse } from "../models/interfaces/ArtistInfo";
import { IArtistInfoProvider } from "./contracts/IArtistInfoProvider";

export default class ArtistInfoProvider implements IArtistInfoProvider {
    getArtistInfo(artistId: string | undefined): Promise<ArtistInfoResponse> {
        let url = "https://musicbrainz.org/ws/2/artist/" + artistId + "?inc=url-rels+genres&fmt=json";
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }

    getArtistImage(artistUrl: string): Promise<string> {
        let url = "http://localhost:9999/artistimage"
        const params = new URLSearchParams();
        params.append("url", artistUrl);
        return axios.post(url, params).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        })
    }
}