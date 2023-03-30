import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/ArtistRecording.style";
import { Artist } from "../models/interfaces/Artist";
import { Recording, RecordingResponse } from "../models/interfaces/Recording";
import { IRecordingProvider } from "../providers/contracts/IRecordingProvider";
import { RecordingView } from "./RecordingView";
import { useLocation } from "react-router-dom";

interface IRecordingProps {
    recordingProvider: IRecordingProvider;
    artist?: Artist;
}

export const Recordings: React.FC<IRecordingProps> = (props: IRecordingProps) => {

    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [recordingCount, setRecordingCount] = useState<number | undefined>(undefined);
    const [allRecordings, setAllRecordings] = useState<Recording[]>([]);

    let { recordingProvider } = props;
    let artistId = location.state.artistId;
    useEffect(() => {
        if (artistId) {
            setLoading(true);
            setRecordingCount(undefined);
            recordingProvider.getAllRecordings(artistId).then((response: RecordingResponse) => {
                setRecordingCount(response["recording-count"]);
                setLoading(false);
                setAllRecordings(response.recordings);
            });
        }
    }, [recordingProvider, artistId])

    return (
        <Wrapper>
            <div className="rtext">
                {(loading) ?
                    <div>
                        <CircularProgress />
                    </div> : <></>
                }
            </div>
            {(recordingCount) ?
                <div>
                    <div className="rtext">
                        <span>Total recordings found: {recordingCount}</span>
                    </div>
                    <div>
                        <RecordingView allRecordings={allRecordings} />
                    </div>
                </div> : <></>
            }
        </Wrapper>
    )
}

export default Recordings;