import { isProduction } from 'shared/utils/env';
import assign from 'lodash/assign';

const config = {
  prod: {
  },

  dev: {
  },

  common: {
    APP_CONTAINER_ID: 'app',
    WDS_PORT: 7000,
    STATIC_PATH: '/assets',
    PORT: process.env.PORT || 8080,
    JWT_SECRET: '>g<>>Sg{GchM.&B!~&9#FHf4geJ3C',
  },
};

function getConfig() {
  let Config = config.common;

  if (isProduction) {
    Config = assign(Config, config.prod);
  } else {
    Config = assign(Config, config.dev);
  }

  return Config;
}

export default getConfig();
