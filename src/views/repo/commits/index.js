import React from 'react';
import _ from 'lodash';
import { Icon, SelectPicker, Loader, Table, ButtonToolbar, ButtonGroup, Button, Dropdown } from 'rsuite';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import RepoLayout from '@/views/repo/Layout';
import query from './index.graphql';
import Pagination from '@/components/Pagination';
import LinkButton from '@/components/LinkButton';

const { Column, HeaderCell, Cell } = Table;

function CommitLinkCell({ rowData, dataKey = 'message', routeNamespace, ...props }) {
  return (
    <Cell {...props}>
      <Link to={`${routeNamespace}/${rowData.oid}`}>{rowData.message}</Link>
    </Cell>
  );
}

function BranchCommits({ data: { loading, error, repository }, params: { ref } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  const { ref: { target: { history } } } = repository;

  function renderTableToolbar() {
    const { branches: { nodes } } = repository;
    const routeNamespace = `/${repository.nameWithOwner}/commits`;

    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <ButtonToolbar>
          <ButtonGroup>
            <Dropdown title={`Branch: ${ref}`}>
              {
                nodes.map(branch => (
                  <Dropdown.Item key={branch.name} componentClass={Link} to={`${routeNamespace}/${branch.name}`} active={branch.name === ref}>{branch.name}</Dropdown.Item>
                ))
              }
            </Dropdown>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }

  function renderTable() {
    const routeNamespace = `/${repository.nameWithOwner}/commit`;

    function getTableData() {
      const { nodes } = history;
      return _.orderBy(nodes, 'number', 'desc');
    }

    return (
      <Table data={getTableData()} autoHeight>
        <Column flexGrow={1}>
          <HeaderCell>Commit message</HeaderCell>
          <CommitLinkCell dataKey="message" routeNamespace={routeNamespace} />
        </Column>
        <Column>
          <HeaderCell>Author</HeaderCell>
          <Cell dataKey="author.name" />
        </Column>
        <Column width={180} align="right">
          <HeaderCell>Comments</HeaderCell>
          <Cell dataKey="committedDate" />
        </Column>
      </Table>
    );
  }

  return (
    <RepoLayout key={repository.nameWithOwner} repo={repository} className="repo">
      {renderTableToolbar()}
      {renderTable()}
      <Pagination pageInfo={history.pageInfo} />
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name, ref }, location: { query: { before, after } } }) => {
    const perPage = 34;
    const pagination = before ? { last: perPage, before } : { first: perPage, after };
    return {
      variables: { owner, name, ref, ...pagination }
    };
  }
})(BranchCommits);
