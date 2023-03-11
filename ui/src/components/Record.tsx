import { Box, Card, CardContent, Typography } from "@mui/material";
import { Recording } from "../models/interfaces/Recording";
import { Wrapper } from "./styles/Record.style";

interface IRecord {
    data: Recording;
}

export const Record: React.FC<IRecord> = (props: IRecord) => {
    return (
        <Wrapper>
            <Box width="350px" paddingBottom={0}>
                <Card>
                    <CardContent>
                        <Typography variant="inherit" align="left" component="div">
                            <span className="rkeys">Song Name:</span>
                            <span className="rvalues">{props.data.title}</span>
                        </Typography>
                        <Typography variant="inherit" align="left" component="div">
                            <span className="rkeys">Duration:</span>
                            <span className="rvalues">{props.data.length}</span>
                        </Typography>
                        <Typography variant="inherit" align="left" component="div">
                            <span className="rkeys">Release Date:</span>
                            <span className="rvalues">{props.data["first-release-date"]}</span>
                        </Typography>
                        <Typography variant="inherit" align="left" component="div">
                            <span className="rkeys">Genres:</span> {
                                props.data.genres.map((g) => (
                                    <span className="rvalues">{g.name},</span>
                                ))}
                        </Typography>
                        <Typography variant="inherit" align="left" component="div">
                            <span className="rkeys">Ratings:</span>
                            <span className="rvalues">{props.data.rating.value} ({props.data.rating["votes-count"]})</span>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Wrapper>
    )
}