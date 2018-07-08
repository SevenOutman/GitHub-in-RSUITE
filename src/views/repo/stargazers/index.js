// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Col, Grid, Panel, Row } from 'rsuite';
import { Link } from 'react-router';
import type { Repository } from '@/flow/graphql-types';
import query from './index.graphql';
import RepoLayout from '@/views/repo/Layout';
import type { RouteProps } from '@/flow/react-router';
import type { ApolloProps } from '@/flow/react-apollo';
import Pagination from '@/components/Pagination';

type Query = {
  repository: Repository
}

type Props = ApolloProps<Query> & RouteProps;

function Stargazers({ data: { loading, error, repository } }: Props) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { stargazers } = repository;

  return (
    <RepoLayout key={repository.nameWithOwner} repo={repository} className="repo-stargazers">
      <h2>Stargazers</h2>
      <Grid fluid>
        <Row>
          {
            stargazers.nodes.map(user => (
              <Col key={user.login} md={8}>
                <Panel bordered>
                  <Link to={`/${user.login}`}>
                    <img src={user.avatarUrl} alt="" width={75} />
                  </Link>
                  <Link to={`/${user.login}`}>
                    <h3>{user.name || user.login}</h3>
                  </Link>
                </Panel>
              </Col>
            ))
          }
        </Row>
      </Grid>
      <Pagination pageInfo={stargazers.pageInfo} />
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name }, location: { query: { before, after } } }) => {
    const perPage = 51;
    const pagination = before ? { last: perPage, before } : { first: perPage, after };
    return {
      variables: { owner, name, ...pagination }
    };
  }
})(Stargazers);