// @flow

import type { $Request, $Response, NextFunction } from 'express';

export default function(err: any, req: $Request, res: $Response, next: NextFunction): mixed {
    if (res.headersSent) {
        return next(err)
    }
    
    if(res.statusCode === 200){
        res.status(500)
    }
    
    res.send({ error: err })
}