import React from 'react';
import { ButtonGroup, ButtonToolbar, Icon, Loader, Table } from 'rsuite';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import RepoLayout from '@/views/repo/Layout';
import query from './index.graphql';
import { Link } from 'react-router';
import LinkButton from '@/components/LinkButton';

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

function Repo({ data: { loading, error, repository } }) {
  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  function renderNavButtons() {
    const { nameWithOwner, defaultBranchRef: { name: defaultBranch, target: { history } }, branches, tags, licenseInfo } = repository;
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <LinkButton appearance="ghost" to={`/${nameWithOwner}/commits/${defaultBranch}`}>{history.totalCount}commits</LinkButton>
            <LinkButton appearance="ghost" to={`${nameWithOwner}/branches`}>{branches.totalCount}branches</LinkButton>
            <LinkButton appearance="ghost" to={`${nameWithOwner}/releases`}>{tags.totalCount}releases</LinkButton>
            <LinkButton appearance="ghost" to={`${nameWithOwner}/graph/contributors`}>contributors</LinkButton>
            {
              licenseInfo &&
              <LinkButton appearance="ghost">{licenseInfo.spdxId}</LinkButton>
            }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }

  function renderTree() {
    const routeNamespace = `/${repository.nameWithOwner}`;
    const refName = repository.defaultBranchRef.name;

    function getTableData() {
      const { defaultBranchRef: { target: { tree: { entries } } } } = repository;

      return _.orderBy(entries, ['type', 'name'], ['desc', 'asc']);
    }

    return (
      <Table data={getTableData()} autoHeight>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <FileNameCell dataKey="name" routeNamespace={routeNamespace} refName={refName} />
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
    );
  }

  return (
    <RepoLayout key={repository.nameWithOwner} repo={repository} className="repo">
      <p>{repository.description}</p>
      {renderNavButtons()}
      {renderTree()}
    </RepoLayout>
  );
}

export default graphql(query, {
  options: ({ params }) => ({ variables: params })
})(Repo);