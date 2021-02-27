# Earthquake data sample app

# Setup

`cp .env-sample .env`

Add Mapbox Key and adjust port

`yarn install`

`yarn run prod`


# Routes

## Geocode
`GET /api/0.1/lnglat?q=seattle` Geocode a given place

### Params

| key | type | description |
| --- | ---- | ----------- |
| q | string | A query string |

### Returns
```
type Response = {
    type: string,
    coordinates: Array<number>
}
```


## Earthquakes
`GET /api/0.1/quakes?`

### Params

| key | type | description |
| --- | ---- | ----------- |
| starttime | string | Starting Search Date (UTC) |
| endtime | string | Endinng Search Date (UTC) |
| minmagnitude | number | Lowest magnitude to look for |
| maxradiuskm | number | Search Radius |
| search | string | Location name or coords |

```
export type $UIRequestSearch = {|
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    maxradiuskm: number,
    search: string
|}
```

### Returns
```
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

export type QuakeMeta = {
    median: number | string,
    count: number,
    min: number,
    max: number
}

export type Response = {
    meta: QuakeMeta,
    coodinates: Array<number>,
    quakes: Array<$USGSFeature>
}
```