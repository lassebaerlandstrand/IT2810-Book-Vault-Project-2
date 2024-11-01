import { CodegenConfig } from '@graphql-codegen/cli';

// From official documentation: https://www.apollographql.com/docs/react/development-testing/static-typing
const config: CodegenConfig = {
  schema: '../backend/schema.graphql', // Use the server URL or path to schema file
  documents: ['src/**/*.graphql', 'src/graphql/queries/*.ts', 'src/graphql/mutations/*.ts'],
  generates: {
    'src/generated/': {
      preset: 'client',
      // plugins: ['typescript', 'typescript-resolvers'],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
