import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:4000/api',
    documents: './**/*.graphql',
    generates: {
        'graphql-generated/types.ts': { plugins: ['typescript'] },
        '/': {
            preset: 'near-operation-file',
            presetConfig: {
                baseTypesPath: './graphql-generated/types.ts'
            },
            plugins: ['typescript-operations', 'typescript-react-apollo']
        }
    }
}
export default config
