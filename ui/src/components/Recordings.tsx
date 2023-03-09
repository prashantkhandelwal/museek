import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Artist } from "../models/interfaces/Artist";
import { Recording } from "../models/interfaces/Recording";
import { IRecordingProvider } from "../providers/contracts/IRecordingProvider";

interface IRecordingProps {
    recordingProvider: IRecordingProvider;
    artist?: Artist;
}

export const Recordings: React.FC<IRecordingProps> = (props: IRecordingProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [recordingCount, setRecordingCount] = useState<number>(0);

    useEffect(() => {
        if (props.artist) {
            setLoading(true);
            props.recordingProvider.getArtistRecording(props.artist?.id)
                .then((recordings: Recording) => {
                    setRecordingCount(recordings["recording-count"]);
                    setLoading(false);
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