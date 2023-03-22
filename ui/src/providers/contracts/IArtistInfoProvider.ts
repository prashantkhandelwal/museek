import { ArtistInfoResponse } from "../../models/interfaces/ArtistInfo";

export interface IArtistInfoProvider {
    getArtistInfo(artistId: string | undefined): Promise<ArtistInfoResponse>;
    getArtistImage(artistUrl: string): Promise<string>;
}