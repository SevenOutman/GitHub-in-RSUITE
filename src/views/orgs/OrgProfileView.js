// @flow
import React from 'react';
import { Col, Icon, Nav, Panel, Row } from 'rsuite';
import PinnedRepo from '@/components/PinnedRepo';
import AvatarLink from '@/components/AvatarLink';
import { Link } from 'react-router';
import type { Organization } from '@/flow/graphql-types';

type Props = {
  org: Organization
}

function OrgProfileView({ org }: Props) {

  function renderBanner() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: 0 }}>
          <img src={org.avatarUrl} alt="" />
        </div>
        <div>
          <h1>{org.name}</h1>
          <p>{org.description}</p>
          <p>
            <Icon icon="map-marker" fixedWidth />{org.location}

            <Icon icon="link" fixedWidth />
            <a href={org.websiteUrl} target="_blank">
              {org.websiteUrl}
            </a>
          </p>
        </div>
      </div>
    );
  }

  function renderPeoplePanel() {
    const { members } = org;
    return (
      <Panel
        bordered
        header={
          <Link to={`/orgs/${org.login}/people`}>
            <h4>People</h4>
          </Link>
        }
      >
        {
          members.nodes.map(user => (
            <AvatarLink key={user.login} actor={user} size={48} />
          ))
        }
      </Panel>
    );
  }

  return (
    <div key={org.login} className="organization">
      {renderBanner()}
      <Nav appearance="subtle" activeKey="overview">
        <Nav.Item eventKey="repositories">Repositories</Nav.Item>
        <Nav.Item eventKey="people">People</Nav.Item>
        <Nav.Item eventKey="teams">Teams</Nav.Item>
        <Nav.Item eventKey="projects">Projects</Nav.Item>
      </Nav>
      <h4>Pinned repositories</h4>
      <Row>
        {
          org.pinnedRepositories.nodes.map(repo => (
            <Col key={repo.nameWithOwner} md={8}>
              <PinnedRepo repo={repo} owner={org} />
            </Col>
          ))
        }
      </Row>
      <Row>
        <Col md={16}>
        </Col>
        <Col md={8}>
          {renderPeoplePanel()}
        </Col>
      </Row>
    </div>
  );
}

export default OrgProfileView;