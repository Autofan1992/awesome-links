import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import { LinkFragmentDoc } from '../fragments/Link.fragments.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinksForHomeQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ConnectionInput>;
}>;


export type LinksForHomeQuery = { __typename?: 'Query', linkConnection: { __typename?: 'LinkConnectionResponse', hasMore: boolean, nodes: Array<{ __typename?: 'Link', id: string, url: string, description: string, category: string, title: string, image: { __typename?: 'Resource', id: string, url: string, name: string } }> } };


export const LinksForHomeDocument = gql`
    query LinksForHome($input: ConnectionInput) {
  linkConnection(input: $input) {
    hasMore
    nodes {
      ...Link
    }
  }
}
    ${LinkFragmentDoc}`;

/**
 * __useLinksForHomeQuery__
 *
 * To run a query within a React component, call `useLinksForHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksForHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksForHomeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinksForHomeQuery(baseOptions?: Apollo.QueryHookOptions<LinksForHomeQuery, LinksForHomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksForHomeQuery, LinksForHomeQueryVariables>(LinksForHomeDocument, options);
      }
export function useLinksForHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksForHomeQuery, LinksForHomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksForHomeQuery, LinksForHomeQueryVariables>(LinksForHomeDocument, options);
        }
export function useLinksForHomeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LinksForHomeQuery, LinksForHomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LinksForHomeQuery, LinksForHomeQueryVariables>(LinksForHomeDocument, options);
        }
export type LinksForHomeQueryHookResult = ReturnType<typeof useLinksForHomeQuery>;
export type LinksForHomeLazyQueryHookResult = ReturnType<typeof useLinksForHomeLazyQuery>;
export type LinksForHomeSuspenseQueryHookResult = ReturnType<typeof useLinksForHomeSuspenseQuery>;
export type LinksForHomeQueryResult = Apollo.QueryResult<LinksForHomeQuery, LinksForHomeQueryVariables>;