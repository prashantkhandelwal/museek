import React, { useEffect, useState } from "react";
import { ArtistInfoResponse } from "../models/interfaces/ArtistInfo";
import { IArtistInfoProvider } from "../providers/contracts/IArtistInfoProvider";
import defaultImage from "../assets/placeholderimg.jpg";
import { Wrapper } from "./styles/ArtistInfo.style";
import { Skeleton, Typography } from "@mui/material";

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
                <div>
                    {
                        (artistInfo) ?
                            <div>
                                <div className="artistImage">{(artistImage !== undefined && done) ?
                                    <img style={{ margin: "auto" }} src={artistImage} key={artistImage} alt={artistInfo.name} width={350} />
                                    : (artistImage === undefined && !done) ?
                                        <img style={{ margin: "auto" }} src={defaultImage} key={artistImage} alt={artistInfo.name} width={350} />
                                        : <Skeleton component="div" style={{ margin: "auto" }} animation="pulse" variant="rectangular" width={350} height={350} />
                                }
                                </div>
                                <Typography variant="inherit" align="center" component="div" gutterBottom>{artistInfo?.name}</Typography>
                                <p>{artistInfo?.country}</p>
                                <p>{artistInfo?.gender}</p>
                                <p>{artistInfo?.type}</p>
                            </div> : <></>
                    }
                </div>
            </Wrapper >
        )
    }