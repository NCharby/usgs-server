// @flow

import { GetQuakes } from "./usgs.model";

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $USGSResponse,
    type $USGSFeature,
    type $USGSParams,
    type $UIRequest
} from './usgs.types.js'

//yeah, this is kinda lazy
//type the req to only be what we want
type UIQuakeQuery = {
    query: $UIRequest,
    url: string
}

export async function fetchQuakeData(req: UIQuakeQuery, res: $Response): any {
    const {
        starttime,
        endtime,
        minmagnitude,
        coordinates,
        maxradiuskm
    }: $UIRequest = req.query

    try {
        const latitude = coordinates[0]
        const longitude = coordinates[1]

        const d: $USGSResponse = await GetQuakes({
            starttime,
            endtime,
            minmagnitude,
            latitude,
            longitude,
            maxradiuskm
        })
        res.send(d)
    } catch (error) {
        console.error(req.url, error.message)
        return res.status(401).send(error.message)
    }
}