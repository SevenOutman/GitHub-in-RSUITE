// @flow
import React from 'react';
import { Container, Content, Dropdown, Footer, Header, Icon, Nav, Navbar } from 'rsuite';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from './index.graphql';
import './index.less';
import type { User } from '@/flow/graphql-types';

type Props = {
  data: {
    viewer: User
  }
}

function Layout({ children, data: { viewer } }) {
  return (
    <Container id="layout" className="layout">
      <Header>
        <Navbar appearance="inverse">
          <div className="container-lg">
            <Navbar.Header>
              <Link className="navbar-brand logo" to="/">
                <Icon icon="github" size="2x" />
              </Link>
            </Navbar.Header>
            <Navbar.Body>
              <Nav>
                <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
                <Nav.Item>News</Nav.Item>
                <Nav.Item>Products</Nav.Item>
                <Dropdown title="About">
                  <Dropdown.Item>Company</Dropdown.Item>
                  <Dropdown.Item>Team</Dropdown.Item>
                  <Dropdown.Item>Contact</Dropdown.Item>
                </Dropdown>
              </Nav>
              {
                viewer &&
                <Nav pullRight>
                  <Nav.Item icon={<Icon icon="cog" />}>{viewer.login}</Nav.Item>
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