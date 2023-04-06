export interface Albums {
    releases: Release[]
    "release-offset": number
    "release-count": number
}

export interface Release {
    status?: string
    "text-representation": TextRepresentation
    date: string
    packaging?: string
    "cover-art-archive": CoverArtArchive
    title: string
    id: string
    asin?: string
    "release-events": Event[]
    quality: string
    disambiguation: string
    "status-id"?: string
    "packaging-id"?: string
    country?: string
    barcode?: string
}

export interface TextRepresentation {
    script?: string
    language?: string
}

export interface CoverArtArchive {
    darkened: boolean
    back: boolean
    front: boolean
    count: number
    artwork: boolean
}

export interface Event {
    date: string
    area?: Area
}

export interface Area {
    name: string
    "type-id": any
    type: any
    "sort-name": string
    disambiguation: string
    id: string
    "iso-3166-1-codes": string[]
}
