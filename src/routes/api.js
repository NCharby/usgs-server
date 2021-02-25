// @flow
import { Router } from 'express';
import asyncHandler from "express-async-handler";

import { fetchLatLng } from './geocode/geocode.route'


import express, {
  type $Request,
  type $Response
} from 'express';

const AppRouter: Router<$Request, $Response> = Router();

AppRouter.get('/', function(req, res) {
  res.send('hit');
});

AppRouter.route('/latlng')
  .get( asyncHandler(fetchLatLng))

export default AppRouter
