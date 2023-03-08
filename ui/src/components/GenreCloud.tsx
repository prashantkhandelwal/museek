import { Chip } from "@mui/material";
import { MusicNote } from '@mui/icons-material';
import { Genre, IGenreProvider } from "../models/Genre";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/GenreCloud.style";

interface IGenreProps {
    genreprovider: IGenreProvider;
}

export const GenreCloud: React.FC<IGenreProps> = (props: IGenreProps) => {

    const [genres, setGenres] = useState<Genre>();
    let colors = ["orange", "mint", "sage", "lightblue", "lightgreen", "cyan", "pink"];
    useEffect(() => {
        props.genreprovider.getGenres().then((response: Genre) => {
            setGenres(response);
        });
    }, [props])

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