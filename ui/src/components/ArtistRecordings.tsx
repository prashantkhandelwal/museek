import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Artist } from "../models/interfaces/Artist";
import { RecordingResponse } from "../models/interfaces/Recording";
import { IRecordingProvider } from "../providers/contracts/IRecordingProvider";

interface IRecordingProps {
    recordingProvider: IRecordingProvider;
    artist?: Artist;
}

export const Recordings: React.FC<IRecordingProps> = (props: IRecordingProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [recordingCount, setRecordingCount] = useState<number>(0);
    //const [recordings, setRecordings] = useState<RecordingResponse>();

    useEffect(() => {
        if (props.artist) {
            setLoading(true);
            props.recordingProvider.getAllRecordings(props.artist?.id).then((response: RecordingResponse) => {
                setRecordingCount(response["recording-count"]);
                setLoading(false);
                console.log(response.recordings);
            });
        }
    }, [props])

    if (loading) return (
        <div>
            <Box sx={{ left: 120, display: 'flex', position: "absolute" }}>
                <CircularProgress />
            </Box>
        </div>
    )

    return (
        <div>
            <h1>
                Total recordings found: {recordingCount}
            </h1>
        </div>
    )
}

export default Recordings;