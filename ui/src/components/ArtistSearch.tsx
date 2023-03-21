import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./styles/ArtistSearch.style";
import { Artist } from "../models/interfaces/Artist";

interface IArtistProps {
    selectedArtist(artist: Artist): void;
}

export const ArtistSearch: React.FC<IArtistProps>
    = (props: IArtistProps) => {
        const [artist, setArtist] = useState<Artist>();
        const [artistAuto, setArtistAuto] = useState<Artist[]>([]);

        const SearchArtist = (s: string) => {
            if (s === undefined) return;
            if (s === "") return;
            let url = "http://localhost:9999/artist/" + s;
            axios.get<Artist[]>(url).then((response: any) => {
                setArtistAuto(response.data.result);
            });
        }

        useEffect(() => {
            if (artist?.id) {
                props.selectedArtist(artist);
            }
        }, [artist, props]);

        //const notify = () => toast("Wow so easy !");

        return (
            <Wrapper>
                <div>
                    {
                        <Autocomplete
                            id="asynchronous-demo"
                            freeSolo
                            filterOptions={(x) => x}
                            sx={{ width: 1300 }}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option: any) => option.name || ""}
                            options={artistAuto}
                            onChange={(event, selectedArtist: any) => {
                                if (selectedArtist) {
                                    console.log(selectedArtist);
                                    setArtist(selectedArtist);
                                }
                            }}
                            onInputChange={(event, newInputValue) => {
                                if (newInputValue.length >= 3) {
                                    SearchArtist(newInputValue);
                                }
                            }}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.name}
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Artist Search"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    }
                </div>
            </Wrapper>
        )
    }
