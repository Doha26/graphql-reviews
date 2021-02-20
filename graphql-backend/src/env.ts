const defaultAppPort = 4000;
const defaultApiPort = 3000;

interface Env {
    apollo: {
        introspection: boolean,
        playground: boolean
    },
    port: number | string,
    mock_server_url: string | number
}

export const env: Env = {
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
        playground: process.env.APOLLO_PLAYGROUND === 'true'
    },
    port: process.env.PORT || defaultAppPort,
    mock_server_url: process.env.BASE_API_URL || defaultApiPort
};
