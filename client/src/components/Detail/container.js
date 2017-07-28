import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "Store/actions";
import * as selectors from "Store/selectors";

function mapStateToProps(state) {
  return {
    todo: selectors.todo(state)
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
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target: { name, value } }) {
      this.setState({ [name]: value });
    }

    componentDidMount() {
      this.props.fetchTodo(this.props.match.params.id).then(response => {
        this.setState({ input: response.data.todo.title });
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleChange={this.handleChange}
        />
      );
    }
  };
}

export default compose(connect(mapStateToProps, mapDispatchToProps), handlers);
