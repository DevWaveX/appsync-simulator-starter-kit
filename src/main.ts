import {
    AmplifyAppSyncSimulator,
    AmplifyAppSyncSimulatorAuthenticationType,
    AmplifyAppSyncSimulatorConfig,
} from 'amplify-appsync-simulator'

import { handler as queryBooksHandler } from './resolvers/queryBooks'
import { handler as queryAuthorsHandler } from './resolvers/queryAuthors'
import { handler as bookAuthorHandler } from './resolvers/bookAuthor'
import { handler as authorBooksHandler } from './resolvers/authorBooks'
import { schema } from "./schema"
import { readVTL } from './vtl/readVTL'
import { resolversConfig } from './resolversConfig'


class AppSyncSimulator {
    httpPort: number
    wssPort: number

    constructor(httpPort: number, wssPort: number) {
        this.httpPort = httpPort
        this.wssPort = wssPort
    }

    async start() {
        const simulatorConfig: AmplifyAppSyncSimulatorConfig = {
            appSync: {
                defaultAuthenticationType: {
                    authenticationType: AmplifyAppSyncSimulatorAuthenticationType.AMAZON_COGNITO_USER_POOLS,
                    cognitoUserPoolConfig: {},
                },
                name: 'api-local',
                additionalAuthenticationProviders: [],
            },
            schema: { content: schema },
            mappingTemplates: [
                {
                    path: 'lambdaRequestMappingTemplate.vtl',
                    content: readVTL("lambdaRequestMappingTemplate.vtl"),
                },
                {
                    path: 'lambdaResponseMappingTemplate.vtl',
                    content: readVTL("lambdaResponseMappingTemplate.vtl"),
                }
            ],
            dataSources: [
                {
                    type: 'AWS_LAMBDA',
                    name: 'QueryBooksDataSource',
                    invoke: queryBooksHandler,
                },
                {
                    type: 'AWS_LAMBDA',
                    name: 'QueryAuthorsDataSource',
                    invoke: queryAuthorsHandler,
                },
                {
                    type: 'AWS_LAMBDA',
                    name: 'BookAuthorDataSource',
                    invoke: bookAuthorHandler,
                }, {
                    type: 'AWS_LAMBDA',
                    name: 'AuthorBooksDataSource',
                    invoke: authorBooksHandler,
                }
            ],
            resolvers: resolversConfig,
        }
        const amplifySimulator = new AmplifyAppSyncSimulator({
            port: this.httpPort,
            wsPort: this.wssPort,
        })
        await amplifySimulator.start()
        await amplifySimulator.init(simulatorConfig)
    }
}

const httpPort = 4000
const wsPort = 4001
const simulator = new AppSyncSimulator(httpPort, wsPort)
simulator.start().then(() => {
    console.log(`🚀 PCP App Sync Simulator started at http://localhost:${httpPort}/graphql`)
})