import { useState } from "react";
import { ArtistSearch } from "./components/ArtistSearch";
import Recordings from "./components/Recordings";
import { Artist } from "./models/Artist";
import { IRecordingProvider } from "./models/Recording";

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
            <Recordings
                recordingProvider={props.recordingProvider}
                artist={artist} />
        </div>
    )
}

export default Main;