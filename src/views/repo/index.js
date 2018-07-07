import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Nav } from 'rsuite';

function Repo({ params }) {
  const { owner, name } = params;
  return (
    <Query
      query={gql`
        query repo($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            nameWithOwner
          }
        }
      `}
      variables={{ owner, name }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const { repository } = data;
        return (
          <div key={repository.nameWithOwner} className="repo">

            <Nav appearance="subtle" activeKey="overview">
              <Nav.Item eventKey="code">Code</Nav.Item>
              <Nav.Item eventKey="issues">Issues</Nav.Item>
              <Nav.Item eventKey="prs">Pull requests</Nav.Item>
              <Nav.Item eventKey="projects">Projects</Nav.Item>
              <Nav.Item eventKey="wiki">Wiki</Nav.Item>
              <Nav.Item eventKey="insights">Insights</Nav.Item>
            </Nav>
          </div>
        );
      }}
    </Query>
  );
}

export default Repo;