export interface Recording {
    "recording-count": number
    "recording-offset": number
}

export interface IRecordingProvider {
    getArtistRecording(artistId: string | undefined): Promise<Recording>;
}