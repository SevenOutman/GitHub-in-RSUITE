import React from 'react';
import { graphql } from 'react-apollo';
import query from './UserOrOrg.graphql';
import UserProfileView from '@/views/user/index/UserProfileView';
import OrgProfileView from '@/views/orgs/OrgProfileView';

function UserOrOrg({ data: { loading, error, repositoryOwner } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { __typename } = repositoryOwner;
  if (__typename === 'Organization') {
    return <OrgProfileView org={repositoryOwner} />;
  }
  return <UserProfileView user={repositoryOwner} />;
}

export default graphql(query, {
  options: ({ params }) => ({
    variables: params
  })
})(UserOrOrg);