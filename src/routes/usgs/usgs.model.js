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
    type $USGSParams
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