// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { ButtonGroup, ButtonToolbar, Col, Grid, Nav, Panel, Row } from 'rsuite';
import { Link } from 'react-router';
import LinkButton from '@/components/LinkButton';
import type { PageInfo } from '@/flow/types';
import query from './index.graphql';
import RepoLayout from '@/views/repo/Layout';

type Props = {
  data: {
    repository: {
      stargazers: {
        pageInfo: PageInfo
      }
    }
  }
}

function Stargazers({ data: { loading, error, repository }, location: { pathname } }: Props) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { stargazers } = repository;


  function renderPagination() {
    const { pageInfo } = stargazers;
    return (
      <ButtonToolbar>
        <ButtonGroup>
          <LinkButton
            to={{ pathname, query: { before: pageInfo.startCursor } }}
            disabled={!pageInfo.hasPreviousPage}
          >
            Previous
          </LinkButton>
          <LinkButton
            to={{ pathname, query: { after: pageInfo.endCursor } }}
            disabled={!pageInfo.hasNextPage}
          >
            Next
          </LinkButton>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

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
      {renderPagination()}
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name }, location: { query: { after } } }) => ({ variables: { owner, name, after } })
})(Stargazers);