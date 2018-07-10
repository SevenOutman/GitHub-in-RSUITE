import React, { Fragment } from 'react';
import _ from 'lodash';
import { Icon, Loader, Table, ButtonToolbar, ButtonGroup, Button } from 'rsuite';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import RepoLayout from '@/views/repo/Layout';
import query from './index.graphql';
import Pagination from '@/components/Pagination';
import LinkButton from '@/components/LinkButton';

const { Column, HeaderCell, Cell } = Table;

function IssueStatusCell({ rowData, dataKey = 'closed', ...props }) {
  const { closed } = rowData;
  return (
    <Cell {...props}>
      <Icon icon={closed ? 'check-circle' : 'exclamation-circle2'} fixedWidth />
    </Cell>
  );
}

function IssueTitleCell({ rowData, dataKey = 'title', routeNamespace, ...props }) {
  const title = _.get(rowData, dataKey);
  return (
    <Cell {...props}>
      <Link to={`${routeNamespace}/${rowData.number}`}>#{rowData.number} {title}</Link>
    </Cell>
  );
}

function IssueCommentsCell({ rowData, dataKey = 'comments.totalCount', ...props }) {
  const { comments: { totalCount } } = rowData;
  return (
    <Cell {...props}>
      {
        totalCount > 0 &&
        <Fragment>
          <Icon icon="comment-o" fixedWidth />
          {totalCount}
        </Fragment>
      }
    </Cell>
  );
}

function RepoIssues({ data: { loading, error, repository } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  const { issues } = repository;

  function renderTableToolbar() {
    const routeNamespace = `/${repository.nameWithOwner}`;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <ButtonToolbar>
          <ButtonGroup>
            <LinkButton appearance="ghost" to={`${routeNamespace}/labels`}>Labels</LinkButton>
            <LinkButton appearance="ghost" to={`${routeNamespace}/milestones`}>Milestones</LinkButton>
          </ButtonGroup>
          <LinkButton appearance="primary" style={{ float: 'right' }} to={`${routeNamespace}/issues/new`}>New issue</LinkButton>
        </ButtonToolbar>
      </div>
    );
  }

  function getTableData() {
    const { nodes } = issues;
    return _.orderBy(nodes, 'number', 'desc');
  }

  function renderTable() {
    const routeNamespace = `/${repository.nameWithOwner}/issues`;
    return (
      <Table data={getTableData()} autoHeight>
        <Column width={38} align="center">
          <HeaderCell />
          <IssueStatusCell dataKey="closed" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Title</HeaderCell>
          <IssueTitleCell dataKey="title" routeNamespace={routeNamespace} />
        </Column>
        <Column width={180} align="right">
          <HeaderCell>Comments</HeaderCell>
          <IssueCommentsCell dataKey="comments.totalCount" />
        </Column>
      </Table>
    );
  }

  return (
    <RepoLayout key={repository.nameWithOwner} repo={repository} className="repo">
      {renderTableToolbar()}
      {renderTable()}
      <Pagination pageInfo={issues.pageInfo} />
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name }, location: { query: { before, after } } }) => {
    const perPage = 25;
    const pagination = before ? { last: perPage, before } : { first: perPage, after };
    return {
      variables: { owner, name, ...pagination }
    };
  }
})(RepoIssues);
