import React, { Fragment } from 'react';
import { Col, Loader, Row } from 'rsuite';
import { graphql } from 'react-apollo';
import PinnedRepo from '@/components/PinnedRepo';
import query from './Overview.graphql';

function Overview({ data: { user, error, loading } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      <h4>Pinned repositories</h4>
      <Row>
        {
          user.pinnedRepositories.nodes.map(repo => (
            <Col key={repo.nameWithOwner} md={12}>
              <PinnedRepo repo={repo} owner={user} />
            </Col>
          ))
        }
      </Row>
    </Fragment>
  );
}

export default graphql(query, {
  options: ({ user: { login } }) => ({ variables: { login } })
})(Overview);
