import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/ArtistRecording.style";
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
            });
        }
    }, [props])

    // if (loading) return (
    //     <Wrapper>
    //         <div>
    //             <Box sx={{ left: 120, display: 'flex', position: "absolute" }}>
    //                 <CircularProgress />
    //             </Box>
    //         </div>
    //     </Wrapper>
    // )

    return (
        <Wrapper>
            <div className="rtext">
                {(loading) ?
                    <div>
                        <CircularProgress />
                    </div> :
                    <span>Total recordings found: {recordingCount}</span>
                }
            </div>
        </Wrapper>
    )
}

export default Recordings;