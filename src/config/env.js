// @flow

type $ENV_FILE = {
    parsed: {
      PORT: string,
      MAPBOX_TOKEN: string
    }
}
// $FlowFixMe
const ENV_FILE: $ENV_FILE = require('dotenv').config()

const PORT: number = ENV_FILE.parsed.PORT != null
  ? parseInt(ENV_FILE.parsed.PORT, 10)
  : 5001;

const API_ROOT = "/api/0.1";

export default {
    PORT,
    API_ROOT,
    MAPBOX_TOKEN: ENV_FILE.parsed.MAPBOX_TOKEN
}