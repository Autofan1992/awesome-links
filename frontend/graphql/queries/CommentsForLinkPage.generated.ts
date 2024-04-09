import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CommentsForLinkPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CommentsForLinkPageQuery = { __typename?: 'Query', commentConnection: { __typename?: 'CommentConnectionResponse', hasMore: boolean, nodes: Array<{ __typename?: 'Comment', id: string, text: string }> } };

export type CommentFragment = { __typename?: 'Comment', id: string, text: string };

export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  text
}
    `;
export const CommentsForLinkPageDocument = gql`
    query CommentsForLinkPage {
  commentConnection {
    hasMore
    nodes {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useCommentsForLinkPageQuery__
 *
 * To run a query within a React component, call `useCommentsForLinkPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsForLinkPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsForLinkPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommentsForLinkPageQuery(baseOptions?: Apollo.QueryHookOptions<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>(CommentsForLinkPageDocument, options);
      }
export function useCommentsForLinkPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>(CommentsForLinkPageDocument, options);
        }
export function useCommentsForLinkPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>(CommentsForLinkPageDocument, options);
        }
export type CommentsForLinkPageQueryHookResult = ReturnType<typeof useCommentsForLinkPageQuery>;
export type CommentsForLinkPageLazyQueryHookResult = ReturnType<typeof useCommentsForLinkPageLazyQuery>;
export type CommentsForLinkPageSuspenseQueryHookResult = ReturnType<typeof useCommentsForLinkPageSuspenseQuery>;
export type CommentsForLinkPageQueryResult = Apollo.QueryResult<CommentsForLinkPageQuery, CommentsForLinkPageQueryVariables>;