import { useState } from "react";
import { ArtistSearch } from "./components/ArtistSearch";
import { Artist } from "./models/interfaces/Artist";
import ArtistRecordings from "./components/ArtistRecordings";
import { IRecordingProvider } from "./providers/contracts/IRecordingProvider";

interface IMainProps {
    recordingProvider: IRecordingProvider;
}

export const Main: React.FC<IMainProps> = (props: IMainProps) => {
    //const [recordingCount, setRecordingCount] = useState<number>();
    //const [loading, setLoading] = useState<boolean>(false);

    const [artist, setArtist] = useState<Artist>();
    const getSelectedArtist = (artist: Artist | undefined) => {
        if (artist) setArtist(artist)
    }

    // const getTotalRecordings = (count: number) => {
    //     setRecordingCount(count);
    // }

    // const getLoadingStatus = (b: boolean) => {
    //     setLoading(b);
    // }

    return (
        <div>
            <ArtistSearch
                selectedArtist={getSelectedArtist} />
            <ArtistRecordings
                recordingProvider={props.recordingProvider}
                artist={artist} />
        </div>
    )
}

export default Main;