// @flow
import React from 'react';
import { Col, Grid, Nav, Row } from 'rsuite';
import UserCard from '@/views/user/index/UserCard';
import PinnedRepo from '@/components/PinnedRepo';
import type { User } from '@/flow/graphql-types';
import { Link, withRouter } from 'react-router';
import type { RouteProps } from '@/flow/react-router';
import Overview from '@/views/user/index/Overview';
import Repositories from '@/views/user/index/Repositories';

type Props = RouteProps & {
  user: User,
}

function UserProfileView({ user, location: { pathname, query: { tab = 'overview' } } }: Props) {
  function renderNav() {
    const { repositories, starredRepositories, followers, following } = user;
    return (
      <Nav appearance="subtle" activeKey={tab}>
        <Nav.Item eventKey="overview" componentClass={Link} to={{ pathname }}>Overview</Nav.Item>
        <Nav.Item eventKey="repositories" componentClass={Link}
                  to={{ pathname, query: { tab: 'repositories' } }}>Repositories{repositories.totalCount}</Nav.Item>
        <Nav.Item eventKey="stars" componentClass={Link}
                  to={{ pathname, query: { tab: 'stars' } }}>Stars{starredRepositories.totalCount}</Nav.Item>
        <Nav.Item eventKey="followers" componentClass={Link}
                  to={{ pathname, query: { tab: 'followers' } }}>Followers{followers.totalCount}</Nav.Item>
        <Nav.Item eventKey="following" componentClass={Link}
                  to={{ pathname, query: { tab: 'following' } }}>Following{following.totalCount}</Nav.Item>
      </Nav>
    );
  }

  return (
    <div key={user.login} className="user">
      <Grid fluid>
        <Row>
          <Col md={6}>
            <UserCard user={user} />
          </Col>
          <Col md={18}>
            {renderNav()}
            {
              tab === 'overview' &&
              <Overview user={user} />
            }
            {
              tab === 'repositories' &&
              <Repositories user={user} />
            }
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default withRouter(UserProfileView);