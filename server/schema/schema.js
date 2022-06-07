// Mongoose mondels
const Client = require('../models/Client')
const Project = require('../models/Project')

const { GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLList, GraphQLString } = require('graphql')

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLID },
        email: { type: GraphQLID },
        phone: { type: GraphQLID },
    })
})

const ProjectType = new GraphQLObjectType({
    name: "Projects",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.findById(parent.clientId)
            }
        }
    })
})

const RooQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RooQuery
})