import {Context} from "vm";

export default {
    Query: {
        users: async (parent: unknown, args: unknown, {dataSources}: Context) => {
            return  dataSources.userRestAPI.getUsers()
        },
        welcome: (): string => 'Welcome to this Graphql Backend',
    },
}
