import React from 'react';
import { Panel, Icon } from 'rsuite';
import { Link } from 'react-router';

function PinnedRepo({ repo, user }) {

  const displayName = repo.nameWithOwner.startsWith(user.login) ? repo.name : repo.nameWithOwner

  return (
    <Panel header={<Link to={`/${repo.nameWithOwner}`}>{displayName}</Link>} bordered>

      <p>{repo.description}</p>
      <p>
        <span>{repo.primaryLanguage.name}</span>
        <Link to={`/${repo.nameWithOwner}/stargazers`}><Icon icon="star" fixedWidth />{repo.stargazers.totalCount}</Link>
        <Link to={`/${repo.nameWithOwner}/network`}><Icon icon="code-fork" fixedWidth />{repo.forks.totalCount}</Link>
      </p>
    </Panel>
  );
}

export default PinnedRepo;