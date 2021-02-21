import {env} from "../env";
import {RESTDataSource} from 'apollo-datasource-rest';

export default class UserRestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = env.mock_server_url;
    }

    async getUsers() : Promise<any[]> {
        const users = await this.get('/items');
        return Array.isArray(users) ? users : []

    }
}
