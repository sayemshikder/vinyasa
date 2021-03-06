import React from 'react';
import { connect } from 'react-redux';
import { Header } from './header';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    team: state.teams,
    user: state.user,
    currentUser: state.session.currentUser,
    currentProject: state.projects.currentProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
