import axios from "axios";
import { Recording } from "../models/interfaces/Recording";
import { IRecordingProvider } from "./contracts/IRecordingProvider";

export default class RecordingProvider implements IRecordingProvider {

    public getArtistRecording(artistId: string): Promise<Recording> {
        let url = "https://musicbrainz.org/ws/2/recording/?artist=" + artistId + "&offset=0&limit=100&fmt=json&inc=artist-credits";
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }
}
