import { useState } from "react";
import { ArtistSearch } from "./components/ArtistSearch";
import { Artist } from "./models/interfaces/Artist";
import ArtistRecordings from "./components/ArtistRecordings";
import { IRecordingProvider } from "./providers/contracts/IRecordingProvider";
import { ArtistInfo } from "./components/ArtistInfo";
import { IArtistInfoProvider } from "./providers/contracts/IArtistInfoProvider";
import ArtistInfoProvider from "./providers/ArtistInfoProvider";

interface IMainProps {
    recordingProvider: IRecordingProvider;
    artistInfoProvider: IArtistInfoProvider;
}

export const Main: React.FC<IMainProps> = (props: IMainProps) => {
    //const [recordingCount, setRecordingCount] = useState<number>();
    const [artist, setArtist] = useState<Artist>();

    const getSelectedArtist = (artist: Artist | undefined) => {
        if (artist) setArtist(artist)
    }

    // const artistRecordings = (allrecordings: Recording[]) => {
    //     if (allrecordings) setAllRecordings(allrecordings);
    // }

    // const getTotalRecordings = (count: number) => {
    //     setRecordingCount(count);
    // }

    return (
        <div>
            <ArtistSearch
                selectedArtist={getSelectedArtist} />
            <ArtistInfo artistId={artist?.id}
                artistInfoProvider={props.artistInfoProvider} />

            {/* <ArtistRecordings
                recordingProvider={props.recordingProvider}
                artist={artist} /> */}
        </div>
    )
}

export default Main;