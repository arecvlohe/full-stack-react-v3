import React, { Component } from "react";
import { compose as pipe } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "Store/actions";
import * as selectors from "Store/selectors";

function mapStateToProps(state) {
  return {
    todos: selectors.todos(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function handlers(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.fetchTodos();
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
}

export default pipe(connect(mapStateToProps, mapDispatchToProps), handlers);
