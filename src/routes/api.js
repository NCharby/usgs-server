// @flow
import { Router } from 'express';
import asyncHandler from "express-async-handler";

import { fetchLatLng } from './geocode/geocode.route'
import { fetchQuakeData } from './usgs/usgs.route'


import express, {
  type $Request,
  type $Response
} from 'express';

const AppRouter: Router<$Request, $Response> = Router();

AppRouter.route('/latlng')
  .get( asyncHandler(fetchLatLng))

AppRouter.route('/quakes')
  .get( asyncHandler(fetchQuakeData))

export default AppRouter
