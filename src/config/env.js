// @flow

type $ENV_FILE = {
    parsed: {
      PORT: string,
      REACT_APP_IP: string,
      MAPBOX_TOKEN: string
    }
}
// $FlowFixMe
const ENV_FILE: $ENV_FILE = require('dotenv').config()

const PORT: number = ENV_FILE.parsed.PORT != null
  ? parseInt(ENV_FILE.parsed.PORT, 10)
  : 5001;

const IP: string = ENV_FILE.parsed.REACT_APP_IP != null
  ? ENV_FILE.parsed.REACT_APP_IP
  : '127.0.0.1';

const API_ROOT = "/api/0.1";

export default {
    PORT,
    IP,
    API_ROOT,
    MAPBOX_TOKEN: ENV_FILE.MAPBOX_TOKEN
}