export interface Genre {
    result: [];
}

export interface IGenreProvider {
    getGenres(): Promise<Genre>;
}