import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Col, Divider, FlexboxGrid, Grid, Icon, Nav, Panel, Row } from 'rsuite';
import './index.less';
import { Link } from 'react-router';

function User({ params }) {
  const { login } = params;
  return (
    <Query
      query={gql`
        query user($login: String!) {
          user(login: $login) {
            avatarUrl
            name
            login
            bio
            company
            location
            email
            websiteUrl
            organizations(first: 100) {
              nodes {
                login
                avatarUrl
              }
            }
            pinnedRepositories(first: 100) {
              nodes {
                name
                nameWithOwner
                description
                primaryLanguage {
                  color
                  name
                }
                stargazers {
                  totalCount
                }
                forks {
                  totalCount
                }
              }
            }
          }
        }
      `}
      variables={{ login }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const { user } = data;
        return (
          <div key={user.login} className="user">
            <Grid fluid>
              <Row>
                <Col md={6}>

                  <img src={user.avatarUrl} alt="avatar" className="avatar" />
                  <h3>{user.name}</h3>
                  <p>{user.login}</p>
                  <p>{user.bio}</p>
                  <Button block>Follow</Button>
                  <Divider>
                    <h4>Contact</h4>
                  </Divider>
                  <p><Icon icon="group" fixedWidth />{user.company}</p>
                  <p><Icon icon="map-marker" fixedWidth />{user.location}</p>
                  <p><Icon icon="envelope-o" fixedWidth />{user.email}</p>
                  <p><Icon icon="link" fixedWidth />{user.websiteUrl}</p>
                  <Divider>
                    <h4>Organizations</h4>
                  </Divider>
                  {
                    user.organizations.nodes.map(org => (
                      <img key={org.login} src={org.avatarUrl} alt="" width={35} />
                    ))
                  }
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
                  <FlexboxGrid>
                    {
                      user.pinnedRepositories.nodes.map(repo => (
                        <FlexboxGrid.Item key={repo.nameWithOwner} colspan={12}>
                          <Panel header={<Link to={`/${repo.nameWithOwner}`}>{repo.nameWithOwner}</Link>} bordered>

                            <p>{repo.description}</p>
                            <p>
                              <span>{repo.primaryLanguage.name}</span>
                              <span><Icon icon="star" fixedWidth />{repo.stargazers.totalCount}</span>
                              <span><Icon icon="code-fork" fixedWidth />{repo.forks.totalCount}</span>
                            </p>
                          </Panel>
                        </FlexboxGrid.Item>
                      ))
                    }
                  </FlexboxGrid>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
}

export default User;