import { RecordingResponse } from "../../models/interfaces/Recording";

export interface IRecordingProvider {
    getArtistRecording(artistId: string | undefined): Promise<RecordingResponse>;
    getAllRecordings(artistId: string): Promise<RecordingResponse>;
}