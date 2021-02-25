// @flow
import axios from 'axios'
import CONFIG  from '../../config/env'
import { MAPBOX_API } from '../../config/constants'

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $MBGeocodeResponse
} from './geocode.types.js'

export async function GetLatLng(query: string | Array<string>): Promise<$MBGeocodeResponse> {
    try {
        const { data } = await axios.get(
            //$FlowFixMe
            `${MAPBOX_API}geocoding/v5/mapbox.places/${query}.json`, { 
            params: {
                'access_token': CONFIG.MAPBOX_TOKEN
            }
        })
        return data
    } catch (error) {
        console.error(error.message)
        throw new Error('Geocoding unavailable')
    }
}