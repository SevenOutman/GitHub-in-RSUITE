import React, { Fragment } from 'react';
import { Divider, Loader, Panel, Tag } from 'rsuite';
import { graphql } from 'react-apollo';
import query from './Repositories.graphql';
import { Link, withRouter } from 'react-router';
import Pagination from '@/components/Pagination';

function RepoListItem({ repo, owner }) {
  return (
    <Fragment>
      <Panel
        header={
          <Link to={`/${owner.login}/${repo.name}`}>
            <h3 style={{ margin: 0 }}>
              {repo.name}
            </h3>
          </Link>
        }
      >
        <p>{repo.description}</p>
        <div>
          {
            repo.repositoryTopics.nodes.map(({ topic }) => (
              <Tag>{topic.name}</Tag>
            ))
          }
        </div>
      </Panel>
      <Divider />
    </Fragment>
  );
}

function Repositories({ user, data: { user: { repositories } = {}, error, loading } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      {
        repositories.nodes.map(repo => (
          <RepoListItem key={repo.name} repo={repo} owner={user} />
        ))
      }
      <Pagination pageInfo={repositories.pageInfo} />
    </Fragment>
  );
}

export default withRouter(graphql(query, {
  options: ({ user: { login }, location: { query: { before, after } } }) => {
    const perPage = 30;
    const pagination = before ? { last: perPage, before } : { first: perPage, after };
    return {
      variables: { login, ...pagination }
    };
  }
})(Repositories));
