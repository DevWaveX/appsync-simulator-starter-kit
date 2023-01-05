import { AppSyncSimulatorPipelineResolverConfig, AppSyncSimulatorUnitResolverConfig, RESOLVER_KIND } from "amplify-appsync-simulator";

export const resolversConfig: (AppSyncSimulatorPipelineResolverConfig | AppSyncSimulatorUnitResolverConfig)[] = [
    {
        kind: RESOLVER_KIND.UNIT,
        typeName: "Query",
        fieldName: "books",
        dataSourceName: "QueryBooksDataSource",
        requestMappingTemplateLocation: "lambdaRequestMappingTemplate.vtl",
        responseMappingTemplateLocation: "lambdaResponseMappingTemplate.vtl"
    },
    {
        kind: RESOLVER_KIND.UNIT,
        typeName: "Query",
        fieldName: "authors",
        dataSourceName: "QueryAuthorsDataSource",
        requestMappingTemplateLocation: "lambdaRequestMappingTemplate.vtl",
        responseMappingTemplateLocation: "lambdaResponseMappingTemplate.vtl"
    },
    {
        kind: RESOLVER_KIND.UNIT,
        typeName: "Book",
        fieldName: "author",
        dataSourceName: "BookAuthorDataSource",
        requestMappingTemplateLocation: "lambdaRequestMappingTemplate.vtl",
        responseMappingTemplateLocation: "lambdaResponseMappingTemplate.vtl"
    },
    {
        kind: RESOLVER_KIND.UNIT,
        typeName: "Author",
        fieldName: "books",
        dataSourceName: "AuthorBooksDataSource",
        requestMappingTemplateLocation: "lambdaRequestMappingTemplate.vtl",
        responseMappingTemplateLocation: "lambdaResponseMappingTemplate.vtl"
    }
]