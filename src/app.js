// @flow
import CONFIG from './config/env'

import express, {
  type $Application,
  type $Request,
  type $Response,
  type NextFunction
} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';

import ErrorMiddleware from './middlewares/error.middleware'
import ApiRouter from './routes/api';

const app: express$Application<express$Request,express$Response> = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(`${CONFIG.API_ROOT}`, ApiRouter)

app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req: $Request, res: $Response, next: NextFunction) {
  res.status(404)
  next(createError(404));
});

app.use(ErrorMiddleware);

export default app
