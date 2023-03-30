import React, { useEffect, useState } from "react";
import { ArtistInfoResponse } from "../models/interfaces/ArtistInfo";
import { IArtistInfoProvider } from "../providers/contracts/IArtistInfoProvider";
import defaultImage from "../assets/placeholderimg.jpg";
import { Wrapper } from "./styles/ArtistInfo.style";
import { Box, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import AlbumIcon from '@mui/icons-material/Album';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { useNavigate } from "react-router-dom";

interface IArtistProps {
    artistId: string | undefined;
    artistInfoProvider: IArtistInfoProvider;
}

export const ArtistInfo: React.FC<IArtistProps>
    = (props: IArtistProps) => {

        let { artistInfoProvider, artistId } = props;

        const navigate = useNavigate();
        const [artistInfo, setArtistInfo] = useState<ArtistInfoResponse>();
        const [artistImage, setArtistImage] = useState<string | undefined>(undefined);
        const [done, setDone] = useState(false);

        const handleNavigate = (path: string, Id: string | undefined) => {
            navigate(path + artistId, { state: { artistId: Id } })
        }

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
                                    <Card sx={{ display: "inline-flex" }}>
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
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <CardActions disableSpacing sx={{ display: "table-column" }}>
                                                <Typography variant="inherit" component="div">
                                                    <IconButton aria-label="view all songs" onClick={() => handleNavigate("/recordings/", artistId)}>
                                                        <Tooltip title="Songs" placement="right-start">
                                                            <AudiotrackIcon />
                                                        </Tooltip>
                                                    </IconButton>
                                                </Typography>
                                                <Typography variant="inherit" component="div">
                                                    <IconButton aria-label="view all albums" onClick={() => handleNavigate("/albums/", artistId)}>
                                                        <Tooltip title="Albums" placement="right-start">
                                                            <AlbumIcon />
                                                        </Tooltip>
                                                    </IconButton>
                                                </Typography>
                                            </CardActions>
                                            {/* <CardContent sx={{ flex: "5 5 auto" }}>
                                                <Typography component="div" variant="body2">
                                                    <Link style={{ textDecoration: "none" }} to={`/recordings/${artistId}`} state={{ artistId: artistId }}><AudiotrackIcon /></Link>
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    <Link to={`/albums/${artistId}`} state={{ artistId: artistId }}>Albums</Link>
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">

                                                </Typography>
                                            </CardContent> */}
                                        </Box>
                                    </Card>
                                </Box>
                            </div> : <></>
                    }
                </div >
            </Wrapper >
        )
    }