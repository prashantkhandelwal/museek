import { Grid } from "@mui/material";
import { Recording } from "../models/interfaces/Recording";
import { Record } from "./Record";

interface IRecordingProps {
    allRecordings: Recording[];
}

export const RecordingView: React.FC<IRecordingProps>
    = (props: IRecordingProps): JSX.Element => {
        return (
            <div>
                {
                    <div>
                        <Grid container spacing={4}>
                            {
                                props.allRecordings.map((e: Recording) => (
                                    <Grid key={e.id} item xs>
                                        <Record key={e.id} data={e} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                }
            </div>
        )
    }
