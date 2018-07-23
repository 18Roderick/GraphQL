const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]




// 2

let idCount = links.length;
const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        feed: () => links,
    },

    Mutation: {
        post: (root , args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }

            links.push(link);
            return link;
        },

        updateLink: (root, args) => {

        },
        deleteLink: (root, args) => {
            
        }
    }
}


//3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start( () => {
    console.log('Server is running on http://localhost:4000')
});