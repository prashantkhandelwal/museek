export interface RecordingResponse {
    "recording-count": number
    recordings: Recording[]
    "recording-offset"?: number
}

export interface Recording {
    rating: Rating
    disambiguation: string
    length?: number
    title: string
    id: string
    genres: Genre[]
    video: boolean
    "artist-credit": ArtistCredit[]
    tags: Tag2[]
    "first-release-date"?: string
}

export interface Rating {
    "votes-count": number
    value?: number
}

export interface Genre {
    count: number
    name: string
    disambiguation: string
    id: string
}

export interface ArtistCredit {
    artist: Artist
    name: string
    joinphrase: string
}

export interface Artist {
    type?: string
    name: string
    "type-id"?: string
    disambiguation: string
    tags: Tag[]
    id: string
    "sort-name": string
    genres: Genre2[]
}

export interface Tag {
    count: number
    name: string
}

export interface Genre2 {
    id: string
    disambiguation: string
    name: string
    count: number
}

export interface Tag2 {
    name: string
    count: number
}
