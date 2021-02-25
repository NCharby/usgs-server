// @flow

export type $MBGeocodeResponse = {
    type: string,
    query: Array<string>,
    features: Array<$MBGeocodeFeature>,
    attribution: string
}

export type $MBGeocodeFeature = {
    id: string,
    type: string,
    place_type: Array<string>,
    relevance: number,
    text: string,
    place_name: string,
    center: Array<number>,
    geometry: MBGeometry
}

export type MBGeometry = {
    type: string,
    coordinates: Array<number>
}