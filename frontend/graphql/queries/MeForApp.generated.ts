import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeForAppQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeForAppQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, role: Types.UserRole, email: string, avatar?: string | null } | null };

export type UserFragment = { __typename?: 'User', id: string, role: Types.UserRole, email: string, avatar?: string | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  role
  email
  avatar
}
    `;
export const MeForAppDocument = gql`
    query MeForApp {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeForAppQuery__
 *
 * To run a query within a React component, call `useMeForAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeForAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeForAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeForAppQuery(baseOptions?: Apollo.QueryHookOptions<MeForAppQuery, MeForAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeForAppQuery, MeForAppQueryVariables>(MeForAppDocument, options);
      }
export function useMeForAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeForAppQuery, MeForAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeForAppQuery, MeForAppQueryVariables>(MeForAppDocument, options);
        }
export function useMeForAppSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeForAppQuery, MeForAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeForAppQuery, MeForAppQueryVariables>(MeForAppDocument, options);
        }
export type MeForAppQueryHookResult = ReturnType<typeof useMeForAppQuery>;
export type MeForAppLazyQueryHookResult = ReturnType<typeof useMeForAppLazyQuery>;
export type MeForAppSuspenseQueryHookResult = ReturnType<typeof useMeForAppSuspenseQuery>;
export type MeForAppQueryResult = Apollo.QueryResult<MeForAppQuery, MeForAppQueryVariables>;