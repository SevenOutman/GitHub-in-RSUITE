import React, { Fragment } from 'react';
import { Divider, Loader, Panel, Tag } from 'rsuite';
import { graphql } from 'react-apollo';
import query from './Stars.graphql';
import { Link, withRouter } from 'react-router';
import Pagination from '@/components/Pagination';

function RepoListItem({ repo }) {
  return (
    <Fragment>
      <Panel
        header={
          <Link to={`/${repo.nameWithOwner}`}>
            <h3 style={{ margin: 0 }}>
              {repo.nameWithOwner}
            </h3>
          </Link>
        }
      >
        <p>{repo.description}</p>
        <div>
          {
            repo.repositoryTopics.nodes.map(({ topic }) => (
              <Tag key={topic.name}>{topic.name}</Tag>
            ))
          }
        </div>
      </Panel>
      <Divider />
    </Fragment>
  );
}

function StarredRepositories({ user, data: { user: { starredRepositories } = {}, error, loading } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      {
        starredRepositories.nodes.map(repo => (
          <RepoListItem key={repo.nameWithOwner} repo={repo} />
        ))
      }s
      <Pagination pageInfo={starredRepositories.pageInfo} />
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
})(StarredRepositories));
