// @flow

import { GetQuakes, GetQuakeMeta, emptyMeta } from "./usgs.model";
import { GetLatLng } from '../geocode/geocode.model'

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $USGSResponse,
    type $USGSFeature,
    type $USGSParams,
    type $UIRequestSearch
} from './usgs.types.js'

//yeah, this is kinda lazy
//type the req to only be what we want
type UIQuakeQuery = {
    query: $UIRequestSearch,
    url: string
}

export async function fetchQuakeData(req: UIQuakeQuery, res: $Response): any {
    const {
        starttime,
        endtime,
        minmagnitude,
        maxradiuskm
    }: $UIRequestSearch = req.query
    
    try {
        let coordinates: Array<number>;
        const { features } = await GetLatLng(req.query.search)
        
        //send the same coords back if it's in the ocean
        if(!features[0]){ 
            res.send({
                meta: emptyMeta,
                coordinates: req.query.search.split(', '),
                quakes: []
            })
        }
        coordinates = features[0].geometry.coordinates
        
        const longitude = coordinates[0]
        const latitude = coordinates[1] 
        
        const d: $USGSResponse = await GetQuakes({
            starttime,
            endtime,
            minmagnitude,
            latitude,
            longitude,
            maxradiuskm
        })
        
        const limited = d.features.slice(0, 1000)

        res.send({
            meta: GetQuakeMeta(limited),
            coordinates,
            quakes: limited
        })

    } catch (error) {
        console.error(req.url, error.message)
        return res.status(401).send(error.message)
    }
}