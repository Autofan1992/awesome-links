import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import { LinkFragmentDoc } from '../fragments/Link.fragments.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateLinkMutationVariables = Types.Exact<{
  input: Types.CreateLinkInput;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink?: { __typename?: 'Link', id: string, url: string, description: string, category: string, title: string, image: { __typename?: 'Resource', id: string, url: string, name: string } } | null };


export const CreateLinkDocument = gql`
    mutation CreateLink($input: CreateLinkInput!) {
  createLink(input: $input) {
    ...Link
  }
}
    ${LinkFragmentDoc}`;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;