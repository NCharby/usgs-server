// @flow

export type $USGSResponse = {
    type: string,
    features: Array<$USGSFeature>,
    bbox: Array<number>
}

export type $USGSFeature = {
    type: string,
    properties: {
        mag: number,
        place: string,
        time: number,
        updated: number,
        url: string,
        title: string
    }
}

export type $USGSParams = {
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    latitude: number,
    longitude: number,
    maxradiuskm: number
}

export type $UIRequestCoords = {|
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    maxradiuskm: number,
    coordinates: Array<number>,
    search: ?string
|}

export type $UIRequestSearch = {|
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    maxradiuskm: number,
    coordinates: ?Array<number>,
    search: string
|}