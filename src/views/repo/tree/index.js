import React from 'react';
import { Icon, Table } from 'rsuite';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import RepoLayout from '@/views/repo/Layout';
import query from './index.graphql';
import { Link } from 'react-router';

const { Column, Cell, HeaderCell } = Table;

function FileNameCell({ rowData, dataKey = 'name', routeNamespace, refName, ...props }) {
  const name = _.get(rowData, dataKey);
  const type = _.get(rowData, 'type');
  const icon = type === 'blob' ? 'file-text-o' : 'folder';
  return (
    <Cell {...props}>
      <Icon icon={icon} fixedWidth />
      <Link to={`${routeNamespace}/${type}/${refName}/${name}`}>{name}</Link>
    </Cell>
  );
}

function Tree({ data: { loading, error, repository }, params: { ref, path } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function getTableData() {
    const { object: { entries } } = repository;

    return _.orderBy(entries, ['type', 'name'], ['desc', 'asc']);
  }

  const routeNamespace = `/${repository.nameWithOwner}`;

  return (
    <RepoLayout key={repository.nameWithOwner} repo={repository} className="repo">
      <Table data={getTableData()} autoHeight>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <FileNameCell dataKey="name" routeNamespace={routeNamespace} refName={ref} />
        </Column>
        <Column flexGrow={2}>
          <HeaderCell>Last commit message</HeaderCell>
          <Cell dataKey="type" />
        </Column>
        <Column width={180} align="right">
          <HeaderCell>Last commit time</HeaderCell>
          <Cell dataKey="mode" />
        </Column>
      </Table>
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params: { owner, name, ref, path } }) => ({
    variables: {
      owner,
      name,
      expression: `${ref}:${path}`
    }
  })
})(Tree);