import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Icon, IconButton, Nav } from 'rsuite';
import { withRouter, Link } from 'react-router';

function NavLink(props) {
  return <Nav.Item componentClass={Link} {...props} />;
}

function RepoLayout({ params: { owner, name }, repo, router: { isActive }, children, ...props }) {

  function renderPageTitle() {
    const { watchers, stargazers, forks } = repo;
    return (
      <h1>
        <Link to={`/${owner}`}>{owner}</Link>
        <span style={{ margin: '0 .25em' }}>/</span>
        <Link to={`/${owner}/${name}`}><b>{name}</b></Link>

        <ButtonToolbar style={{ float: 'right' }}>
          <ButtonGroup>
            <IconButton size="sm" icon={<Icon icon="eye" />}>
              Watch
            </IconButton>
            <Button size="sm">{watchers.totalCount}</Button>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton size="sm" icon={<Icon icon="star" />}>
              Star
            </IconButton>
            <Button size="sm">{stargazers.totalCount}</Button>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton size="sm" icon={<Icon icon="code-fork" />}>
              Fork
            </IconButton>
            <Button size="sm">{forks.totalCount}</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </h1>
    );
  }

  function renderNav() {
    const routeNamespace = `/${owner}/${name}`;

    return (
      <Nav appearance="subtle">
        <NavLink to={routeNamespace} active={isActive(routeNamespace, true) || isActive(`${routeNamespace}/commits`)}>
          <Icon icon="code" fixedWidth />Code
        </NavLink>
        <NavLink to={`${routeNamespace}/issues`} active={isActive(`${routeNamespace}/issues`)}>
          <Icon icon="exclamation-circle2" fixedWidth />Issues
        </NavLink>
        <NavLink to={`${routeNamespace}/pulls`} active={isActive(`${routeNamespace}/pulls`)}>Pull requests</NavLink>
        <NavLink to={`${routeNamespace}/projects`} active={isActive(`${routeNamespace}/projects`)}>Projects</NavLink>
        <NavLink to={`${routeNamespace}/wiki`} active={isActive(`${routeNamespace}/wiki`)}>Wiki</NavLink>
        <NavLink to={`${routeNamespace}/pulse`} active={isActive(`${routeNamespace}/pulse`)}>Insights</NavLink>
        <NavLink to={`${routeNamespace}/settings`} active={isActive(`${routeNamespace}/settings`)}>Settings</NavLink>
      </Nav>
    );
  }

  return (
    <div {...props}>
      {renderPageTitle()}
      {renderNav()}
      {children}
    </div>
  );
}

export default withRouter(RepoLayout);