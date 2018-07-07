import React, { Fragment } from 'react';
import { Button, Divider, Icon } from 'rsuite';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatarUrl} alt="avatar" className="avatar" />
      <h3>{user.name}</h3>
      <p>{user.login}</p>
      <p>{user.bio}</p>
      <Button block>Follow</Button>
      {
        user.isDeveloperProgramMember &&
        <Fragment>
          <Divider />
          <p><Icon icon="gears2" fixedWidth /><a href="https://developer.github.com" target="_blank">Developer
            Program Member</a></p>
        </Fragment>
      }
      <Divider>
        <h4>Contact</h4>
      </Divider>
      {
        user.company &&
        <p><Icon icon="group" fixedWidth />{user.company}</p>
      }
      {
        user.location &&
        <p><Icon icon="map-marker" fixedWidth />{user.location}</p>
      }
      {
        user.email &&
        <p>
          <Icon icon="envelope-o" fixedWidth />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      }
      {
        user.websiteUrl &&
        <p>
          <Icon icon="link" fixedWidth />
          <a href={user.websiteUrl} target="_blank">{user.websiteUrl}</a>
        </p>
      }
      {
        user.organizations.nodes.length > 0 &&
        <Fragment>
          <Divider>
            <h4>Organizations</h4>
          </Divider>
          {
            user.organizations.nodes.map(org => (
              <img key={org.login} src={org.avatarUrl} alt="" width={35} />
            ))
          }
        </Fragment>
      }
    </div>
  );
}

export default UserCard;