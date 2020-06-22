import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../../../store/login/actions';

class PrivateRoute extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    const { component: Component, userData, ...rest } = this.props;
    const { isLogin } = userData;
    return (
      <Route
        {...rest}
        render={(props) => {
          return isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userData: state.userData.data,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
