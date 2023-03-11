import { Chip, LinearProgress } from "@mui/material";
import { MusicNote } from '@mui/icons-material';
import { Genre } from "../models/interfaces/Genre";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/GenreCloud.style";
import { IGenreProvider } from "../providers/contracts/IGenreProvider";

interface IGenreProps {
    genreprovider: IGenreProvider;
}

export const GenreCloud: React.FC<IGenreProps>
    = (props: IGenreProps) => {
        const [genres, setGenres] = useState<Genre>();
        const [isLoading, setIsLoading] = useState<boolean>(false);
        let colors = ["orange", "mint", "sage", "lightblue", "lightgreen", "cyan", "pink"];

        useEffect(() => {
            setIsLoading(true);
            props.genreprovider.getGenres().then((response: Genre) => {
                setGenres(response);
                setIsLoading(false);
            });
        }, [props])

        if (isLoading) return <LinearProgress />

        return (
            <Wrapper>
                <div>
                    {
                        genres?.result.map((genre, i) => (
                            <Chip key={i} style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                                icon={<MusicNote />}
                                clickable={true}
                                component="a"
                                href="#basic-chip"
                                label={genre} />
                        ))
                    }
                </div>
            </Wrapper>
        )
    }

export default GenreCloud;