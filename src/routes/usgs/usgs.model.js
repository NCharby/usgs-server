// @flow
import axios from 'axios'
import CONFIG  from '../../config/env'
import { USGS_API } from '../../config/constants'

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $USGSResponse,
    type $USGSParams,
    type $USGSFeature,
    type QuakeMeta
} from './usgs.types.js'


export async function GetQuakes(query: $USGSParams): Promise<$USGSResponse> {
    try {
        const { data } = await axios.get(USGS_API, { 
            params: {
                format: 'geojson',
                ...query,
            }
        })
        return data
    } catch (error) {
        console.error(error.message)
        throw new Error('USGS quake data failed')
    }
}

//WARNING!: Potentially expensive!
export function GetQuakeMeta(quakes: Array<$USGSFeature>): QuakeMeta {
    let min = 100;
    let max = 0;
    let median = 0

    if(!quakes.length) return emptyMeta
    if(quakes.length === 1) { //edge case
        return {
            min: quakes[0].properties.mag,
            max: quakes[0].properties.mag,
            median: quakes[0].properties.mag,
            count: 1
        }
    }

    const sorted = quakes.sort((a, b) =>{
        //grab the min max while we're looping
        if(a.properties.mag < min) min = a.properties.mag
        if(a.properties.mag > max) max = a.properties.mag
        return a.properties.mag - b.properties.mag
    })

    const mid = Math.floor(sorted.length / 2)
    console.log(sorted.length, mid, sorted[mid])
    if(sorted.length % 2 !== 0){
        median = sorted[mid].properties.mag
    } else {
        median = (sorted[mid - 1].properties.mag + sorted[mid].properties.mag) / 2
    }


    return {
        min,
        max,
        //$FlowFixMe
        median,
        count: quakes.length,
    }

}

//Empty meta object for edge case
export const emptyMeta: QuakeMeta = {
    min: 0,
    max: 0,
    median: 0,
    count: 0
}