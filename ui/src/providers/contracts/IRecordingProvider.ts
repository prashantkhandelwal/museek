import { Recording } from "../../models/interfaces/Recording";

export interface IRecordingProvider {
    getArtistRecording(artistId: string | undefined): Promise<Recording>;
}