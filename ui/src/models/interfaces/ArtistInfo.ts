export interface ArtistInfoResponse {
    id: string;
    name: string;
    country: string;
    disambiguation: string;
    type: string;
    gender: string;
    relations: Relation[];
    genres: Genre[];
    "life-span": LifeSpan;
}

export interface Genre {
    disambiguation: string
    name: string
    count: number
    id: string
}

export interface LifeSpan {
    end: any
    begin: string
    ended: boolean
}

export interface Relation {
    begin: any
    "target-type": string
    attributes: any[]
    type: string
    url: Url
    direction: string
    end?: string
    "source-credit": string
    ended: boolean
    "type-id": string
}

export interface Url {
    id: string
    resource: string
}