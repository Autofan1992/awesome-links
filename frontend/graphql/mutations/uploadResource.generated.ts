import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadResourceMutationVariables = Types.Exact<{
  input: Types.UploadResourceInput;
}>;


export type UploadResourceMutation = { __typename?: 'Mutation', uploadResource?: { __typename?: 'Resource', id: string, mimetype: string, name: string, url: string } | null };

export type ResourceFragment = { __typename?: 'Resource', id: string, mimetype: string, name: string, url: string };

export const ResourceFragmentDoc = gql`
    fragment Resource on Resource {
  id
  mimetype
  name
  url
}
    `;
export const UploadResourceDocument = gql`
    mutation UploadResource($input: UploadResourceInput!) {
  uploadResource(input: $input) {
    ...Resource
  }
}
    ${ResourceFragmentDoc}`;
export type UploadResourceMutationFn = Apollo.MutationFunction<UploadResourceMutation, UploadResourceMutationVariables>;

/**
 * __useUploadResourceMutation__
 *
 * To run a mutation, you first call `useUploadResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadResourceMutation, { data, loading, error }] = useUploadResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadResourceMutation(baseOptions?: Apollo.MutationHookOptions<UploadResourceMutation, UploadResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadResourceMutation, UploadResourceMutationVariables>(UploadResourceDocument, options);
      }
export type UploadResourceMutationHookResult = ReturnType<typeof useUploadResourceMutation>;
export type UploadResourceMutationResult = Apollo.MutationResult<UploadResourceMutation>;
export type UploadResourceMutationOptions = Apollo.BaseMutationOptions<UploadResourceMutation, UploadResourceMutationVariables>;