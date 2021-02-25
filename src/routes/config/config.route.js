// @flow

import CONFIG from '../../config/env'

import express, {
  type $Request,
  type $Response
} from 'express';

import {
    type $ConfigRespopnse 
} from './config.types.js'

// setup a script include to load page vars in the global window scope
// this loads the config faster than waithing for react to initialize

/*
    window.CONFIG = {};
    window.CONFIG.MAPBOX_TOKEN = "blahblahblahimthetoken";

    Add more to payload if needed
*/

export function fetchConfigScript(req: $Request, res: $Response) {
    const payload: $ConfigRespopnse = {
        MAPBOX_TOKEN: CONFIG.MAPBOX_TOKEN
    }

    let js: string = "window.CONFIG = {};\n";
    Object.keys(payload).forEach(item => {
        const serialized: string = JSON.stringify(payload[item]);
        js += `window.CONFIG.${item} = ${serialized}; \n`;
    });
    res.set("Content-Type", "application/javascript; charset=utf-8")
    res.status(200).send(js)
}