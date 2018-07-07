import React from 'react';
import { graphql } from 'react-apollo';
import { Col, FlexboxGrid, Grid, Nav, Row } from 'rsuite';
import query from './index.gql';
import './index.less';
import UserCard from '@/views/user/index/UserCard';
import PinnedRepo from '@/views/user/index/PinnedRepo';

function User({ data: { loading, error, user } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div key={user.login} className="user">
      <Grid fluid>
        <Row>
          <Col md={6}>
            <UserCard user={user} />
          </Col>
          <Col md={18}>
            <Nav appearance="subtle" activeKey="overview">
              <Nav.Item eventKey="overview">Overview</Nav.Item>
              <Nav.Item eventKey="repositories">Repositories</Nav.Item>
              <Nav.Item eventKey="stars">Stars</Nav.Item>
              <Nav.Item eventKey="followers">Followers</Nav.Item>
              <Nav.Item eventKey="following">Following</Nav.Item>
            </Nav>
            <h4>Pinned repositories</h4>
            {/*<Grid fluid gutter={20}>*/}
              <Row>
              {
                user.pinnedRepositories.nodes.map(repo => (
                  <Col key={repo.nameWithOwner} md={12}>
                    <PinnedRepo repo={repo} user={user} />
                  </Col>
                ))
              }
              </Row>
            {/*</Grid>*/}
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default graphql(query, {
  options: ({ params }) => ({
    variables: params
  })
})(User);