import { Recording } from "../models/interfaces/Recording";

interface IRecordingProps {
    allRecordings: Recording[];
}


export const RecordingView: React.FC<IRecordingProps>
    = (props: IRecordingProps): JSX.Element => {
        return (
            <div>
                {
                    <div>
                        {
                            props.allRecordings.map((e) => (
                                <p key={e.id}>
                                    {e.title}
                                </p>
                            ))
                        }
                    </div>
                }

            </div>
        )
    }
