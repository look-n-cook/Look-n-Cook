import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import {
  Menu,
  Dropdown,
  Header,
  Icon,
} from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const imageStyle = {
      margin: '0',
      height: '70px',
      width: '100%',
    };
    const menuStyle = {
      marginTop: '0',
      marginBottom: '10px',
      background: '#ACC198',
    };
    return (
      <div>
        <div style={imageStyle} className='navbar-image'/>
        <Menu style={menuStyle} attached="top" borderless inverted>
          {this.props.currentUser === '' ? (
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>{"Look 'n' Cook"}</Header>
            </Menu.Item>
          ) : (
            <Menu.Item as={NavLink} activeClassName="" exact to="/home">
              <Header inverted as='h1'>{"Look 'n' Cook"}</Header>
            </Menu.Item>
          )}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin-recipes" key='admin-recipes'>
              Recipes
            </Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin-users" key='admin-users'>
              Users
            </Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin-ingredients" key='admin-ingredients'>
              Ingredients
            </Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin-vendors" key='admin-vendors'>
              Vendors
            </Menu.Item>,
          ]) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
            <Menu.Item as={NavLink} activeClassName="active" exact to="/vendor-ingredients" key='vendor-ingredients'>
              View Ingredients
            </Menu.Item>,
          ]) : ''}

          {(
            !Roles.userIsInRole(Meteor.userId(), 'admin') &&
            !Roles.userIsInRole(Meteor.userId(), 'vendor') &&
            this.props.currentUser !== ''
          ) ? ([
            <Menu.Item position="right" as={NavLink} activeClassName="active" exact to="/add" key='add'>
              Add Recipe
            </Menu.Item>,
          ]) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
            <Menu.Item position="right" as={NavLink} activeClassName="active" exact to="/create-list" key='create-list'>
              Create Ingredients List
            </Menu.Item>,
          ]) : ''}

          {(
            !Roles.userIsInRole(Meteor.userId(), 'admin') &&
            this.props.currentUser !== ''
          ) ? ([
            <Menu.Item as={NavLink} activeClassName="active" exact to="/search" key='search'>
              <Icon name='search' size='large'/>
            </Menu.Item>,
          ]) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
            <Menu.Item position="right" as={NavLink} activeClassName="active" exact to="/search" key='search'>
              <Icon name='search' size='large'/>
            </Menu.Item>,
          ]) : ''}

          {this.props.currentUser === '' ? (
            <Menu.Item position="right">
              <Dropdown text="Login" pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                  <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  {(
                    !Roles.userIsInRole(Meteor.userId(), 'admin') &&
                    !Roles.userIsInRole(Meteor.userId(), 'vendor') &&
                    this.props.currentUser !== ''
                  ) ? ([
                    <Dropdown.Item icon="id card outline" text="Profile" key='profile'
                                   as={NavLink} exact to="/profile"/>,
                  ]) : ''}
                  <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu>
      </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);