import { Albums } from "../../models/interfaces/Albums";

export interface IAlbumsProvider {
    getArtistAlbums(artistId: string | undefined): Promise<Albums>;
}