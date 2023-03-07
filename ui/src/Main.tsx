import { useState } from "react";
import { ArtistSearch } from "./components/ArtistSearch";
import RecordingList from "./components/RecordingList";
import { IRecordingProvider } from "./models/Recording";

interface IMainProps {
    recordingProvider: IRecordingProvider;
}

export const Main: React.FC<IMainProps> = (props: IMainProps) => {

    const [recordingCount, setRecordingCount] = useState<number>();

    const getTotalRecordings = (count: number) => {
        setRecordingCount(count);
    }

    return (
        <div>
            <ArtistSearch recodingProvider={props.recordingProvider} recordingCount={getTotalRecordings} />
            <RecordingList recordingCount={recordingCount} />
        </div>
    )
}

export default Main;