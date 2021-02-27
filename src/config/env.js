// @flow

const PORT: number = process.env.PORT != null
  ? parseInt(process.env.PORT, 10)
  : 80;

const API_ROOT = "/api/0.1";

export default {
    PORT,
    API_ROOT,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
}