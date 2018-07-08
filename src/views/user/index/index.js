import React from 'react';
import { graphql } from 'react-apollo';
import { Col, FlexboxGrid, Grid, Nav, Row } from 'rsuite';
import query from './index.graphql';
import './index.less';
import UserCard from '@/views/user/index/UserCard';
import PinnedRepo from '@/views/user/index/PinnedRepo';
import UserProfileView from '@/views/user/index/UserProfileView';

function User({ data: { loading, error, user } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <UserProfileView user={user}/>
}

export default graphql(query, {
  options: ({ params }) => ({
    variables: params
  })
})(User);