import axios from "axios";
import { IRecordingProvider, IRecording } from "../models/Recording";


export default class RecordingProvider implements IRecordingProvider {

    public getArtistRecording(artistId: string): Promise<IRecording> {
        let url = "https://musicbrainz.org/ws/2/recording/?artist=" + artistId + "&offset=0&limit=100&fmt=json&inc=artist-credits";
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }
}



