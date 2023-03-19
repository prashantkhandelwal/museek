import axios, { AxiosResponse } from "axios";
import { Recording, RecordingResponse } from "../models/interfaces/Recording";
import { IRecordingProvider } from "./contracts/IRecordingProvider";

export default class RecordingProvider implements IRecordingProvider {
    private r: Recording[] = [];
    private recordingsResponse: RecordingResponse = {
        "recording-count": 0,
        recordings: this.r,
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    GenUrl(artistId: string, offset: number, limit: number): string {
        return `https://musicbrainz.org/ws/2/recording/?artist=${artistId}&offset=${offset}&limit=${limit}&fmt=json&inc=artist-credits+tags+genres+ratings`;
    }



    public getArtistRecording(artistId: string): Promise<RecordingResponse> {
        let url = "https://musicbrainz.org/ws/2/recording/?artist=" + artistId + "&offset=0&limit=100&fmt=json&inc=artist-credits";
        return axios.get(url).then((response: any) => {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response.data);
            }
        });
    }

    public async getAllRecordings(artistId: string): Promise<RecordingResponse> {
        let offset = 0;
        let limit = 100;
        let count = 0;
        let url = this.GenUrl(artistId, offset, limit);
        this.r = [];
        this.recordingsResponse.recordings = this.r;

        for (let i = 0; i <= count; i++) {
            url = this.GenUrl(artistId, offset, limit);
            if (count <= 1000) {
                await this.delay(200);
            } else if (count > 1000) {
                await this.delay(500);
            }

            //https://github.com/axios/axios/issues/1510
            // eslint-disable-next-line
            await axios.get<RecordingResponse>(url).then((response: AxiosResponse<RecordingResponse>) => {
                const { "recording-count": recordingcount } = response.data;
                count = recordingcount;
                this.recordingsResponse["recording-count"] = recordingcount;
                for (let j = 0; j < response.data.recordings.length; j++) {
                    this.recordingsResponse.recordings?.push(response.data.recordings[j]);
                }
            });

            offset += limit;
            if (offset > count) {
                offset = count;
                break;
            }
        }
        return Promise.resolve(this.recordingsResponse);
    }
}
