// @flow

import { GetLatLng } from "./geocode.model";

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $MBGeocodeResponse
} from './geocode.types.js'

export async function fetchLatLng(req: $Request, res: $Response): any {
    const { q } = req.query
    try {
        const d: $MBGeocodeResponse = await GetLatLng(q)
        const firstResult = d.features[0]
        res.send(firstResult)
    } catch (error) {
        return res.status(401).send(error.message)
    }
}