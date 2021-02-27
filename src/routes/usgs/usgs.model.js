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
    let total = 0;
    //there's likely a tidyer way to do this,
    // but this is readable
    quakes.forEach( q => {
        const { properties } = q
        //build a sum for the mean
        total += properties.mag   
        //test for min
        if(properties.mag < min) min = properties.mag
        //and max
        if(properties.mag > max) max = properties.mag
    })

    return {
        min,
        max,
        mean: total / quakes.length,
        count: quakes.length
    }

}

//Empty meta object for edge case
export const emptyMeta: QuakeMeta = {
    min: 0,
    max: 0,
    mean: 0,
    count: 0
}