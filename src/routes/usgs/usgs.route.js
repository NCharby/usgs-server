// @flow

import { GetQuakes } from "./usgs.model";
import { GetLatLng } from '../geocode/geocode.model'

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $USGSResponse,
    type $USGSFeature,
    type $USGSParams,
    type $UIRequestCoords,
    type $UIRequestSearch
} from './usgs.types.js'

//yeah, this is kinda lazy
//type the req to only be what we want
type UIQuakeQuery = {
    query: $UIRequestCoords | $UIRequestSearch,
    url: string
}

export async function fetchQuakeData(req: UIQuakeQuery, res: $Response): any {
    const {
        starttime,
        endtime,
        minmagnitude,
        maxradiuskm
    }: $UIRequestCoords | $UIRequestSearch = req.query
    
    try {
        let coordinates: Array<number>;
        //where is this place?
        if(req.query.search){
            const { features } = await GetLatLng(req.query.search)
            if(!features[0]){
                res.send({
                    //$FlowFixMe Send back the coords if we're in the ocean
                    coordinates: req.query.search.split(', '),
                    quakes: []
                })
            }
            coordinates = features[0].geometry.coordinates
        } else {
            //the UI told us
            //$FlowFixMe
            coordinates = req.query.coordinates
        }
        //$FlowFixMe
        const longitude = coordinates[0]
        //$FlowFixMe
        const latitude = coordinates[1] 
        
        const d: $USGSResponse = await GetQuakes({
            starttime,
            endtime,
            minmagnitude,
            latitude,
            longitude,
            maxradiuskm
        })
        
        res.send({
            coordinates,
            quakes: d.features.slice(0, 1000)
        })

    } catch (error) {
        console.error(req.url, error.message)
        return res.status(401).send(error.message)
    }
}