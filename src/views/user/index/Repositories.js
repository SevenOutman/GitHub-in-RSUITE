import React, { Fragment } from 'react';
import { Loader, Row } from 'rsuite';
import { graphql } from 'react-apollo';
import query from './Repositories.graphql';

function RepoListItem({ repo }) {
  return (
    <div>
      {repo.name}
    </div>
  );
}

function Repositories({ data: { user, error, loading } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      <Row>
        {
          user.repositories.nodes.map(repo => (
            <RepoListItem key={repo.name} repo={repo} />
          ))
        }
      </Row>
    </Fragment>
  );
}

export default graphql(query, {
  options: ({ user: { login } }) => ({ variables: { login } })
})(Repositories);
