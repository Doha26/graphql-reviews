require('dotenv').config();

const defaultAppPort = 4000;
const defaultApiPort = undefined;

interface Env {
    apollo: {
        introspection: boolean,
        playground: boolean
    },
    port: number | string,
    mock_server_url: string | undefined
}

export const env: Env = {
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
        playground: process.env.APOLLO_PLAYGROUND === 'true'
    },
    port: process.env.PORT || defaultAppPort,
    mock_server_url: process.env.BASE_API_URL || defaultApiPort
};
