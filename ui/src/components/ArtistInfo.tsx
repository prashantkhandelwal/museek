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
        const [artistImage, setArtistImage] = useState<string | undefined>(defaultImage);

        const getArtistImage = (artistRels: ArtistInfoResponse | undefined) => {
            setArtistImage(undefined);
            console.log('get image called');
            artistRels?.relations.map((a) => {
                if (a.type === "image") {
                    artistInfoProvider.getArtistImage(a.url.resource)
                        .then((response: any) => {
                            setArtistImage(response.result);
                            return undefined;
                        })
                }
                return undefined;
            });
        }

        useEffect(() => {
            if (artistId) {
                artistInfoProvider.getArtistInfo(artistId).then((response: ArtistInfoResponse) => {
                    setArtistInfo(response);
                    getArtistImage(response);
                });
            }
        }, [artistInfoProvider, artistId])

        return (
            <Wrapper>
                <div>
                    {
                        (artistInfo) ?
                            <div>
                                <div className="artistImage">{(artistImage) ?
                                    <img src={artistImage} key={artistImage} alt={artistInfo.name} width={350} />
                                    :
                                    <Skeleton component="div" style={{ margin: "auto" }} animation="pulse" variant="rectangular" width={350} height={350} />
                                }
                                </div>
                                <Typography variant="inherit" align="center" component="div" gutterBottom>{artistInfo?.name}</Typography>
                                <p>{artistInfo?.country}</p>
                                <p>{artistInfo?.gender}</p>
                                <p>{artistInfo?.type}</p>
                            </div> : <>
                            </>
                    }
                </div>
            </Wrapper>
        )
    }