// @flow
import React from 'react';
import { Container, Content, Dropdown, Footer, Header, Icon, Nav, Navbar } from 'rsuite';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import type { User } from '@/flow/graphql-types';
import type { Node } from 'react';
import query from './index.graphql';
import './index.less';

type Props = {
  children?: Node,
  data: {
    viewer: User
  }
}

function Layout({ children, data: { viewer } }: Props) {
  return (
    <Container id="layout" className="layout">
      <Header>
        <Navbar appearance="inverse">
          <div className="container-lg">
            <Navbar.Header>
              <Link className="navbar-brand logo" to={viewer ? `/${viewer.login}` : '/'}>
                <Icon icon="github" size="2x" />
              </Link>
            </Navbar.Header>
            <Navbar.Body>
              <Nav>
                <Nav.Item>Pull requests</Nav.Item>
                <Nav.Item>Issues</Nav.Item>
                <Nav.Item>Marketplace</Nav.Item>
                <Nav.Item>Explore</Nav.Item>
              </Nav>
              {
                viewer &&
                <Nav pullRight>
                  <Dropdown
                    title={
                      <img src={viewer.avatarUrl} alt={viewer.login} height={20} />
                    }
                  >
                    <Dropdown.Item panel style={{ padding: 10, width: 160, color: '#575757' }}>
                      <p>Signed in as</p>
                      <strong>{viewer.login}</strong>
                    </Dropdown.Item>
                    <Dropdown.Item divider />
                    <Dropdown.Item componentClass={Link} to={`/${viewer.login}`}>Your profile</Dropdown.Item>
                    <Dropdown.Item componentClass={Link} to={`/${viewer.login}?tab=stars`}>Your stars</Dropdown.Item>
                    <Dropdown.Item>Your Gists</Dropdown.Item>
                    <Dropdown.Item divider />
                    <Dropdown.Item>Help</Dropdown.Item>
                    <Dropdown.Item componentClass={Link} to="/settings/profile">Settings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Dropdown>
                </Nav>
              }
            </Navbar.Body>
          </div>
        </Navbar>
      </Header>
      <Content id="content">
        <div className="container-lg">
          {children}
        </div>
      </Content>
      <Footer>
        <div className="container-lg">

        </div>
      </Footer>
    </Container>
  );
}

export default graphql(query)(Layout);