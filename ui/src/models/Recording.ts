export interface IRecording {
    "recording-count": number
    "recording-offset": number
}

export interface IRecordingProvider {
    getArtistRecording(artistId: string | undefined): Promise<IRecording>;
}