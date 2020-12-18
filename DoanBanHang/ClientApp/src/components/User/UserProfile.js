import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Menu, Icon, Form, Button } from 'semantic-ui-react';

class UserProfile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu vertical>
                <Menu.Item header>User CP</Menu.Item>
                <Menu.Item>
                  <Icon name="user" />
                  User Profile
                </Menu.Item>
                <Menu.Item>
                  <Icon name="ordered list" />
                  Order History
                </Menu.Item>
                <Menu.Item>
                  <Icon name="heart" />
                  Favorite Product
                </Menu.Item>
                <Menu.Item>
                  <Icon name="ticket" />
                  Coupon
                </Menu.Item>
                <Menu.Item>
                  <Icon name="sign out" />
                  Logout
                </Menu.Item>
              </Menu>
              <Menu vertical>
                <Menu.Item header>Support</Menu.Item>
                <Menu.Item>
                  <Icon name="wpforms" />
                  Support Ticket
                </Menu.Item>
                <Menu.Item>
                  <Icon name="send" />
                  Submit Support Ticket
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={(user && user.name) || ''}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="text"
                    readOnly
                    value={(user && user.email) || ''}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" />
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password</label>
                  <input type="password" />
                </Form.Field>
                <Button color="teal">Update</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(UserProfile);
