import {DataSourceConfig} from "apollo-datasource";
import {env} from "../env";

const {RESTDataSource} = require('apollo-datasource-rest');

class TContext {
}

export default class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = env.mock_server_url;
    }

    initialize(config: DataSourceConfig<TContext>) {
        super.initialize(config);
        this.context = config.context;
    }

    async getUsers() {
        const users = await this.get('/items');
        return Array.isArray(users) ? users : []

    }
}
