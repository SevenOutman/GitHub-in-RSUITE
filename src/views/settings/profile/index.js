import React from 'react';
import { graphql } from 'react-apollo';
import query from './index.gql';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, HelpBlock, Icon, Nav, Row } from 'rsuite';
import { Link } from 'react-router';

function Profile({ data: { loading, error, viewer } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="settings-profile">
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Nav appearance="subtle" activeKey="profile" reversed vertical>
              <Nav.Item eventKey="profile">Profile</Nav.Item>
              <Nav.Item eventKey="account">Account</Nav.Item>
              <Nav.Item eventKey="emails">Emails</Nav.Item>
              <Nav.Item eventKey="notifications">Notifications</Nav.Item>
              <Nav.Item eventKey="billing">Billing</Nav.Item>
              <Nav.Item eventKey="keys">SSH and GPG keys</Nav.Item>
              <Nav.Item eventKey="security">Security</Nav.Item>
              <Nav.Item eventKey="blocked_users">Blocked users</Nav.Item>
              <Nav.Item eventKey="repositories">Repositories</Nav.Item>
              <Nav.Item eventKey="organizations">Organizations</Nav.Item>
              <Nav.Item eventKey="replies">Saved replies</Nav.Item>
              <Nav.Item eventKey="installations">Applications</Nav.Item>
            </Nav>

            <Nav appearance="subtle" activeKey="profile" reversed vertical>
              <Nav.Item eventKey="developer">Developer settings</Nav.Item>
            </Nav>
          </Col>
          <Col md={18}>
            <h2>Public profile</h2>
            <Form formValue={viewer}>
              <Col md={16}>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl name="name" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Public email</ControlLabel>
                  <FormControl name="email" />
                  <HelpBlock>
                    You can manage verified email addresses in your <Link to="/settings/emails">email settings</Link>.
                  </HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Bio</ControlLabel>
                  <FormControl name="bio" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>URL</ControlLabel>
                  <FormControl name="websiteUrl" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Company</ControlLabel>
                  <FormControl name="company" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl name="location" />
                </FormGroup>
                <Button appearance="primary">Update profile</Button>
              </Col>
              <Col md={8}>
                <img src={viewer.avatarUrl} alt="" style={{ width: '100%' }} />
              </Col>
            </Form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default graphql(query)(Profile);