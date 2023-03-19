import { MusicNote } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Rating, Typography } from "@mui/material";
import { Recording } from "../models/interfaces/Recording";
import { Wrapper } from "./styles/Record.style";

interface IRecord {
    data: Recording;
}

export const Record: React.FC<IRecord> = (props: IRecord) => {
    let colors = ["orange", "mint", "sage", "lightblue", "lightgreen", "cyan", "pink"];

    const msToTime = (duration: number): string => {
        let seconds: number = Math.floor((duration / 1000) % 60);
        let minutes: number = Math.floor((duration / (1000 * 60)) % 60);
        let hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? 0 + hours : hours;
        minutes = (minutes < 10) ? 0 + minutes : minutes;
        seconds = (seconds < 10) ? 0 + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    return (
        <Wrapper>
            {(!props.data.video) ?
                <Box width="350px" paddingBottom={0}>
                    <Card>
                        <CardContent>
                            <Typography variant="inherit" align="center" component="div">
                                <span className="rkeys">{props.data.title}</span>

                            </Typography>
                            <Typography variant="inherit" align="center" component="div" gutterBottom>
                                <span className="rvalues">
                                    {
                                        props.data["artist-credit"].map((c) => (
                                            <span>{c.artist.name} {c.joinphrase} </span>
                                        ))
                                    }
                                </span>
                            </Typography>
                            <Typography variant="inherit" align="center" component="div">
                                <span><Rating name="read-only" value={props.data.rating.value} readOnly /></span>
                            </Typography>
                            <Typography variant="inherit" align="center" component="div" gutterBottom>
                                <span className="rvalues">{(props.data.length) ? msToTime(props.data.length) : "n/a"}</span>
                                &nbsp;&nbsp;
                                <span className="rvalues">{props.data["first-release-date"]}</span>
                            </Typography>
                            <Typography variant="inherit" align="center" component="div">
                                {
                                    props.data.genres.map((g, i) => (
                                        <Chip key={i}
                                            style={{
                                                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                marginTop: 5, marginLeft: 5
                                            }}
                                            icon={<MusicNote />}
                                            size="small"
                                            label={g.name} />
                                    ))
                                }
                            </Typography>
                            <Typography variant="inherit" align="left" component="div">

                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                : <></>
            }
        </Wrapper >
    )
}