import React from 'react';
import { Col, Grid, Nav, Row } from 'rsuite';
import UserCard from '@/views/user/index/UserCard';
import PinnedRepo from '@/components/PinnedRepo';

function UserProfileView({ user }) {
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
            <Row>
              {
                user.pinnedRepositories.nodes.map(repo => (
                  <Col key={repo.nameWithOwner} md={12}>
                    <PinnedRepo repo={repo} owner={user} />
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
export default UserProfileView;