import React, { useEffect, useState } from "react";
import { ArtistInfoResponse } from "../models/interfaces/ArtistInfo";
import { IArtistInfoProvider } from "../providers/contracts/IArtistInfoProvider";

interface IArtistProps {
    artistId: string | undefined;
    artistInfoProvider: IArtistInfoProvider;
}

export const ArtistInfo: React.FC<IArtistProps>
    = (props: IArtistProps) => {

        let { artistInfoProvider, artistId } = props;

        const [artistInfo, setArtistInfo] = useState<ArtistInfoResponse>();
        const [artistImage, setArtistImage] = useState<string>();

        const getArtistImage = (artistRels: ArtistInfoResponse | undefined) => {
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

            <div>{(artistInfo) ?
                <div>
                    Artist Info:
                    <div>

                        <img src={artistImage} key={artistImage} alt={artistInfo.name} />
                    </div>
                    <p>
                        {
                            artistInfo?.name
                        }
                    </p>
                    <p>{artistInfo?.country}</p>
                    <p>{artistInfo?.gender}</p>
                    <p>{artistInfo?.type}</p>
                </div> : <></>
            }
            </div>
        )
    }