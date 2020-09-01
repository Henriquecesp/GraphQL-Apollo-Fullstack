const {GraphQLServer, PubSub} = require('graphql-yoga')

const typeDefs = `
enum StatusEnum {
    SUCCESS
    ERROR
}

enum ActionEnum {
    ADD
    SUB
}

type Query {
    hello(name: String = "Good"): String!
    count: Int!
}

type Mutation {
    addCount(step: Int = 1, action: ActionEnum = ADD): CountResult!
}

type CountResult {
    status: StatusEnum!
    count: Int!
}

type CountSub {
    action: ActionEnum!
    count: Int!
}

type Counter {
    count: Int!
    countStr: String
}

type Subscription {
    """
    Bla bla
    """ 
    counterOnChange: CountSub!
}
`

let ct = 0;
const CHANNEL_CT = 'COUNT_SUB';

const pubsub = new PubSub()

const resolvers = {
    Query: {
        hello: (_, {name}) => `Hello ${name || ''}`,
        count: () => ct,
    },
    Mutation: {
        addCount: (_, {step, action}) => {

            if (action === 'SUB') {
                ct -= step
            } else {
                ct += step
            }

            pubsub.publish(CHANNEL_CT, {count: ct, action})

            return {
                status: 'SUCCESS',
                count: ct
            }
        },
    },
    Counter: {
        countStr: counter => `Current count: ${counter.count}`,
    },
    Subscription: {
        counterOnChange: {
            resolve: async (payload) => {
                console.log(payload);
                return payload;
            },
            subscribe: () => pubsub.asyncIterator([CHANNEL_CT])
        },
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {pubsub},
    debug: true,
    tracing: true,
    playground: false,
    introspection: true,
})

server.start(() => console.log('Server is running on localhost:4000'))
