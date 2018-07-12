import React, { Fragment } from 'react';
import _ from 'lodash';
import { Icon, Loader, Table, ButtonToolbar, ButtonGroup, Button, Dropdown } from 'rsuite';
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

function RepoIssues({ data: { loading, error, repository }, location: { pathname, query: { q } }, router }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  const { issues } = repository;

  function query2q(query) {
    return Object.keys(query)
      .filter(key => query[key])
      .sort()
      .map(key => `${key}:${query[key]}`)
      .join('+');
  }

  function q2query(q) {
    return q.split('+').reduce((acc, segment) => {
      const [key, value] = segment.split(':');
      return {
        ...acc,
        [key]: value
      };
    }, {});
  }

  function getQueryLink(query) {
    if (!q) {
      return router.createPath({ pathname, query: { q: query2q(query) } });
    }
    return router.createPath({ pathname, query: { q: query2q({ ...q2query(q), ...query }) } });
  }

  function goQuery(query) {
    router.push(getQueryLink(query));
  }

  const { is = 'open', sort = 'created-desc' } = q2query(q);

  function renderTableToolbar() {
    const routeNamespace = `/${repository.nameWithOwner}`;
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <ButtonToolbar>
          <ButtonGroup>
            <LinkButton appearance="ghost" to={`${routeNamespace}/labels`}>Labels</LinkButton>
            <LinkButton appearance="ghost" to={`${routeNamespace}/milestones`}>Milestones</LinkButton>
          </ButtonGroup>
          <LinkButton appearance="primary" style={{ float: 'right' }} to={`${routeNamespace}/issues/new`}>New
            issue</LinkButton>
        </ButtonToolbar>
        <ButtonToolbar>
          <ButtonGroup>
            <Dropdown title="State" activeKey={is}>
              <Dropdown.Item
                eventKey="open"
                componentClass={Link}
                to={getQueryLink({ is: 'open' })}
              >
                Open
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="closed"
                componentClass={Link}
                to={getQueryLink({ is: 'closed' })}
              >
                Closed
              </Dropdown.Item>
            </Dropdown>
            <Dropdown title="Sort by" activeKey={sort}>
              <Dropdown.Item
                eventKey="created-desc"
                componentClass={Link}
                to={getQueryLink({ sort: null })}
              >
                Newest
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="created-asc"
                componentClass={Link}
                to={getQueryLink({ sort: 'created-asc' })}
              >
                Oldest
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="comments-desc"
                componentClass={Link}
                to={getQueryLink({ sort: 'comments-desc' })}
              >
                Most commented
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="comments-asc"
                componentClass={Link}
                to={getQueryLink({ sort: 'comments-asc' })}
              >
                Least commented
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="updated-desc"
                componentClass={Link}
                to={getQueryLink({ sort: 'updated-desc' })}
              >
                Recently updated
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="updated-asc"
                componentClass={Link}
                to={getQueryLink({ sort: 'updated-asc' })}
              >
                Lease recently updated
              </Dropdown.Item>
            </Dropdown>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }

  function renderTable() {
    const routeNamespace = `/${repository.nameWithOwner}/issues`;
    const { nodes } = issues;
    return (
      <Table data={nodes} autoHeight>
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
  options: ({ params: { owner, name }, location: { query: { before, after, q } } }) => {
    const perPage = 25;
    const pagination = before ? { last: perPage, before } : { first: perPage, after };

    let orderField;
    let orderDirection;

    let states;
    if (q) {
      const queries = q.split('+').map(query => query.split(':'));

      const sort = queries.find(([key, value]) => key === 'sort');
      if (sort) {
        const [field, direction] = sort[1].split('-');
        orderField = {
          created: 'CREATED_AT',
          comments: 'COMMENTS',
          updated: 'UPDATED_AT'
        }[field];
        orderDirection = {
          asc: 'ASC',
          desc: 'DESC'
        }[direction];
      }

      const is = queries.find(([key, value]) => key === 'is');
      if (is) {
        states = {
          open: ['OPEN'],
          closed: ['CLOSED']
        }[is[1]];
      }
    }

    return {
      variables: { owner, name, states, orderField, orderDirection, ...pagination }
    };
  }
})(RepoIssues);
