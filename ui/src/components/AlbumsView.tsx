import { useLocation } from "react-router-dom";
import { IAlbumsProvider } from "../providers/contracts/IAlbumsProvider";
import { useEffect, useState } from "react";
import { Albums, Release } from "../models/interfaces/Albums";

export interface IAlbumsProps {
    albumProvider: IAlbumsProvider;
    artistId?: string;
}

export const AlbumsView: React.FC<IAlbumsProps> = (props: IAlbumsProps) => {

    const location = useLocation();
    let artistId = location.state.artistId;
    const [loading, setLoading] = useState<boolean>(false);
    const [allAlbums, setAllAlbums] = useState<Release[] | undefined>(undefined);

    useEffect(() => {
        if (artistId && !loading) {
            setLoading(false);
            console.log(artistId);
            props.albumProvider.getArtistAlbums(artistId)
                .then((response: Albums) => {
                    setAllAlbums(response.releases);
                });
            setLoading(true);
        }
    }, [artistId, setLoading, loading, props])

    return (
        <h1>
            Albums View for artist: {artistId}
            <div>
                <span>
                    {allAlbums?.map((a) => (
                        <p>{a.title}</p>
                    ))}
                </span>
            </div>
        </h1>
    )
}