import React, { useEffect, useState } from "react";
import { ArtistInfoResponse } from "../models/interfaces/ArtistInfo";
import { IArtistInfoProvider } from "../providers/contracts/IArtistInfoProvider";
import defaultImage from "../assets/placeholderimg.jpg";
import { Wrapper } from "./styles/ArtistInfo.style";
import { Box, Card, CardContent, CardMedia, Chip, Skeleton, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface IArtistProps {
    artistId: string | undefined;
    artistInfoProvider: IArtistInfoProvider;
}

export const ArtistInfo: React.FC<IArtistProps>
    = (props: IArtistProps) => {

        let { artistInfoProvider, artistId } = props;

        const [artistInfo, setArtistInfo] = useState<ArtistInfoResponse>();
        const [artistImage, setArtistImage] = useState<string | undefined>(undefined);
        const [done, setDone] = useState(false);

        const getArtistImage = async (artistRels: ArtistInfoResponse | undefined) => {
            let relCount: number | undefined = artistRels?.relations.length;
            await new Promise((resolve) => {
                setArtistImage(undefined);

                if (relCount && artistRels) {
                    for (let items of artistRels?.relations) {
                        if (items.type === "image") {
                            setDone(true);
                            artistInfoProvider.getArtistImage(items.url.resource)
                                .then((response: any) => {
                                    setArtistImage(response.result);
                                })
                            break;
                        } else {
                            setDone(false);
                            setArtistImage(undefined);
                        }
                    }
                }
            });
        }

        useEffect(() => {
            if (artistId) {
                artistInfoProvider.getArtistInfo(artistId).then(async (response: ArtistInfoResponse) => {
                    setArtistInfo(response);
                    await getArtistImage(response);
                });
            }
        }, [artistInfoProvider, artistId])

        return (
            <Wrapper>
                <div id="artistInfo">
                    {
                        (artistInfo) ?
                            <div>
                                <Box minWidth="100%" paddingBottom={0}>
                                    <Card sx={{ display: "flex" }}>
                                        {(artistImage !== undefined && done) ?
                                            <CardMedia component="img" sx={{ width: 251, height: 251 }} image={artistImage} alt={artistInfo.name} />
                                            : (artistImage === undefined && !done) ?
                                                <CardMedia component="img" sx={{ width: 251, height: 251 }} image={defaultImage} alt={artistInfo.name} />
                                                : <Skeleton component="div" animation="pulse" variant="rectangular" width={251} height={251} />
                                        }
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <CardContent sx={{ flex: "5 5 auto" }}>
                                                <Typography component="div" variant="h6">
                                                    {artistInfo.name} ({artistInfo["life-span"].begin}
                                                    {(artistInfo["life-span"].ended) ? " - " + artistInfo["life-span"].end : " - Present"})
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    {artistInfo.type}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                    {artistInfo.country}
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{ display: "table-column", alignItems: 'center' }}>
                                                {
                                                    artistInfo.genres.map((genre, i) => (
                                                        <Chip
                                                            sx={{ marginLeft: 0.5, marginBottom: 1 }}
                                                            key={i}
                                                            icon={<MusicNote />}
                                                            label={genre.name}
                                                        />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <CardContent sx={{ flex: "5 5 auto" }}>
                                                <Typography component="div" variant="body2">
                                                    <Link to={`/recordings/${artistId}`} state={{ artistId: artistId }}>Recordings</Link>
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Albums
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                    Something else
                                                </Typography>
                                            </CardContent>
                                        </Box>

                                    </Card>
                                </Box>
                            </div> : <></>
                    }
                </div>
            </Wrapper >
        )
    }