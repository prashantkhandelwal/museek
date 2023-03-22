export interface ArtistInfoResponse {
    id: string;
    name: string;
    country: string;
    type: string;
    gender: string;
    relations: Relation[];
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