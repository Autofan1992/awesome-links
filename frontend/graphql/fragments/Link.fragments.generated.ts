import * as Types from '../../../../../graphql-generated/types';

import { gql } from '@apollo/client';
export type LinkFragment = { __typename?: 'Link', id: string, url: string, description: string, category: string, title: string, image: { __typename?: 'Resource', id: string, url: string, name: string } };

export type ImageFragment = { __typename?: 'Resource', id: string, url: string, name: string };

export const ImageFragmentDoc = gql`
    fragment Image on Resource {
  id
  url
  name
}
    `;
export const LinkFragmentDoc = gql`
    fragment Link on Link {
  id
  url
  description
  category
  title
  image {
    ...Image
  }
}
    ${ImageFragmentDoc}`;