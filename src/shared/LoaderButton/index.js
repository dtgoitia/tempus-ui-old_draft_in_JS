import React from 'react';

import './LoaderButton.css';
import Spinner from 'react-bootstrap/Spinner';


class LoaderButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ongoingAction: false,
    }
  }

  componentDidMount() {
    this.props.halt$
      .subscribe(this.halt.bind(this));
  }

  action() {
    this.setState({ ongoingAction: true });
    this.props.action();
  }
  
  halt() {
    this.setState({ ongoingAction: false });
    console.log('halt!');
  }

  render() {
    const currentClass = this.state.ongoingAction
      ? 'loader-button ongoing'
      : 'loader-button halted';
    const label = this.state.ongoingAction
      ? this.props.loadingLabel
      : this.props.label;
    const spinner = <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>

    return (
      <button className={currentClass}
        disabled={this.state.ongoingAction}
        onClick={this.action.bind(this)}>
        {
          this.state.ongoingAction
            ? spinner
            : null
        }
        { label }
      </button>
    );
  }
}

export default LoaderButton;