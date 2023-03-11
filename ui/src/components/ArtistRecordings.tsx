import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/ArtistRecording.style";
import { Artist } from "../models/interfaces/Artist";
import { Recording, RecordingResponse } from "../models/interfaces/Recording";
import { IRecordingProvider } from "../providers/contracts/IRecordingProvider";
import { RecordingView } from "./RecordingView";

interface IRecordingProps {
    recordingProvider: IRecordingProvider;
    artist?: Artist;
}

export const Recordings: React.FC<IRecordingProps> = (props: IRecordingProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [recordingCount, setRecordingCount] = useState<number>(0);
    const [allRecordings, setAllRecordings] = useState<Recording[]>([]);

    let { recordingProvider, artist } = props;
    useEffect(() => {
        if (artist) {
            setLoading(true);
            recordingProvider.getAllRecordings(artist?.id).then((response: RecordingResponse) => {
                setRecordingCount(response["recording-count"]);
                setLoading(false);
                setAllRecordings(response.recordings);
            });
        }
    }, [recordingProvider, artist])

    return (
        <Wrapper>
            <div className="rtext">
                {(loading) ?
                    <div>
                        <CircularProgress />
                    </div> : <></>
                }
            </div>
            <div className="rtext">
                <span>Total recordings found: {recordingCount}</span>
            </div>
            <div>
                <RecordingView allRecordings={allRecordings} />
            </div>
        </Wrapper>
    )
}

export default Recordings;