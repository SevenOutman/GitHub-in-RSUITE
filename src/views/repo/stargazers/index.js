import React from 'react';
import { graphql } from 'react-apollo';
import { Button, ButtonGroup, ButtonToolbar, Col, Grid, Nav, Panel, Row } from 'rsuite';
import query from './index.gql';
import { Link } from 'react-router';

function NavButton(props) {
  return (
    <Button componentClass={Link} {...props} />
  );
}

function Stargazers({ data: { loading, error, repository }, location: { pathname } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div key={repository.nameWithOwner} className="repo-stargazers">

      <Nav appearance="subtle" activeKey="overview">
        <Nav.Item eventKey="code">Code</Nav.Item>
        <Nav.Item eventKey="issues">Issues</Nav.Item>
        <Nav.Item eventKey="prs">Pull requests</Nav.Item>
        <Nav.Item eventKey="projects">Projects</Nav.Item>
        <Nav.Item eventKey="wiki">Wiki</Nav.Item>
        <Nav.Item eventKey="insights">Insights</Nav.Item>
      </Nav>
      <h2>Stargazers</h2>
      <Grid fluid>
        <Row>
          {
            repository.stargazers.nodes.map(user => (
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
      <ButtonToolbar>
        <ButtonGroup>
          <NavButton
            to={{ pathname, query: { before: repository.stargazers.pageInfo.startCursor } }}
            disabled={!repository.stargazers.pageInfo.hasPreviousPage}
          >
            Previous
          </NavButton>
          <NavButton
            to={{ pathname, query: { after: repository.stargazers.pageInfo.endCursor } }}
            disabled={!repository.stargazers.pageInfo.hasNextPage}
          >
            Next
          </NavButton>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name }, location: { query: { after } } }) => ({ variables: { owner, name, after } })
})(Stargazers);